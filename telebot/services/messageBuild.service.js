import fetchService from "./fetch.service.js"
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc.js'
import timezone from 'dayjs/plugin/timezone.js'

dayjs.extend(utc)
dayjs.extend(timezone)

class MessageBuild {

    caseType(type) {
        switch(type) {
            case 'Лекция':
                return('🔴')
            case 'Семинар':
                return('🟢')
            case 'Модули на платформе':
                return('🟡')
            case 'Внеучебное мероприятие':
                return('🔵')
            case 'Экзамен':
                return('🟣')
            case 'Зачёт':
                return('🟣')
            case 'Пересдача':
                return('🟣')
            case 'Вебинар':
                return('🔴')
        }
    }

    async build() {
        try {
            const shedule = await fetchService.getCurrentShedule()
                if (!shedule.count) {
                    return ([`
<strong>Ура!</strong>
Сегодня список пар пуст ✨
`])
                }
                const newShedule = await Promise.all(shedule.data.map(event => {
                    return this.mutateEvent(event)
                })).then(data => {
                    return data
                })
                return (
                    newShedule.map(event => (
`<i><b>${event.title}</b></i>
${this.caseType(event.type)} ${event.type}

Группа: ${event.group ? event.group : 'Поток'}
Преподаватель: ${event.speaker}
Время: ${dayjs.utc(event.datetime).tz('Europe/Moscow').format('DD.MM.YYYY HH:mm')}

${event.link ? `🔗 Ссылка на подключение: ${event.link}` : "Ссылка отсутствует."}`
                    )).reverse()
                )
        } catch (e) {
            console.log(e)
            return e?.message
        }
    }

    async mutateEvent(event) {
        try {
            const group = await fetchService.getEventGroup(event.GroupId)
            const type = await fetchService.getEventType(event.TypeId)
            const speaker = await fetchService.getEventSpeaker(event.SpeakerId)
            return {
                ...event,
                group: group,
                type: type,
                speaker: speaker,
            }
        } catch (e) {
            console.log(e)
        }
    }

}

export default new MessageBuild()