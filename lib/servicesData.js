// Detailed data for each service page
// Slugs must match the ones used in service cards
//
// brochure: set to a public path (e.g. "/brochures/chandelier-rental.pdf") to show a
// "Download Brochure" button on that service's page. Drop the PDF file in public/brochures/
// with a matching name. Leave as null to hide the button for that service.

import chandelier1 from "@/assets/chandelier/chandelier-1.jpeg";
import chandelier2 from "@/assets/chandelier/chandelier-2.jpeg";
import chandelier3 from "@/assets/chandelier/chandelier-3.jpeg";
import chandelier4 from "@/assets/chandelier/chandelier-4.jpeg";
import chandelier5 from "@/assets/chandelier/chandelier-5.jpeg";
import chandelier6 from "@/assets/chandelier/chandelier-6.jpeg";
import chandelier7 from "@/assets/chandelier/chandelier-7.jpeg";
import chandelier8 from "@/assets/chandelier/chandelier-8.jpeg";
import chandelier9 from "@/assets/chandelier/chandelier-9.jpeg";
import chandelier10 from "@/assets/chandelier/chandelier-10.jpeg";
import chandelier11 from "@/assets/chandelier/chandelier-11.jpeg";
import chandelier12 from "@/assets/chandelier/chandelierp-12.jpeg";
import chandelier13 from "@/assets/chandelier/chandelier-13.jpeg";
import chandelier14 from "@/assets/chandelier/chandelier-14.jpeg";
import chandelier15 from "@/assets/chandelier/chandelier15.jpeg";
import chandelier16 from "@/assets/chandelier/chandelier-16.jpeg";

import diya1 from "@/assets/diya/diya-1.jpeg";
import diya2 from "@/assets/diya/diya-2.jpeg";
import diya3 from "@/assets/diya/diya-3.jpeg";
import diya4 from "@/assets/diya/diya-4.jpeg";
import diya5 from "@/assets/diya/diya-5.jpeg";
import diya6 from "@/assets/diya/diya-6.jpeg";
import diya7 from "@/assets/diya/diya-7.jpeg";
import diya8 from "@/assets/diya/diya-8.jpeg";
import diya9 from "@/assets/diya/diya-9.jpeg";
import diya10 from "@/assets/diya/diya-10.jpeg";
import diya11 from "@/assets/diya/diya-11.jpeg";
import diya12 from "@/assets/diya/diya-12.jpeg";
import diya13 from "@/assets/diya/diya-13.jpeg";

import cooler1 from "@/assets/cooler/cooler-1.jpeg";

import heater1 from "@/assets/heater/heater-1.jpeg";
import heater2 from "@/assets/heater/heater-2.jpeg";
import heater3 from "@/assets/heater/heater-3.jpeg";
import heater4 from "@/assets/heater/heater-4.jpeg";
import heater5 from "@/assets/heater/heater-5.jpeg";

import fan1 from "@/assets/fan/fan-1.jpeg";
import fan2 from "@/assets/fan/fan-2.jpeg";

export const servicesData = {
  "chandelier-rental": {
    slug: "chandelier-rental",
    en: {
      title: "Chandelier Rental",
      tagline: "Grand crystal & designer chandeliers for weddings and events",
      description:
        "Transform any venue into a majestic celebration with our exquisite collection of crystal and designer chandeliers. From elegant traditional pieces to modern statement lighting, we have chandeliers for every wedding theme and event scale.",
      features: [
        "Crystal, brass and modern designer options",
        "Multiple sizes from small to grand hall pieces",
        "Professional installation & takedown included",
        "Compatible with all venue types",
        "Sanitised & polished before delivery",
      ],
      cta: "Book a Chandelier",
    },
    gu: {
      title: "ઝુમ્મર ભાડે",
      tagline: "લગ્ન અને પ્રસંગો માટે ભવ્ય ક્રિસ્ટલ અને ડિઝાઇનર ઝુમ્મર",
      description:
        "અમારા ઉત્કૃષ્ટ ક્રિસ્ટલ અને ડિઝાઇનર ઝુમ્મરના સંગ્રહ સાથે કોઈપણ સ્થળને ભવ્ય ઉજવણીમાં ફેરવો. પરંપરાગત ટુકડાઓથી લઈને આધુનિક લાઇટિંગ સુધી, દરેક લગ્ન થીમ માટે ઝુમ્મર ઉપલબ્ધ છે.",
      features: [
        "ક્રિસ્ટલ, પિત્તળ અને ડિઝાઇનર વિકલ્પો",
        "નાનાથી લઈને મોટા હોલ સુધીના કદ",
        "ઇન્સ્ટોલેશન અને ટેકડાઉન સામેલ",
        "બધા પ્રકારના સ્થળો સાથે અનુકૂળ",
        "ડિલિવરી પહેલાં સેનિટાઇઝ અને પોલિશ",
      ],
      cta: "ઝુમ્મર બુક કરો",
    },
    gallery: [
      chandelier1, chandelier2, chandelier3, chandelier4,
      chandelier5, chandelier6, chandelier7, chandelier8,
      chandelier9, chandelier10, chandelier11, chandelier12,
      chandelier13, chandelier14, chandelier15, chandelier16,
    ],
    brochure: "/brochures/chandelier-rental.pdf",
  },
  "decorative-diya-rental": {
    slug: "decorative-diya-rental",
    en: {
      title: "Decorative Diya Rental",
      tagline: "Traditional brass & designer diyas for a warm, sacred glow",
      description:
        "Illuminate your celebrations with our handpicked collection of decorative diyas. From classic brass hanging diyas to modern floor and pedestal designs — perfect for aarti, mandap and pooja setups.",
      features: [
        "Hanging, standing and floor diyas",
        "Traditional brass, copper and designer variants",
        "Bulk quantities for grand setups",
        "Includes oil/wax setup on request",
        "Cleaned and polished before every event",
      ],
      cta: "Book Diyas",
    },
    gu: {
      title: "ડેકોરેટિવ દીવા ભાડે",
      tagline: "ગરમ, પવિત્ર ચમક માટે પરંપરાગત પિત્તળ અને ડિઝાઇનર દીવા",
      description:
        "અમારા હાથથી પસંદ કરેલા ડેકોરેટિવ દીવાના સંગ્રહ સાથે તમારી ઉજવણીને પ્રકાશિત કરો. પરંપરાગત પિત્તળના લટકતા દીવાથી લઈને આધુનિક ડિઝાઇન સુધી — આરતી, મંડપ અને પૂજા સેટઅપ માટે યોગ્ય.",
      features: [
        "લટકતા, ઊભા અને ફ્લોર દીવા",
        "પરંપરાગત પિત્તળ, તાંબુ અને ડિઝાઇનર",
        "મોટા સેટઅપ માટે જથ્થાબંધ",
        "તેલ/મીણ સેટઅપ સામેલ",
        "દરેક પ્રસંગ પહેલા સાફ કરેલા",
      ],
      cta: "દીવા બુક કરો",
    },
    gallery: [
      diya1, diya2, diya3, diya4, diya5, diya6,
      diya7, diya8, diya9, diya10, diya11, diya12, diya13,
    ],
    brochure: "/brochures/decorative-diya-rental.pdf",
  },
  "air-cooler-rental": {
    slug: "air-cooler-rental",
    en: {
      title: "Air Cooler Rental",
      tagline: "Powerful coolers to keep every guest comfortable",
      description:
        "Beat the summer heat with our range of industrial and residential air coolers. Perfect for outdoor mandaps, halls, and open-air functions. Powerful airflow, silent operation and clean water tanks guaranteed.",
      features: [
        "Industrial and desert coolers available",
        "Large water tanks (upto 100L)",
        "Silent operation for indoor events",
        "Same-day delivery across Gujarat",
        "Serviced & sanitised before every rental",
      ],
      cta: "Book a Cooler",
    },
    gu: {
      title: "એર કૂલર ભાડે",
      tagline: "દરેક મહેમાનને આરામદાયક રાખવા શક્તિશાળી કૂલર",
      description:
        "અમારા ઔદ્યોગિક અને રહેણાંક એર કૂલરની શ્રેણી સાથે ઉનાળાની ગરમીને હરાવો. બહાર મંડપ, હોલ અને ખુલ્લી હવાના ફંક્શન માટે યોગ્ય.",
      features: [
        "ઔદ્યોગિક અને ડેઝર્ટ કૂલર",
        "મોટી પાણીની ટાંકી (૧૦૦ લિટર સુધી)",
        "ઇન્ડોર પ્રસંગો માટે શાંત ઓપરેશન",
        "ગુજરાત ભરમાં તે જ દિવસે ડિલિવરી",
        "દરેક ભાડા પહેલા સર્વિસ કરેલા",
      ],
      cta: "કૂલર બુક કરો",
    },
    gallery: [
      cooler1,
    ],
    // Product photo on a white background — show it in full rather than cropping to fill the frame.
    imageFit: "contain",
    brochure: null,
  },
  "heater-rental": {
    slug: "heater-rental",
    en: {
      title: "Heater Rental",
      tagline: "Premium heaters for cozy winter weddings & functions",
      description:
        "Keep your winter events warm and inviting with our range of gas and electric heaters. Ideal for outdoor mandaps, evening functions, and reception halls during Gujarat winters.",
      features: [
        "Gas patio heaters & electric room heaters",
        "Safe, tested and certified units",
        "Fuel supply arrangement available",
        "Trained operator on request",
        "Bulk quantity for large gatherings",
      ],
      cta: "Book a Heater",
    },
    gu: {
      title: "હીટર ભાડે",
      tagline: "આરામદાયક શિયાળાના લગ્નો માટે પ્રીમિયમ હીટર",
      description:
        "અમારી ગેસ અને ઇલેક્ટ્રિક હીટરની શ્રેણી સાથે તમારા શિયાળુ પ્રસંગોને ગરમ રાખો. બહાર મંડપ અને સાંજના ફંક્શન માટે આદર્શ.",
      features: [
        "ગેસ પેશિયો હીટર અને ઇલેક્ટ્રિક હીટર",
        "સુરક્ષિત, પરીક્ષણ કરેલા યુનિટ",
        "ઇંધણ સપ્લાય વ્યવસ્થા",
        "તાલીમ પામેલ ઓપરેટર",
        "મોટા મેળાવડા માટે જથ્થાબંધ",
      ],
      cta: "હીટર બુક કરો",
    },
    gallery: [
      heater1, heater2, heater3, heater4, heater5,
    ],
    brochure: null,
  },
  "fan-rental": {
    slug: "fan-rental",
    en: {
      title: "Fan Rental",
      tagline: "High-performance pedestal & ceiling fans for large venues",
      description:
        "From pedestal fans to industrial ceiling fans, we cover all your ventilation needs. Perfect for tents, halls, and outdoor mandaps where guest comfort is the priority.",
      features: [
        "Pedestal, wall-mount and ceiling fans",
        "Heavy-duty industrial fans available",
        "Low noise, high airflow models",
        "Serviced motors and safety-checked",
        "Fast delivery across Gujarat",
      ],
      cta: "Book a Fan",
    },
    gu: {
      title: "પંખા ભાડે",
      tagline: "મોટા સ્થળો માટે ઉચ્ચ-કાર્યક્ષમતાવાળા પંખા",
      description:
        "પેડેસ્ટલ પંખાથી ઔદ્યોગિક છત પંખા સુધી, અમે તમારી બધી વેન્ટિલેશન જરૂરિયાતોને આવરી લઈએ છીએ. તંબુ, હોલ અને બહાર મંડપ માટે યોગ્ય.",
      features: [
        "પેડેસ્ટલ, વોલ-માઉન્ટ અને છત પંખા",
        "હેવી-ડ્યુટી ઔદ્યોગિક પંખા",
        "ઓછો અવાજ, ઉચ્ચ હવાનો પ્રવાહ",
        "સર્વિસ કરેલા મોટર્સ",
        "ગુજરાત ભરમાં ઝડપી ડિલિવરી",
      ],
      cta: "પંખા બુક કરો",
    },
    gallery: [
      fan1, fan2,
    ],
    brochure: null,
  },
};

export const serviceSlugs = Object.keys(servicesData);

// Ordered so it maps 1:1 with translations.en.services.items / translations.gu.services.items
export const orderedSlugs = [
  "chandelier-rental",
  "decorative-diya-rental",
  "air-cooler-rental",
  "heater-rental",
  "fan-rental",
  "wedding-decoration-items",
  "event-decoration-accessories",
  "festival-decoration-rentals",
];
