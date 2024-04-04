import { Telegraf } from 'telegraf'
import 'dotenv/config'
import messageBuildService from './services/messageBuild.service.js'
// import shedule from 'node-schedule'

// const rule = new shedule.RecurrenceRule()
// rule.hour = 23
// rule.minute = 22

// const messages = []
const bot = new Telegraf(process.env.BOT_TOKEN)

const reply_keyboard = (ctx) => {
    ctx.reply(`Выбери действие`, {
        reply_markup: {
            inline_keyboard: [
                [{text: '📅 Расписание на сегодня', callback_data: 'btn-1'}],
            ],
        },        
    })
}


bot.start((ctx) => {
    reply_keyboard(ctx)
})

bot.action('btn-1', async (ctx) => {
    await messageBuildService.build().then(msg => {
        ctx.reply(msg, {parse_mode: 'HTML'})
        reply_keyboard(ctx)
    })
})

// bot.action('btn-2', (ctx) => {
//     ctx.reply(
// `Вы включили рассылку актуального расписания
// Рассылка будет приходить ежедневно в 10:00
// PS: Чтобы отключить данную функцию ${'${description}'}
// `)
//     const job = shedule.scheduleJob(rule, async () => {
//         await messageBuildService.build().then(msg => {
//             ctx.sendMessage(msg, {parse_mode: 'HTML'})
//         })
//     })
// })

bot.launch()


process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))