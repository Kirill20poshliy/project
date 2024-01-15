import { Telegraf } from 'telegraf'
import 'dotenv/config'
import shedule from 'node-schedule'

const bot = new Telegraf(process.env.BOT_TOKEN)
const rule = new shedule.RecurrenceRule()
rule.hour = 10
rule.minute = 0

const messages = []

bot.start((ctx) => {
    ctx.reply(`Привет, ${ctx.message.from.first_name}\nВыбери действие`, {
        reply_markup: {
            inline_keyboard: [
                [{text: 'Расписание на сегодня', callback_data: 'btn-1'}],
                [{text: 'Включить/выключить рассылку', callback_data: 'btn-2'}],
            ],
        },        
    })
    messages.push(ctx.message.message_id)
})

bot.command('clear', (ctx) => {
    messages.forEach(message => {
        ctx.deleteMessage(message) 
    });
})

bot.action('btn-1', (ctx) => {
    ctx.reply('Hello! From btn-1')
})
bot.action('btn-2', (ctx) => {
    ctx.reply('Hello! From btn-2')
    const job = shedule.scheduleJob(rule, () => {
        ctx.sendMessage('Shedule')
    })
})

bot.launch()


process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))