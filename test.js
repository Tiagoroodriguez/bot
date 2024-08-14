require('dotenv').config();
const twilio = require('twilio');

// Configura el cliente de Twilio con tus credenciales
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Enviar un mensaje de WhatsApp
client.messages.create({
    body: 'Goku, ¡te necesitamos en Namekusei!',
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+5493572529331'
})
.then(message => {
  console.log('Mensaje de WhatsApp enviado con SID:', message.sid);
})
.catch(error => {
  console.error('Error al enviar el mensaje de WhatsApp:', error);
});