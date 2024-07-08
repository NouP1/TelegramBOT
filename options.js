 
module.exports = { 

    menu:{
       reply_markup: JSON.stringify({ 
         inline_keyboard: [
           [{text:'✅ Подписаться ', url:'https://t.me/tkkd13',callback_data:'link'}],
           [{text:'🔮 Получить расклад ',callback_data:'getTaro'}],
           
           
         ]
       })
     },
     
     menuConst:{
      reply_markup: JSON.stringify({ 
          inline_keyboard: [
            [{text:'🌟 Карта дня', callback_data:'category1'}],
            [{text:'⚖ Впорос: да/нет?', callback_data:'category2'}],
            [{text:'💭 Что он/она думает о тебе ',callback_data:'category3'}],   
            [{text:'Число судьбы', callback_data:'category4'}],
            [{text:'🚶‍♂️ Перейти в канал', url:'https://t.me/tkkd13',callback_data:'link'}],
        ]
      })
    },

    //  limit:{
    //   reply_markup: JSON.stringify({ 
    //     inline_keyboard: [
    //       [{text:'Перейти в канал', url:'https://t.me/tkkd13',callback_data:'link'}],
    //       [{text:'Оплатить подписку за 1₽ ⚡', callback_data:'pay'}],
          
          
    //     ]
    //   })
    // },

     category:{
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [{text:'🌟 Карта дня', callback_data:'category1'}],
            [{text:'⚖ Впорос: да/нет?', callback_data:'category2'}],
            [{text:'💭 Что он/она думает о тебе 💭',callback_data:'category3'}],
            [{text:'Число судьбы', callback_data:'category4'}],
            [{text:'🚶‍♂️ Перейти в канал', url:'https://t.me/tkkd13',callback_data:'link'}],
               
            // [{text:'Карьера 📈', callback_data:'category4'}],
            // [{text:'Деньги 💸',callback_data:'category4'}],
         
           



           
            //[{text:'<- Назад',callback_data:'back'}]
            
          ]
        })
      },
   
    getTaro:{
       reply_markup: JSON.stringify({
         inline_keyboard: [
           [{text:'Выбрать карту 💫', callback_data:'/'}],
        
           
          
           //[{text:'<- Назад',callback_data:'back'}]
           
         ]
       })
     },
    paidButton:{
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{text:'Выбрать карту 💫', callback_data:'PaidButton'}],
       
          
         
          //[{text:'<- Назад',callback_data:'back'}]
          
        ]
      })
    },
   
    
     consult:{
       reply_markup: JSON.stringify({
         inline_keyboard: [
          [{text:'📂 Изменить категорию ',callback_data:'getTaro'}], 
           [{text:'🔮 Гадать еще раз ',callback_data:'/'}], 
             [{text:'🚶‍♂️Перейти в канал', url:'https://t.me/tkkd13',callback_data:'link'}],
         ]
       })
     },
     paidConsult:{
      reply_markup: JSON.stringify({
        inline_keyboard: [
         [{text:'📂 Изменить категорию ',callback_data:'getTaro'}],
         [{text:'🚶‍♂️ Перейти в канал', url:'https://t.me/tkkd13',callback_data:'link'}], 
        ]
      })
    },
    back:{
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{text:'Назад',callback_data:'back'}], 
          
        ]
      })
    },
     years6:{
       reply_markup: JSON.stringify({
         inline_keyboard: [
           [{text:'ПН 14-00',callback_data:'/'}],
           [{text:'ВТ 17-00',callback_data:'/'}],
           [{text:'ЧТ 17-30',callback_data:'/'}],
           [{text:'<- Назад',callback_data:'back3'}]
           
         ]
       })
     },
     years9:{
       reply_markup: JSON.stringify({
         inline_keyboard: [
           [{text:'ВТ 17-00',callback_data:'/'}],
           [{text:'СР 19-00',callback_data:'/'}],
           [{text:'ЧТ 12-00',callback_data:'/'}],
           [{text:'<- Назад',callback_data:'back3'}]
           
         ]
       })
     },
     years13:{
       reply_markup: JSON.stringify({
         inline_keyboard: [
           [{text:'СР 19-00',callback_data:'/'}],
           [{text:'ПН 14-00',callback_data:'/'}],
           [{text:'ЧТ 15-30',callback_data:'/'}],
           [{text:'<- Назад',callback_data:'back3'}]
           
         ]
       })
     },
     years18:{
       reply_markup: JSON.stringify({
         inline_keyboard: [
           [{text:'ПТ 19-00',callback_data:'/'}],
           [{text:'ВТ 17-00',callback_data:'/'}],
           [{text:'ЧТ 20-00',callback_data:'/'}],
           [{text:'<- Назад',callback_data:'back3'}]
           
         ]
        
               
             
       })
     },
     district:{
           reply_markup: JSON.stringify({
             inline_keyboard: [
               [{text:'Свердловский',callback_data:'Свердловский'}],
               [{text:'Ленинский',callback_data:'Ленинский'}],
               [{text:'Закамск',callback_data:'Закамск'}],
               [{text:'<- Назад',callback_data:''}]
             ]
   } )
     }}