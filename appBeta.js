const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MySQLAdapter = require("@bot-whatsapp/database/mysql");

/**
 * Declaramos las conexiones de MySQL
 */
const MYSQL_DB_HOST = "localhost";
const MYSQL_DB_USER = "franprueba";
const MYSQL_DB_PASSWORD = "1234";
const MYSQL_DB_NAME = "franprueba";
const MYSQL_DB_PORT = "3306";

const flowSecundario = addKeyword(["1"]).addAnswer(
  "preciona el link👉🏻https://agencyagartha.cl/shop/"
);
const flowpregunta = addKeyword(["2"]).addAnswer(
  "preciona el link👉🏻https://agencyagartha.cl/our-services/"
);
const flowcanva = addKeyword(["3"]).addAnswer(
  "preciona el link👉🏻https://www.canva.com/es_mx/pro/"
);
const flowmegusto = addKeyword(["7"]).addAnswer("😃");
const flownomegusto = addKeyword(["4"]).addAnswer("😡");
const flowcomentario = addKeyword([
  "finalizar",
  "Finalizar",
  "fin",
  "terminar",
  "Terminar",
]).addAnswer([
  "Gracias!!😁 por comunicarte con *Agarta Marketing gency*",
  "",
  "estaremos en contacto nuevamente !!!",
]);

const flowpmenu = addKeyword(["menu", "Menu", "MENU", "Listado"]).addAnswer([
  "MENU📝",
  "",
  "Email",
  "",
  "-https://agencyagartha.cl/email-marketing/ ☑",
  "",
  "Media",
  "",
  "https://agencyagartha.cl/social-media-marketing/☑",
  "",
  "SEO",
  "",
  " - https://agencyagartha.cl/search-engine-optimization/☑",
  "",
  "Local",
  "",
  " - https://agencyagartha.cl/local-seo/",
  "",
  "Click",
  " - https://agencyagartha.cl/pay-per-click-ppc-management/☑",
  "",
  "",
  "ABC",
  "",
  "  - https://agencyagartha.cl/our-services/ ☑",
]);

const flowAgartha = addKeyword(["Agartha", "documentacion", "documentación"]);

const flowTerminar = addKeyword(["Gracias", "grac"]).addAnswer(
  [
    "🚀 Puedes aportar tu granito de arena a este proyecto",
    "[*opencollective*] https://opencollective.com/bot-whatsapp",
    "[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez",
    "[*patreon*] https://www.patreon.com/leifermendez",
    "\n*2* Para siguiente paso.",
  ],
  null,
  null,
  [flowSecundario]
);

/*const flowDatos = addKeyword(["1", "⬅️ Volver al Inicio"])
  .addAnswer(
    [
      "Hola!",
      "Para enviar el formulario necesito unos datos...",
      "Escriba su *Nombre*",
    ],
    { capture: true, buttons: [{ body: "❌ Cancelar solicitud" }] },

    async (ctx, { flowDynamic, endFlow }) => {
      if (ctx.body == "❌ Cancelar solicitud")
        return endFlow({
          body: "❌ Su solicitud ha sido cancelada ❌", // Aquí terminamos el flow si la condicion se comple
          buttons: [{ body: "⬅️ Volver al Inicio" }], // Y además, añadimos un botón por si necesitas derivarlo a otro flow
        });
      nombre = ctx.body;
      return flowDynamic(`Encantado *${nombre}*, continuamos...`);
    }
  )*/

const flowSaludo = addKeyword(["Hola", "Buenas", "HOLA", "Hola"])
  .addAnswer([
    "Hola 😁 En Agartha Marketing Agency te damos la bienvenida.",
    "Te has comunicado con Agartha Marketing Agency.",
    "",
    "Este es nuestro nuevo sistema de Chat Bot de Autoatención ABC System.",
    "Es una prueba Beta de este sistema por lo que agradecemos tu colaboración y sugerencias.",
    "Esta supervisada en tiempo real por ejecutivos humanos",
    "",
    "Un gusto porder atenderte 🙌",
  ])

  .addAnswer(
    "¿Tu Apellido Paterno?",
    { capture: true /*buttons: [{ body: "❌ Cancelar solicitud" }]*/ },
    (ctx, { fallBack }) => {
      if (!ctx.body.includes("")) {
        return fallBack();
      }
      console.log("Aquí viene todo: ", ctx.body);
    }
  )
  .addAnswer(
    "Apellido Materno",
    { capture: true /*buttons: [{ body: "❌ Cancelar solicitud" }]*/ },
    (ctx, { fallBack }) => {
      if (!ctx.body.includes("")) {
        return fallBack();
      }
      console.log("Aquí viene todo: ", ctx.body);
    }
  )
  .addAnswer(
    "Correo Electronico",
    { capture: true /*buttons: [{ body: "❌ Cancelar solicitud" }]*/ },
    (ctx, { fallBack }) => {
      if (!ctx.body.includes("@")) {
        return fallBack();
      }
      console.log("Aquí viene todo: ", ctx.body);
    }
  )

  .addAnswer("Gracias por la Información, verificando datos de acceso 🕓")
  .addAnswer("datos guardados con exito", { delay: 1700 })
  .addAnswer(
    "Encuenta de Atencion coloca *siguiente*",
    { capture: true /*buttons: [{ body: "❌ Cancelar solicitud" }]*/ },
    (ctx, { fallBack }) => {
      if (!ctx.body.includes("siguiente")) {
        return fallBack();
      }
      console.log("Aquí viene todo: ", ctx.body);
    }
  )
  .addAnswer([
    "*Indicanos en qué podemos ayudarte* 🌀",
    "",
    "Seleccione *1* ¿Cotizar Página Web?",
    "",
    "Seleccione *2* ¿Cotizar ABC System de Autoatención?",
    "",
    "Seleccione *3* ¿Comprar Canva Pro?",
    "",
    "Escribe *Listado* para ver todos nuestos links",
    "",
    "*Encuesta de nuestra atencion* 💭",
    "",
    "Escriba *7* ¿si me gusta?",
    "",
    "Escriba *8* ¿no me gusto?",
    "",
    "Ecriba *Finalizar* para terminar la conversacion",
  ]);

const main = async () => {
  const adapterDB = new MySQLAdapter({
    host: MYSQL_DB_HOST,
    user: MYSQL_DB_USER,
    database: MYSQL_DB_NAME,
    password: MYSQL_DB_PASSWORD,
    port: MYSQL_DB_PORT,
  });
  const adapterFlow = createFlow([
    flowcomentario,
    flownomegusto,
    flowcanva,
    flowmegusto,
    flowSaludo,
    flowpregunta,
    flowAgartha,
    flowTerminar,
    flowSecundario,
    flowpmenu,
  ]);
  const adapterProvider = createProvider(BaileysProvider);
  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
  QRPortalWeb();
};

main();
