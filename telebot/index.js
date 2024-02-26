import { Telegraf } from 'telegraf'
import 'dotenv/config'
import shedule from 'node-schedule'
import messageBuildService from './services/messageBuild.service.js'

const bot = new Telegraf(process.env.BOT_TOKEN)
const rule = new shedule.RecurrenceRule()
rule.hour = 23
rule.minute = 22

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

bot.action('btn-1', async (ctx) => {
    await messageBuildService.build().then(msg => {
        ctx.reply(msg, {parse_mode: 'HTML'})
    })
})

bot.action('btn-2', (ctx) => {
    ctx.reply(
`Вы включили рассылку актуального расписания
Рассылка будет приходить ежедневно в 10:00
PS: Чтобы отключить данную функцию ${'${description}'}
`)
    const job = shedule.scheduleJob(rule, async () => {
        await messageBuildService.build().then(msg => {
            ctx.sendMessage(msg, {parse_mode: 'HTML'})
        })
    })
})

bot.launch()


process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))