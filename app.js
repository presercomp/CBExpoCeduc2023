const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')


const carreraCiber = addKeyword(['1']).addAnswer(
    [
        'Soy Técnico, estoy capacitado para administrar redes de datos Lan, administrar sistemas operativos para servidores y desarrollar sistemas web y aplicaciones de escritorio, asegurando la continuidad operativa de la organización en estos ámbitos. Conoce mas entrando aquí: https://www.ceduc.cl/carreras/computacion-e-informatica-mencion-programacion/',
        'si quieres volver a iniciar, escribe *menu*'],
    null,
    null
);
const carreraProgra = addKeyword(['2']).addAnswer(
    [
        'La carrera de TNS en Computación e Informática mención Ciberseguridad está dirigida a egresados de enseñanza media técnico- profesional o científico- humanista; personas con estudios formales en el área (conclusos o inconclusos); y a trabajadores que cuenten con experiencia laboral en el ámbito de la informática (con o sin certificación). Conoce mas entrando aquí: https://www.ceduc.cl/carreras/computacion-e-informatica-mencion-ciberseguridad/',
        'si quieres volver a iniciar, escribe *menu*'],
    null,
    null
);
const mallaCiber = addKeyword(['3']).addAnswer(
    ['Conoce nuestra malla entrando en el siguiente link: https://www.ceduc.cl/content/uploads/CIP-3.pdf',
    'si quieres volver a iniciar, escribe *menu*'], 
    null,
    null
);
const mallaProgra = addKeyword(['4']).addAnswer(
    ['Conoce nuestra malla entrando al siguiente link: https://www.ceduc.cl/content/uploads/CIC-2.pdf','si quieres volver a iniciar, escribe *menu*'], 
    null,
    null
);

const flowSalida = addKeyword([
    'finalizar',
    'Finalizar',
    'fin',
    'terminar',
    'Terminar',
  ]).addAnswer('Gracias!!😁 por comunicarte con la escuela de Computación e Informática de CEDUC UCN Sede Coquimbo');

const flowPrincipal = addKeyword(['hola', 'ole', 'alo', 'menu'])
    .addAnswer('Hola 😁 Bienvenido al ChatBot de ExpoCeduc 2023 - Escuela de Computación e Informática')
    .addAnswer(
        [
        '*¿Que deseas conocer?* 🌀',  
        '👉 *1* Obtener información de la carrera con mención en Ciberseguridad',
        '',
        '👉 *2* Obtener información de la carrera con mención en Programación',
        '',
        '👉 *3* Conocer la malla curricular de Computación e informática mención programación',
        '',
        '👉 *4*	Conocer la malla curricular de Computación e informática mención ciberseguridad.',
        '',
        '👉 *Finalizar* para terminar la conversacion'
        ],
        null,
        null,
        [carreraCiber, carreraProgra, mallaCiber, mallaProgra, flowSalida]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
