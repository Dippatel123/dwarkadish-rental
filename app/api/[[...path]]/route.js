import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import nodemailer from 'nodemailer'

const uri = process.env.MONGO_URL
const dbName = process.env.DB_NAME || 'dwarkadhish_rental'

let cachedClient = null
async function getDb() {
  if (!cachedClient) {
    cachedClient = new MongoClient(uri)
    await cachedClient.connect()
  }
  return cachedClient.db(dbName)
}

let cachedTransporter = null
function getTransporter() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) return null
  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })
  }
  return cachedTransporter
}

async function sendInquiryEmail(doc) {
  const transporter = getTransporter()
  if (!transporter) return
  const to = process.env.CONTACT_TO_EMAIL || process.env.GMAIL_USER
  await transporter.sendMail({
    from: `"Dwarkadish Rental" <${process.env.GMAIL_USER}>`,
    to,
    subject: `New Inquiry from ${doc.name}`,
    text: [
      `Name: ${doc.name}`,
      `Phone: ${doc.phone}`,
      `City: ${doc.city || '-'}`,
      `Event Date: ${doc.date || '-'}`,
      `Required Items: ${doc.items || '-'}`,
      `Message: ${doc.message || '-'}`,
    ].join('\n'),
  })
}

function json(data, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

export async function OPTIONS() {
  return json({}, 200)
}

export async function GET(request, { params }) {
  const resolved = await params
  const path = (resolved?.path || []).join('/')
  try {
    if (path === '' || path === 'health') {
      return json({ ok: true, service: 'Dwarkadhish Rental API', time: new Date().toISOString() })
    }
    if (path === 'inquiries') {
      const db = await getDb()
      const items = await db.collection('inquiries').find({}).sort({ createdAt: -1 }).limit(100).toArray()
      return json({ ok: true, items })
    }
    return json({ ok: false, error: 'Not found' }, 404)
  } catch (e) {
    return json({ ok: false, error: e.message }, 500)
  }
}

export async function POST(request, { params }) {
  const resolved = await params
  const path = (resolved?.path || []).join('/')
  try {
    const body = await request.json().catch(() => ({}))
    if (path === 'inquiries') {
      const { name, phone, city, items, date, message } = body
      if (!name || !phone) {
        return json({ ok: false, error: 'Name and phone are required' }, 400)
      }
      const db = await getDb()
      const doc = {
        id: uuidv4(),
        name: String(name).trim(),
        phone: String(phone).trim(),
        city: String(city || '').trim(),
        items: String(items || '').trim(),
        date: String(date || '').trim(),
        message: String(message || '').trim(),
        createdAt: new Date().toISOString(),
        status: 'new',
      }
      await db.collection('inquiries').insertOne(doc)
      try {
        await sendInquiryEmail(doc)
      } catch (emailError) {
        console.error('Failed to send inquiry email:', emailError.message)
      }
      return json({ ok: true, inquiry: doc })
    }
    return json({ ok: false, error: 'Not found' }, 404)
  } catch (e) {
    return json({ ok: false, error: e.message }, 500)
  }
}
