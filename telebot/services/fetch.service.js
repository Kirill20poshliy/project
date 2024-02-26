import dayjs from 'dayjs'
import axios from 'axios'

class FetchService {

    async getCurrentShedule() {
        try {
            const now = dayjs(Date.now())
            const year = now.year()
            const month = now.month()
            const day = now.date()
            const result = await axios.get(
                `http://localhost:8080/api/events?year=${year}&month=${month}&day=${day}`
            )
            return result.data
        } catch (e) {
            console.log(e)
            return(e?.message)
        }
    }

    async getEventGroup(id) {
        try {
            const result = await axios.get(
                `http://localhost:8080/api/groups/${id}`
            )
            return result.data.data?.code
        } catch (e) {
            console.log(e)
            return(e?.message)
        }
    }

    async getEventType(id) {
        try {
            const result = await axios.get(
                `http://localhost:8080/api/types/${id}`
            )
            return result.data.data?.name
        } catch (e) {
            console.log(e)
            return(e?.message)
        }
    }

    async getEventSpeaker(id) {
        try {
            const result = await axios.get(
                `http://localhost:8080/api/speakers/${id}`
            )
            return result.data?.data.name
        } catch (e) {
            console.log(e)
            return(e?.message)
        }
    }
    
}

export default new FetchService()