
const sendWhatsAppMessage = (recipientNumber, message) => {
    if (!recipientNumber || !message) {
        console.error('Nomor telepon atau pesan tidak valid.');
        return Promise.reject(new Error('Nomor telepon atau pesan tidak valid.'));
    }
//Masih simulasi, belum terkoneksi ke API WhatsApp
    console.log('--- SIMULASI PENGIRIMAN PESAN WHATSAPP ---');
    console.log(`Kepada: ${recipientNumber}`);
    console.log(`Pesan: ${message}`);
    console.log('-------------------------------------------');

    return Promise.resolve({ status: 'sent' });
};

module.exports = { sendWhatsAppMessage };
