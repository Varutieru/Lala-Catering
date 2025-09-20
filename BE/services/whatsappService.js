const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    console.log('WA Client QR Code:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp client is ready!');
});

client.on('auth_failure', (msg) => {
    console.error('Authentication failure:', msg);
});

client.on('disconnected', (reason) => {
    console.log('Client was disconnected:', reason);
});

client.initialize();

const sendWhatsAppMessage = async (recipientNumber, message) => {
    try {
        const number = recipientNumber.includes('@c.us') ? recipientNumber : `${recipientNumber.replace(/\D/g, '')}@c.us`;
        const result = await client.sendMessage(number, message);
        console.log('Pesan WA berhasil dikirim!');
        return result;
    } catch (error) {
        console.error('Gagal mengirim pesan WhatsApp:', error);
        return null;
    }
};

module.exports = { sendWhatsAppMessage, client };