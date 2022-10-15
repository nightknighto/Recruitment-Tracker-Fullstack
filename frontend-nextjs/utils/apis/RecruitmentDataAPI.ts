import axios from 'axios'
import config from '../config'

async function getAllData() {
    const response = await axios.get(`${config.backendUrl}/memberapplications`)
    return response.data
}

const RecruitmentDataAPI = {
    getAllData
}

export default RecruitmentDataAPI