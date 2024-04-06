import { Telegraf } from 'telegraf'
import 'dotenv/config'
import messageBuildService from './services/messageBuild.service.js'
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'

dayjs.extend(utc)
dayjs.extend(timezone)
// import shedule from 'node-schedule'

// const rule = new shedule.RecurrenceRule()
// rule.hour = 23
// rule.minute = 22

// const messages = []
const bot = new Telegraf(process.env.BOT_TOKEN)

const reply_btns = async (ctx) => {
    await ctx.reply(`Выбери действие`, {
        reply_markup: {
            inline_keyboard: [
                [{text: '📅 Расписание на сегодня', callback_data: 'btn-1'}],
                // [{text: '⏰ Включить/выключить напоминания', callback_data: 'btn-2'}],
            ],
        },        
    })
}

bot.start((ctx) => {
    reply_btns(ctx)
})

bot.action('btn-1', async (ctx) => {
    messageBuildService.build().then(async messages => {
        await ctx.sendMessage(
            `<b>Расписание на ${dayjs.utc(Date.now()).tz('Europe/Moscow').format('DD.MM.YYYY')}</b>`,
            {chat_id: ctx.chat.id, parse_mode: 'HTML'}
        )
        await messages.map(message => {
            ctx.sendMessage(message, {chat_id: ctx.chat.id, parse_mode: 'HTML'})
        })
        await reply_btns(ctx)
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