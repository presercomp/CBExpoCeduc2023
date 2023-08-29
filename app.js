const {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
} = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MySQLAdapter = require("@bot-whatsapp/database/mysql");
const mysql = require("mysql");

/**
 * Se declaran los atributos y arreglos
 */
let datos = [];




const carreraCiber = addKeyword(["1"]).addAnswer(
 "Soy Técnico, estoy capacitado para administrar redes de datos Lan, administrar sistemas operativos para servidores y desarrollar sistemas web y aplicaciones de escritorio, asegurando la continuidad operativa de la organización en estos ámbitos. Conoce mas entrando aquí: https://www.ceduc.cl/carreras/computacion-e-informatica-mencion-programacion/"
);
const carreraProgra = addKeyword(["2"]).addAnswer(
  "La carrera de TNS en Computación e Informática mención Ciberseguridad está dirigida a egresados de enseñanza media técnico- profesional o científico- humanista; personas con estudios formales en el área (conclusos o inconclusos); y a trabajadores que cuenten con experiencia laboral en el ámbito de la informática (con o sin certificación). Conoce mas entrando aquí: https://www.ceduc.cl/carreras/computacion-e-informatica-mencion-ciberseguridad/"
);
const mallaCiber = addKeyword(["3"]).addAnswer(
  "Conoce nuestra malla entrando en el siguiente link: https://www.ceduc.cl/content/uploads/CIP-3.pdf"
);
const mallaProgra = addKeyword(["4"]).addAnswer(
  "Conoce nuestra malla entrando al siguiente link: https://www.ceduc.cl/content/uploads/CIC-2.pdf"
);


const flowSaludo = addKeyword(["Hola", "Buenas", "HOLA", "Hola"])
  .addAnswer([
    "Hola 😁 Bienvenido al ChatBot de ExpoCeduc 2023 - Escuela de Computación e Informática",
    "Soy el ChatBot de ExpoCeduc 2023 - Escuela de Computación e Informática",
    "Un gusto porder atenderte 🙌. Soy el Asistente Virtual de la Escuela de Computación e Informática",
  ])

  .addAnswer(
    "¿Tu Nombre?",
    { capture: true /*buttons: [{ body: "❌ Cancelar solicitud" }]*/ },
    (ctx, { fallBack }) => {
      if (!ctx.body.includes("")) {
        return fallBack();
      }
      nombre = ctx.body
    }
  )

  .addAnswer(
    "facilitanos una dirección de correo elecrónico por favor: ",
    { capture: true /*buttons: [{ body: "❌ Cancelar solicitud" }]*/ },
    (ctx, { fallBack }) => {
      if (!ctx.body.includes("@")) {
        return fallBack();
      }
      correo = ctx.body
    }
  )

  .addAnswer("Gracias por la Información.",null,(ctx) => {
    nom = nombre    
    corr = correo    
    // setDataToDB({'Nombre': nom ,'Apellidos': pat + ' ' +  mat, 'Correo': corr});
    console.log('👉 Se ha conectado un cliente ', datos)        
  }
  )   

  .addAnswer([
    "*¿Que deseas conocer?* 🌀",
    "",
    "1) Obtener información de la carrera con mención en Ciberseguridad",
    "",
    "2) Obtener información de la carrera con mención en Programación",
    "",
    "3) Conocer la malla curricular de Computación e informática mención programación",
    "",
    "4)	Conocer la malla curricular de Computación e informática mención ciberseguridad.",
    "",
    "Escriba *Finalizar* para terminar la conversacion",
  ]);

const flowSalida = addKeyword([
  "finalizar",
  "Finalizar",
  "fin",
  "terminar",
  "Terminar",
]).addAnswer([
  "Gracias!!😁 por comunicarte con la escuela de Computación e Informática de CEDUC UCN Sede Coquimbo",
  "",
  "estaremos en contacto nuevamente !!!",
]);
  

const main = async () => {
    
  const adapterFlow = createFlow([
    flowSaludo,
    carreraCiber,
    carreraProgra,
    mallaCiber,
    mallaProgra,    
    flowSalida,
  ]);
  const adapterProvider = createProvider(BaileysProvider);
  createBot({
    flow: adapterFlow,
    provider: adapterProvider
  });
  QRPortalWeb();
};

main();