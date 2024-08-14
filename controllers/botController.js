const client = require('../twilioClient');


exports.handleMessage = async (req, res) => {
    const incomingMessage = req.body.Body.trim().toLowerCase();
    const from = req.body.From;

    let responseMessage = '';

    // Lógica para manejar los mensajes y mostrar el menú
    if (incomingMessage === 'hola' || incomingMessage === 'menu') {
        responseMessage = '¡Hola! ¿Qué te gustaría hacer?\n\n1. Reservar turno\n2. Cancelar turno\n3. Modificar turno\n4. Buscar rival\n\nResponde con el número de la opción que deseas.';
    } else if (incomingMessage === '1') {
        responseMessage = 'Para reservar un turno, por favor indícame el día y la hora.';
    } else if (incomingMessage === '2') {
        responseMessage = 'Para cancelar un turno, por favor indícame el número de reserva.';
    } else if (incomingMessage === '3') {
        responseMessage = 'Para modificar un turno, por favor indícame el número de reserva y los cambios que deseas realizar.';
    } else if (incomingMessage === '4') {
        responseMessage = 'Para buscar un rival, por favor indícame tu disponibilidad.';
    } else {
        responseMessage = 'No entiendo tu mensaje. Por favor, responde con "Hola" o "Menu" para ver las opciones disponibles.';
    }

    // Responder al mensaje
    client.messages.create({
        body: responseMessage,
        from: 'whatsapp:+14155238886',
        to: from
    })
    .then(message => {
        console.log('Mensaje de WhatsApp enviado con SID:', message.sid);
        res.status(200).send();
    })
    .catch(error => {
        console.error('Error al enviar el mensaje de WhatsApp:', error);
        res.status(500).send();
    });

};
