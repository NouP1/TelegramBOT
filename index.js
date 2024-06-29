const TelegramApi = require('node-telegram-bot-api');
const { menu, spherechild, sphereolds, test1, years, years9, years6, years13, years18, district, getTaro, category, limit, consult, back, paidButton, paidConsult, menuConst } = require('./options');
require('dotenv').config();
const UserModel = require('./models.js')
const token = process.env.TOKEN;
const sequelize = require('./db.js')


const bot = new TelegramApi(token, { polling: true })
const { getRandomCard } = require('./getRandomCard.js');
const { sendInvoice, handlePreCheckoutQuery, handleSuccessfulPayment } = require('./payments.js');


const start = async () => {

    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connected to database...')

    } catch (error) {
        console.error(chalk.red('Отсутствует подключение к БД'), error);
    }

    bot.setMyCommands([
        { command: '/start', description: "Запустить бота заново" },
      
    ]);

    const userStates = {};

    bot.on('message', async msg => {
        try {
            const username = msg.chat.username;
            const text = msg.text;
            const firstName = msg.chat.first_name;
            const chatId = msg.chat.id;
            const messageId = msg.message_id;
            const userId = msg.from.id;
            const currentTime = Date.now();
            const oneDay = 24 * 60 * 60 * 1000;

            if (text === '/pay') {

                await sendInvoice(bot, chatId);
            }

            // const user = await UserModel.findOne({ where: { chatId: chatId } })
            // if (text != '/start' && text != '/pay' && user.invoiceMessageId) {
            //     var result = text.replace(/[\.\/_*[\]()~`>#+\-=|{}!\\]/g, '\\$&');
            //     await bot.sendMessage(chatId, "Пользователь [" + username + " " + firstName + "](t.me://user?id=" + userId + ")" + " *оплатил счет*\n" + "\n Сообщение пользователя:\n_" + result + "_", { parse_mode: 'MarkdownV2' })
            //     await bot.sendMessage(chatId, "Отлично, в указанное время с Вами свяжется наш специалист! ")
            //     await user.update({ invoiceMessageId: 0 })
            //     await user.save()
            // }
            // console.log(msg);

            if (text === '/start') {
                const user = await UserModel.findOrCreate({ where: { chatId: chatId }, defaults: { chatId: chatId, firstName: firstName, username: username } })
                console.log(user)
                const table = await UserModel.findAll()
                console.log(table)
                let pass = await bot.getChatMember("@tkkd13", msg.from.id);
                if(pass.status==='left'){
                     await bot.sendMessage(chatId, "Чтобы получить ответ нужно" +" *подписаться* "+ "на мой канал",{parse_mode:'MarkdownV2',reply_markup:menu.reply_markup});
                }
                else if(messageId!= null){ 
                await bot.sendMessage(chatId,"Что тебя интересует сегодня?",menuConst );
                await bot.sendSticker(chatId, "./sticker.webp")
                   
                }
                
            




                // // Проверка времени последнего запроса               
                // else if ((currentTime - user.lastRequest) < oneDay) {

                //     const lastRequestTime = user.lastRequest;

                //     const timeLeft = oneDay - (currentTime - lastRequestTime);
                //     const hoursLeft = Math.floor(timeLeft / (60 * 60 * 1000));
                //     const minutesLeft = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
                //     const secondsLeft = Math.floor((timeLeft % (60 * 1000)) / 1000);

                //     await bot.sendMessage(chatId, `Вы уже получили расклад сегодня. Пожалуйста, попробуйте снова завтра через ${hoursLeft} часов ${minutesLeft} минут ${secondsLeft} секунд.`, consult);
                // }
                // else {
                //     await bot.sendMessage(chatId, "Добро пожаловать в бот Карта дня, чтобы получить ответ нужно подписаться на канал", menu);
                // }
            }
        } catch (error) {
            console.log(error)
        } // await bot.deleteMessage(chatId, messageId);
    });




    bot.on('callback_query', async msg => {
        try {
            const data = msg.data;
            const chatId = msg.message.chat.id;
            const messageId = msg.message.message_id;
            const userId = msg.from.id;
            const currentTime = Date.now();
            const oneDay = 24 * 60 * 60 * 1000;
            console.log(msg)

            if (data === 'GETTARO') {
                await bot.deleteMessage(chatId,messageId)
                let pass = await bot.getChatMember("@tkkd13", msg.from.id);

                if (pass.status === "left") {
                    await bot.sendMessage(chatId,"Ты еще не подписан на мой канал ☹",menu );
                } else {
                 
                        await bot.sendMessage(chatId,"Выберите категорию 📂",category);
                    
                }
            }


            if (data === 'getTaro') {
                let pass = await bot.getChatMember("@tkkd13", msg.from.id);

                if (pass.status === "left") {
                    await bot.editMessageText("Ты еще не подписан на мой канал ☹", {
                        chat_id: chatId,
                        message_id: messageId,
                        reply_markup: menu.reply_markup
                    });


                    // await bot.deleteMessage(chatId, messageId);
                    // } else {
                    //     const user = await UserModel.findOne({ where:{chatId:chatId } })

                    // if (user.lastRequest && (currentTime - user.lastRequest) < oneDay) {

                    //     await bot.editMessageText("Вы уже получили расклад сегодня. Пожалуйста, попробуйте снова завтра.", {
                    //         chat_id: chatId,
                    //         message_id: messageId,
                    //         reply_markup: consult.reply_markup
                    //     })

                    // } 
                }
                else {
                    await bot.editMessageText("📂 Выберите категорию ", {
                        chat_id: chatId,
                        message_id: messageId,
                        reply_markup: category.reply_markup
                    });
                }

            }

            const categories = ['category1', 'category2', 'category2', 'category3','category4'];
            if (categories.includes(data)) {
                if (!userStates[userId]) {
                    userStates[userId] = {};
                }

                userStates[userId] = { category: data };

                await bot.editMessageText("Перетасовываю колоду...", {
                    chat_id: chatId,
                    message_id: messageId
                });

                await bot.sendChatAction(chatId, "typing")
                await new Promise(resolve => setTimeout(resolve, 1000));
                await bot.editMessageText("Выбери одну карту из колоды 👇", {
                    chat_id: chatId,
                    message_id: messageId,
                    reply_markup: getTaro.reply_markup
                });
            }


            if (data === "/" && userStates[userId] && userStates[userId].category === "category1") {

                const user = await UserModel.findOne({ where: { chatId: chatId } })
                // user.lastRequest = currentTime;
                //     await user.update({lastRequest});

                if (user.lastRequestCardDay && (currentTime - user.lastRequestCardDay) < oneDay) {
                    const timeLeft = oneDay - (currentTime - user.lastRequestCardDay);
                    const hoursLeft = Math.floor(timeLeft / (60 * 60 * 1000));
                    const minutesLeft = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
                    const secondsLeft = Math.floor((timeLeft % (60 * 1000)) / 1000);

                   // await bot.sendMessage(chatId, `Осталось времени${hoursLeft} часов ${minutesLeft} минут ${secondsLeft} секунд`)
                    await bot.editMessageText("⏳ Вы уже получили карту сегодняшнего дня. Пожалуйста, попробуйте снова завтра. \n" + `\nОсталось времени ${hoursLeft} часа ${minutesLeft} минут ${secondsLeft} секунд\n` , {
                        chat_id: chatId,
                        message_id: messageId,
                        reply_markup: consult.reply_markup
                    });

                    
                } else {

                    await bot.editMessageText("Достаю карту из колоды...", {
                        chat_id: chatId,
                        message_id: messageId
                    });
                    await bot.sendChatAction(chatId, "upload_photo");
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    const { category } = userStates[userId];
                    console.log(category)
                    const { cardImage, predictionText } = getRandomCard(category);
                    await bot.sendPhoto(chatId, cardImage);
                    await bot.sendMessage(chatId, predictionText, consult);
                    user.lastRequestCardDay = currentTime;
                    await user.save();
                   
                }



            }

            if (data === "/" && userStates[userId] && userStates[userId].category === "category2") {

                const user = await UserModel.findOne({ where: { chatId: chatId } });

                if (user.quantityAnswersYoN < 2 && (currentTime - user.lastRequestYoN) > oneDay) {
                    console.log(user.quantityAnswersYoN + "--------------------------------------------------------") 
                    await bot.editMessageText("Достаю карту из колоды...", {
                        chat_id: chatId,
                        message_id: messageId
                    });
                    await bot.sendChatAction(chatId, "upload_photo");
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    const { category } = userStates[userId];
                    console.log(category)
                    const { cardImage, predictionText } = getRandomCard(category);
                    await bot.sendPhoto(chatId, cardImage);
                    await bot.sendMessage(chatId, predictionText);
                    user.quantityAnswersYoN += 1;
                    await user.save();

                    await bot.sendMessage(chatId, "Карта номер:  " + user.quantityAnswersYoN + " 🌙", consult)

                } else {
                    const timeLeft = oneDay - (currentTime - user.lastRequestCardDay);
                    const hoursLeft = Math.floor(timeLeft / (60 * 60 * 1000));
                    const minutesLeft = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
                    const secondsLeft = Math.floor((timeLeft % (60 * 1000)) / 1000);
                    await bot.editMessageText("⏳ Вы уже получили 3 ответа сегодня. Пожалуйста, попробуйте снова завтра. \n" + `\nОсталось времени ${hoursLeft} часа ${minutesLeft} минут ${secondsLeft} секунд\n`, {
                        chat_id: chatId,
                        message_id: messageId,
                        reply_markup: consult.reply_markup
                    });
                }
                
                if (user.quantityAnswersYoN === 2 && (currentTime - user.lastRequestYoN) > oneDay) {
                    await bot.editMessageText("Достаю карту из колоды...", {
                        chat_id: chatId,
                        message_id: messageId
                    });
                    await bot.sendChatAction(chatId, "upload_photo");
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    const { category } = userStates[userId];
                    console.log(category)
                    const { cardImage, predictionText } = getRandomCard(category);
                    await bot.sendPhoto(chatId, cardImage);
                    await bot.sendMessage(chatId, predictionText);
                    user.quantityAnswersYoN += 1;
                    await user.save();
                    const timeLeft = oneDay - (currentTime - user.lastRequestCardDay);
                    const hoursLeft = Math.floor(timeLeft / (60 * 60 * 1000));
                    const minutesLeft = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
                    const secondsLeft = Math.floor((timeLeft % (60 * 1000)) / 1000);

                    await bot.sendMessage(chatId,"⏳ Это был 3 ответ на ваш вопрос. Пожалуйста, попробуйте снова завтра." + `\nОсталось времени ${hoursLeft} часа ${minutesLeft} минут ${secondsLeft} секунд\n`,consult )
                  
                } 

                if (user.quantityAnswersYoN === 3) { 

                    user.quantityAnswersYoN = 0;
                    user.lastRequestYoN = currentTime;
                    await user.save();
                }
            }

            // if (data === 'needConsult') {
            //     await bot.editMessageText("💫Для того чтобы получить личную консультацию у специалиста🧝‍♀️💬 и ответ на свой вопрос, необходимо оплатить 60 р", {
            //         chat_id: chatId,
            //         message_id: messageId,
            //         reply_markup: back.reply_markup
            //     });
            //     await sendInvoice(bot, chatId);
            //     if (!userStates[userId]) {
            //         userStates[userId] = {};
            //     }
            // }
            // if (data === 'needInfo') {
            //     await bot.editMessageText("Информация о правилах проведения итп итд...", {
            //         chat_id: chatId,
            //         message_id: messageId,
            //         reply_markup: back.reply_markup
            //     });
            // }
            // if (data === 'back') {
            //     await bot.editMessageText("Задай вопрос специалисту лично или приходи завтра и гадай снова! 🌙", {
            //         chat_id: chatId,
            //         message_id: messageId,
            //         reply_markup: consult.reply_markup
            //     });
            // }

            if (data === "/" && userStates[userId] && userStates[userId].category === "category3") {
                const user = await UserModel.findOne({ where: { chatId: chatId } })
                await user.update({PaidCategory: userStates[userId].category})
                await user.save()

            //     await bot.editMessageText("Для того чтобы узнать думает ли он или она о тебе, необходимо внести 60 ₽\n"+"\n*Данная услуга является единоразовой*", {
            //         chat_id: chatId,
            //         message_id: messageId,
            //         parse_mode: 'MarkdownV2'
            //         // reply_markup: paidConsult.reply_markup
            //     });
            //     await sendInvoice(bot, chatId);
            //  }
                
                // if (data === 'PaidButton') { 

                    await bot.editMessageText("Достаю карту из колоды...", {
                        chat_id: chatId,
                        message_id: messageId
                    });  
                    // const user = await UserModel.findOne({ where: { chatId: chatId } })
                    await bot.sendChatAction(chatId, "upload_photo");
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    await bot.editMessageText("Выкладываю 1 карту ", {
                        chat_id: chatId,
                        message_id: messageId
                    });  
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    await bot.editMessageText("Представь того о ком хочешь знать .... ", {
                        chat_id: chatId,
                        message_id: messageId
                    });  
                    await bot.sendChatAction(chatId, "upload_photo");
                    await new Promise(resolve => setTimeout(resolve, 3000));

                    // if(user.PaidCategory!=0) {
                        
                    const category = user.PaidCategory
                    console.log(category)
                    const { cardImage, predictionText } = getRandomCard(category);
                    await bot.sendPhoto(chatId, cardImage);
                    await bot.sendMessage(chatId, predictionText, consult);
                    await user.update({ invoiceMessageId: 0 })
                    await user.update({ PaidCategory: 0 })
                    await user.save();
                    // }

                   
                }



                // if (data === "/" && userStates[userId] && userStates[userId].category === "category4") {
                //     const user = await UserModel.findOne({ where: { chatId: chatId } })
                //     await user.update({PaidCategory: userStates[userId].category})
                //     await user.save()
    
                //     await bot.editMessageText("Для того чтобы узнать думает ли он или она о тебе, необходимо пополнить баланс на 60 р, данная услуга является единоразовой", {
                //         chat_id: chatId,
                //         message_id: messageId,
                //         reply_markup: paidConsult.reply_markup
                //     });
                //     await sendInvoice(bot, chatId);
                //  }
                    
                //     if (data === 'PaidButton') {
                //         const user = await UserModel.findOne({ where: { chatId: chatId } })
                //         if(user.PaidCategory!=0) {
                            
                //          await bot.editMessageText("Достаю карту из колоды...", {
                //             chat_id: chatId,
                //             message_id: messageId
                //         });

                //         await bot.sendChatAction(chatId, "upload_photo");
                //         await new Promise(resolve => setTimeout(resolve, 1000));
    
                //      const category = user.PaidCategory
                //         console.log(category)
                //         const { cardImage, predictionText } = getRandomCard(category);
                //         await bot.sendPhoto(chatId, cardImage);
                //         await bot.sendMessage(chatId, predictionText, consult);
                //         await user.update({ invoiceMessageId: 0 })
                //         await user.update({ PaidCategory: 0 })
                //         await user.save();
                //         }
                //     }


            if (data === 'pay') {
                await sendInvoice(bot, chatId);
            }

        } catch (error) {
            console.error(error);
        }
    });


    bot.on('pre_checkout_query', async query => {
        try {
            await handlePreCheckoutQuery(bot, query);
        } catch (error) {
            console.error(error);
        }

    });
    bot.on('successful_payment', async msg => {
        try {
             const chatId = msg.chat.id;
             const messageId = msg.message_id;
            await bot.deleteMessage(chatId,messageId-1)
            
            await handleSuccessfulPayment(bot, msg);
            const user = await UserModel.findOne({ where: { chatId: chatId } })
            user.invoiceMessageId = Date.now();
            await user.save()

        } catch (error) {
            console.error(error);
        }
    });
    console.log('Bot is running...');

}
start()
