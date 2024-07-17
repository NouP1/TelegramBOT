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
            
            if (text === '/pay') {

                await sendInvoice(bot, chatId);
            }


            if (text === '/start') {
                const user = await UserModel.findOrCreate({ where: { chatId: chatId }, defaults: { chatId: chatId, firstName: firstName, username: username }})
                const table = await UserModel.findAll()
                let pass = await bot.getChatMember("@tkkd13", msg.from.id);
                if(pass.status==='left'){
                     await bot.sendMessage(chatId, "Чтобы получить ответ нужно" +" *подписаться* "+ "на мой канал",{parse_mode:'MarkdownV2',reply_markup:menu.reply_markup});
                }
                else if(messageId!= null){ 
                await bot.sendMessage(chatId,"Что тебя интересует сегодня?",menuConst );
                await bot.sendSticker(chatId, "./sticker.webp")
                   
                }
                
            }
            const user = await UserModel.findOne({ where: { chatId: chatId } });

            if(user.consultMessageId===1 && text!='/start'){

                const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])\.(0?[1-9]|1[012])\.(19|20)\d\d$/;
                if (dateRegex.test(text)) {
                    // Разбиваем строку на компоненты
                    const [day, month, year] = text.split('.').map(Number);
            
                    // Суммируем цифры
                    let sum = [...(day.toString() + month.toString() + year.toString())].reduce((acc, digit) => acc + parseInt(digit), 0);
            
                    // Преобразуем в число судьбы
                    while (sum > 9) {
                        sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
                    }
                
                    if(sum === 1) {
                        await bot.sendPhoto(chatId,'./img/1.jpg')
                        await bot.sendMessage(chatId, `✨<b>Число судьбы ${sum}</b>✨\n\nАбмициозный и агрессивный человек, которым управляет солнце. Человек, рожденный под знаком единицы - это человек с огромной внутренней энергией. Выдающиеся личности, с высоким самомнением \n 
                        \n<b> Минусы </b> 😈\n\nЭмоции и агрессия чаще берет вверх на ними, чем здравый смысл. Удовлетворение амбиций-главная цель их жизни, ради которой они способны пойти по головам`,{parse_mode:'HTML',reply_markup:paidConsult.reply_markup});      
                    }
                    if(sum === 2) {
                        await bot.sendPhoto(chatId,'./img/2.jpg')
                        await bot.sendMessage(chatId, `✨<b>Число судьбы ${sum}</b>✨\n\nНикогда не будет вступать в конфликт с окружающими, не пытаются выделиться любой ценой, подчинять себе других или навязывать им собственную волю. Им свойственно прощать и всему легко находить оправдание. Двойка является женским числом и поэтому они умеют ценить утонченное, духовное и интеллектуальное. Эти люди чувствуют отвращение к любым проявлениям малодушия\n 
                        \n<b> Минусы </b> 😈\n\nЛицемерие, пытаются угодить всем, из-за чего не могут отстоять свои границы. Соврут, чтобы не обидеть.`,{parse_mode:'HTML',reply_markup:paidConsult.reply_markup});
                    }
                    if(sum === 3) {
                        await bot.sendPhoto(chatId,'./img/3.jpg')
                        await bot.sendMessage(chatId, `✨<b>Число судьбы ${sum}</b>✨\n\nОни любят находиться в центре внимания, им доставляют удовольствие похвалы и комплименты. Умеют наслаждаться жизнью сами и доставлять много радости окружающим. Всегда принимают как должное то, что уготовила им судьба. Мало кто устоит перед их обаянием и очарованием. Болтливые, легко налаживают контакты. Ко всему прочему они отличаются активностью и находчивостью, а своим энтузиазмом и оптимизмом вдохновляют других, но редко хотят быть лидером\n 
                        \n<b> Минусы </b> 😈\n\nТщеславие, они не решаются хвалить других, чаще выступают как суровый критик.`,{parse_mode:'HTML',reply_markup:paidConsult.reply_markup});
                      
                    }
                    if(sum === 4) {
                        await bot.sendPhoto(chatId,'./img/4.jpg')
                        await bot.sendMessage(chatId, `✨<b>Число судьбы ${sum}</b>✨\n\nВ большинстве своем, это консерваторы, руководствующиеся в жизни разумом и здравым смыслом. Им часто выпадает шанс продвинуться вперед, но их сомневающийся характер постоянно внушает им подозрения, и они упускают открывающиеся возможности. Отсюда вытекает их другая черта - верность. У числа 4  друзья еще с деткого сада. На них всегда можно положиться. Если они что-либо обещают, то выполнят обещание. Люди этого числа должны искать занятия, требующие концентрации, аккуратности и терпения. Они умеют выполнять монотонные задания, перед которыми другие бессильны\n 
                        \n<b> Минусы </b> 😈\n\nВ том, что касается их семьи и любимых людей, они могут быть слишком властными. Меркантильность, ревность и инстинкт собственницы. Любое жизненное начинание оценивает в свете получения материального благосостояния. Это распространяется и на выбор партнера\n`,{parse_mode:'HTML',reply_markup:paidConsult.reply_markup});
                        
                    }
                    if(sum === 5) {
                        await bot.sendPhoto(chatId,'./img/5.jpg')
                        await bot.sendMessage(chatId, `✨<b>Число судьбы ${sum}</b>✨\n\nПостоянном стремлении к приключениям, врожденный ум, оптимизм и неуемная энергия — залог того, что ваша жизнь будет наполнена знаниями. Вы с рождения весьма талантливый человек. Именно ваши способности поспособствуют поиску походящей вам ниши для самовыражения. Вам может быть тяжело контактировать с одними и теме же людьми, на одной работе много лет\n 
                        \n<b> Минусы </b> 😈\n\nНепостоянство, ненадежность, неуравновешенность, безответственность, чрезмерная доверчивость, авантюризм, эксцентричность. Они должны тщательно выбирать профессию, так как рутина и отсутствие ярких впечатлений может быть причиной неудачи в жизни\n`,{parse_mode:'HTML',reply_markup:paidConsult.reply_markup});
                       
                    }      
                    if(sum === 6) {
                        await bot.sendPhoto(chatId,'./img/6.jpg')
                        await bot.sendMessage(chatId, `✨<b>Число судьбы ${sum}</b>✨\n\nУ них острый язык, которым они издеваются в шутку и иногда легко причиняют боль людям. Такие люди притягательны, мягки, обходительны, любят что подороже. Они легко привлекают к себе к себе людей, потакая им, пользуются их любовью и уважением. Им не нужно главным, лидером (это не значит, что они не могут) - просто для них это не важно\n 
                        \n<b> Минусы </b> 😈\n\nПридирчивость, ворчливость, самодовольство,  потакание своим прихотям. Для них типична некоторая двойственность в поступках и действиях\n`,{parse_mode:'HTML',reply_markup:paidConsult.reply_markup});
                        
                    }
                    if(sum === 7) {
                        await bot.sendPhoto(chatId,'./img/7.jpg')
                        await bot.sendMessage(chatId, `✨<b>Число судьбы ${sum}</b>✨\n\nВы вникаете во все, стараясь докопаться до ясной причины вещей. Вы ничего не примете на веру, но составите свое — и прочное — мнение о предмете. Когда семя мысли попадает в ваше подсознание, вы будете долго его вынашивать, пока в уме не заиграет всеми красками образ, досконально вам теперь понятный. прирожденные философы, заинтересованные больше вопросами мысли и духа, нежели материальной стороной жизни. Представители этого числа чаще всего люди, стремящиеся познать и проникнуть в суть всего неизвестного и таинственного. Семерка не будет много болтать, она выслушает вас и составит свое мнение\n 
                        \n<b> Минусы </b> 😈\n\nМинусов нет…почти\n`,{parse_mode:'HTML',reply_markup:paidConsult.reply_markup});
                       
                    }
                    if(sum === 8) {
                        await bot.sendPhoto(chatId,'./img/8.jpg')
                        await bot.sendMessage(chatId, `✨<b>Число судьбы ${sum}</b>✨\n\nДеньги, власть и успех — вот чем отмечена их жизнь. У них удивительная способность воплощать идеи в реальность, решаются на то, о чем другие и не мечтают. Они, по сравнению с другими, более энергичны, боевиты, честолюбивы, даровиты, уравновешенны и уверены в себе. Обладают ярко выраженной индивидуальностью, отличаются крайними взглядами, импульсивным и решительным характером, дерзки. Доверяют только себе, а их решения опираются на реальный анализ всех «за и «против» данного дела\n 
                        \n<b> Минусы </b> 😈\n\nВластолюбие, неправильное использование своих сил, чрезмерное стремление к богатству, цинизм, неподчинение, игра людьми, самовлюбленность, тиранство\n`,{parse_mode:'HTML',reply_markup:paidConsult.reply_markup});
                       
                    }
                    if(sum === 9) {
                        await bot.sendPhoto(chatId,'./img/9.jpg')
                        await bot.sendMessage(chatId, `✨<b>Число судьбы ${sum}</b>✨\n\nЧувствительны и сентиментальны, в выражении своих чувств проявляют сдержанность, не любят делать свои чувства достоянием окружающих. Они романтичны и мечтательны. Если встретят настоящую любовь, то посвящают себя ей без остатка. Они относятся к наиболее преданным и верным спутникам жизни. Их жизненным предназначением является быть для других «маяком», который освещает, облагораживает и указывает истинный смысл жизни всем тем, кто встречается на их пути\n 
                        \n<b> Минусы </b> 😈\n\nТе еще капризули, часто уходят в себя и закрываются от людей. Нетерпиливы, часто витают в своих иллюзиях\n`,{parse_mode:'HTML',reply_markup:paidConsult.reply_markup});
                      
                    }
                    user.consultMessageId = 0;
                    await user.save();
                } else {
                    
                    bot.sendMessage(chatId, 'Пожалуйста, введите дату рождения в формате ДД.ММ.ГГГГ (например, 11.02.1986).');
                }  
            }

        } catch (error) {
            console.log(error)
        } 
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

                }
                else {
                    await bot.editMessageText("📂 Выберите категорию ", {
                        chat_id: chatId,
                        message_id: messageId,
                        reply_markup: category.reply_markup
                    });
                }

            }

            const categories = ['category1', 'category2', 'category2', 'category3'];
            if (categories.includes(data)) {
                if (!userStates[userId]) {
                    userStates[userId] = {};
                }

                userStates[userId] = { category: data };

                await bot.sendMessage(chatId,"Перетасовываю колоду...")
                

                await bot.sendChatAction(chatId, "typing")
                await new Promise(resolve => setTimeout(resolve, 1000));
                await bot.sendMessage(chatId,"Выбери одну карту из колоды 👇",getTaro);
            }


            if (data === "/" && userStates[userId] && userStates[userId].category === "category1") {

                const user = await UserModel.findOne({ where: { chatId: chatId } })
              

                if (user.lastRequestCardDay && (currentTime - user.lastRequestCardDay) < oneDay) {
                    const timeLeft = oneDay - (currentTime - user.lastRequestCardDay);
                    const hoursLeft = Math.floor(timeLeft / (60 * 60 * 1000));
                    const minutesLeft = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));
                    const secondsLeft = Math.floor((timeLeft % (60 * 1000)) / 1000);

                    await bot.editMessageText("⏳ Вы уже получили карту сегодняшнего дня. Пожалуйста, попробуйте снова завтра. \n" + `\nОсталось времени ${hoursLeft} часа ${minutesLeft} минут ${secondsLeft} секунд\n` , {
                        chat_id: chatId,
                        message_id: messageId,
                        reply_markup: consult.reply_markup
                    });

                    
                } else {

                    await bot.sendMessage(chatId,"Достаю карту из колоды...");
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
                    await bot.sendMessage(chatId,"Достаю карту из колоды...");
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
                    await bot.sendMessage(chatId,"Достаю карту из колоды...");
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

         
     

            if (data === "/" && userStates[userId] && userStates[userId].category === "category3") {
                const user = await UserModel.findOne({ where: { chatId: chatId } })
                await user.update({PaidCategory: userStates[userId].category})
                await user.save()

                    await bot.sendMessage(chatId,"Достаю карту из колоды...");  
    
                    await bot.sendChatAction(chatId, "upload_photo");
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    await bot.sendMessage(chatId,"Выкладываю 1 карту ");  
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    await bot.sendMessage(chatId,"Представь того о ком хочешь знать .... ");  
                    await bot.sendChatAction(chatId, "upload_photo");
                    await new Promise(resolve => setTimeout(resolve, 3000));
                        
                    const category = user.PaidCategory
                    console.log(category)
                    const { cardImage, predictionText } = getRandomCard(category);
                    await bot.sendPhoto(chatId, cardImage);
                    await bot.sendMessage(chatId, predictionText, consult);
                    await user.update({ invoiceMessageId: 0 })
                    await user.update({ PaidCategory: 0 })
                    await user.save();
                  
                   
                }

            if (data === 'category4') {
                const user = await UserModel.findOne({ where: { chatId: chatId } })
                await user.update({consultMessageId: 1})
                await user.save()
                await bot.sendMessage(chatId,"Чтобы узнать число судьбы отправь мне дату своего рождения в формате 25.08.1999");  
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
