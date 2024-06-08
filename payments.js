// const { getTaro, paidButton, Pay } = require('./options');

// require('dotenv').config();
// const paymentToken = process.env.PAYMENT_TOKEN;


// // Отправка инвойса пользователю
// const sendInvoice = async (bot, chatId) => {
//     const invoice = {  
        
//         chat_id: chatId,
//         title: "Оплата",
//         description: "Предсказание",
//         payload: Date.now().toString(),
//         provider_token: paymentToken,
//         currency: "RUB",
//         prices: [
//             {
//                label: "Предсказание",
//                 amount: 6000, 
//             }
//         ],
       
       
       
       
//     };

//     console.log("Invoice object:", JSON.stringify(invoice, null, 2));
//     try {
//         const message = await bot.sendInvoice(
//             invoice.chat_id,
//             invoice.title,
//             invoice.description,
//             invoice.payload,
//             invoice.provider_token,
//             invoice.currency,
//             invoice.prices,
//             {  
//                 reply_markup: Pay.reply_markup,
//                 start_parameter: 'data', 
//                 photo_url: "https://wantshop.ru/media/tmp/ac2760c29f9f3d6a3c781573284588a6.jpeg",
               
//             } 
           
//         );
       
         
        
//         console.log("Invoice sent successfully.");
//         return message;
//     } catch (error) {
//         console.error("Error sending invoice:", error.message);
//     }
// };


// // Обработка предоплаты
// const handlePreCheckoutQuery = async (bot, query) => {
//     await bot.answerPreCheckoutQuery(query.id, true);
// };

// // Обработка успешной оплаты
// const handleSuccessfulPayment = async (bot, msg) => {
//     const chatId = msg.chat.id;
//     // Логика, которую нужно выполнить после успешной оплаты
//     await bot.sendMessage(chatId, "Ваш баланс, пополнен на 60 рублей!",paidButton);
//        // Здесь можно добавить логику для сохранения информации о 
// };

// module.exports = {
//     sendInvoice,
//     handlePreCheckoutQuery,
//     handleSuccessfulPayment
// };