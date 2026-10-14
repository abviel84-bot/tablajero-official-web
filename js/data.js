/**
 * data.js — El Tablajero
 * ------------------------------------------------------------------
 * Toda la información editable del sitio vive aquí (igual que en EPW).
 * En la versión final, el Modo Administrador lee y guarda estos mismos
 * datos en Firebase. En este borrador son valores de ejemplo.
 * ------------------------------------------------------------------
 */
const DEFAULT_DB = {
  site: {
    brand: "El Tablajero",
    legalName: "El Tablajero",
    heroEyebrow: "Carnicería y supermercado",
    heroTitle: "Cortes frescos, cortados al momento",
    heroSubtitle:
      "Carne fresca, pernil para el fin de semana y la compra de la casa en un solo sitio. Dinos cómo lo quieres y el tablajero te lo prepara.",
    location: "Pueblo por confirmar, Puerto Rico",
    address: "Dirección por confirmar",
    phone: "(787) 000-0000",
    whatsapp: "",
    email: "info@eltablajero.com",
    hours: [
      ["Lunes a sábado", "7:00 AM – 8:00 PM"],
      ["Domingo", "8:00 AM – 2:00 PM"],
    ],
    payments: "Efectivo, ATH Móvil, tarjetas y PAN",
    instagramUrl: "#",
    facebookUrl: "#",
    aboutEyebrow: "Nuestra historia",
    aboutTitle: "Del mostrador de carne a supermercado del barrio",
    aboutBody: [
      "El Tablajero empezó como lo que dice su nombre: un mostrador, un cuchillo bien afilado y clientes que pedían su corte exacto. Con los años añadimos góndolas, frutas del país y todo lo que hace falta para la compra de la semana.",
      "El mostrador sigue siendo el corazón del negocio. Aquí cortamos, molemos y adobamos al momento, y te decimos qué corte va mejor para lo que vas a cocinar.",
    ],
    aboutStats: [
      ["Corte al momento", "Tú escoges el grosor"],
      ["Encargos", "Pernil, lechón y bandejas"],
      ["Del país", "Viandas, frutas y huevos locales"],
    ],
    contactEyebrow: "Hablemos",
    contactTitle: "Contáctanos",
    contactSubtitle:
      "¿Quieres encargar un pernil, preguntar por un corte o saber si tenemos algo en góndola? Escríbenos o llámanos.",
    contactTags: ["Carne fresca", "Encargos", "Productos del país", "Servicio del barrio"],
    contactFormOptions: ["Encargo de carne", "Pregunta por un producto", "Ofertas para negocios", "Otro"],
    ctaEyebrow: "Para las fiestas",
    ctaTitle: "Encarga tu pernil con tiempo",
    ctaSubtitle: "Lo separamos, lo adobamos si quieres y lo recoges el día que digas.",
    ctaButtonLabel: "Hacer un encargo",
  },

  // Especial destacado en Inicio (equivale a "Próximo evento" en EPW)
  featured: {
    eyebrow: "Especial de la semana",
    name: "Pernil de cerdo con cuero",
    detail: "Entero o cortado en trozos para el caldero. Te lo adobamos sin costo adicional.",
    price: 2.49,
    unit: "lb",
    validUntil: "2026-10-20",
  },

  // Ofertas (equivale a "Eventos" en EPW)
  offers: [
    { id: "o1", dept: "Carnicería", name: "Pernil de cerdo", detail: "Con cuero, entero o en trozos", price: 2.49, unit: "lb", validUntil: "2026-10-20", hot: true },
    { id: "o2", dept: "Carnicería", name: "Chuleta de cerdo", detail: "Corte grueso o fino, como la pidas", price: 3.29, unit: "lb", validUntil: "2026-10-20" },
    { id: "o3", dept: "Carnicería", name: "Bistec de palomilla", detail: "Cortado fino, listo para encebollado", price: 7.49, unit: "lb", validUntil: "2026-10-20" },
    { id: "o4", dept: "Carnicería", name: "Carne de guisar", detail: "Res en cubitos, sin grasa", price: 5.99, unit: "lb", validUntil: "2026-10-20" },
    { id: "o5", dept: "Pollo", name: "Pollo entero fresco", detail: "Lo picamos en presas si quieres", price: 1.79, unit: "lb", validUntil: "2026-10-20" },
    { id: "o6", dept: "Frutas y viandas", name: "Plátanos del país", detail: "Verdes o maduros", price: 0.75, unit: "c/u", validUntil: "2026-10-20" },
  ],

  // Departamentos (equivale al "Roster" en EPW)
  departments: [
    { id: "carniceria", name: "Carnicería", short: "Res, cerdo y cabro cortados al momento.", body: "Nuestro mostrador principal. Cortamos bistec, chuleta, pernil, costillas y carne molida al momento, al grosor que pidas. También adobamos y marinamos.", items: ["Bistec y palomilla", "Pernil y paleta", "Costillas", "Carne molida fresca"] },
    { id: "pollo", name: "Pollo", short: "Fresco, en presas o entero.", body: "Pollo fresco entero, en presas, pechugas deshuesadas y alitas. Te lo picamos como lo vayas a cocinar.", items: ["Pollo entero", "Muslos y encuentros", "Pechuga deshuesada", "Alitas"] },
    { id: "deli", name: "Deli", short: "Jamón, quesos y fiambres al peso.", body: "Jamón, pavo, salami y quesos cortados al peso. Ideal para sándwiches de mallorca y bandejas de picadera.", items: ["Jamón de cocinar", "Quesos de papa y suizo", "Fiambres", "Bandejas por encargo"] },
    { id: "frutas", name: "Frutas y viandas", short: "Productos del país cuando hay cosecha.", body: "Plátanos, yautía, ñame, aguacates, recao y ajíes dulces. Damos prioridad a agricultores de la isla.", items: ["Plátanos y guineos", "Viandas", "Recao y ajíes", "Frutas de temporada"] },
    { id: "colmado", name: "Colmado", short: "La compra de la semana.", body: "Arroz, granos, enlatados, aceites, sazones y todo lo de la despensa. Lo básico siempre en góndola.", items: ["Arroz y granos", "Sazones y sofrito", "Enlatados", "Productos de limpieza"] },
    { id: "bebidas", name: "Bebidas y hielo", short: "Frías para el pasadía.", body: "Refrescos, maltas, jugos, agua y bolsas de hielo. Pregunta por precios de caja para actividades.", items: ["Refrescos y maltas", "Jugos y agua", "Hielo", "Precio por caja"] },
  ],

  // Encargos (equivale a "Súper Fan" en EPW)
  orders: {
    eyebrow: "Encargos",
    title: "Pídelo hoy, recógelo listo",
    body: "Llama o escríbenos con lo que necesitas. Lo cortamos, lo pesamos y lo dejamos separado a tu nombre.",
    steps: [
      ["Pide", "Por teléfono, WhatsApp o el formulario de contacto."],
      ["Lo preparamos", "Cortado, pesado y adobado si lo pides."],
      ["Recoge", "Pagas al recoger, con ATH Móvil o como prefieras."],
    ],
  },

  credit: { name: "Tryhard Web Solution", url: "https://instagram.com/tryhardsolution" },
};
