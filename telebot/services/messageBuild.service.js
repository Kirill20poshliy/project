import fetchService from "./fetch.service.js"
import dayjs from "dayjs"

class MessageBuild {

    async build() {
        try {
            const shedule = await fetchService.getCurrentShedule()
                if (!shedule.count) {
                    return (`
<strong>Ура!</strong>
Сегодня список пар пуст ✨
`)
                }
                const newShedule = await Promise.all(shedule.data.map(event => {
                    return this.mutateEvent(event)
                })).then(data => {
                    return data
                })
            return `
<strong>Актуальное расписание:</strong>

${newShedule.map(event => (
`<i><b>${event.title}</b></i>
${event.type}

Группа: ${event.group ? event.group : 'Поток'}
Преподаватель: ${event.speaker}
Время: ${dayjs(event.datetime).format('DD.MM.YYYY HH:mm')}
${event.link ? `Ссылка на подключение: ${event.link}` : "Ссылка отсутствует."}

`))}`
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