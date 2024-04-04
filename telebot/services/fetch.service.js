import dayjs from 'dayjs'
import axios from 'axios'

class FetchService {

    baseUrl = 'http://91.236.199.149/'

    async getCurrentShedule() {
        try {
            const now = dayjs(Date.now())
            const year = now.year()
            const month = now.month()
            const day = now.date()
            const result = await axios.get(
                `${this.baseUrl}api/events?year=${year}&month=${month}&day=${day}`
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
                `${this.baseUrl}api/groups/${id}`
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
                `${this.baseUrl}api/types/${id}`
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
                `${this.baseUrl}api/speakers/${id}`
            )
            return result.data?.data.name
        } catch (e) {
            console.log(e)
            return(e?.message)
        }
    }

    async registerJob() {
        try {
            const result = await axios({
                method: 'POST',
                url: `${this.baseUrl}api/speakers/${id}`,
                data: {}
            })
            return result.data?.data
        } catch (e) {
            console.log(e)
            return(e?.message)
        }        
    }
    
}

export default new FetchService()