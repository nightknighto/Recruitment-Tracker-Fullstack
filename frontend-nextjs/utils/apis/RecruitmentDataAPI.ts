import axios from 'axios'
import config from '../config'
import { authHeader } from '../services/auth'

async function getAllData() {
    const response = await axios.get(`${config.backendUrl}/memberapplications`, {headers: authHeader()})
    return response.data
}

const RecruitmentDataAPI = {
    getAllData
}

export default RecruitmentDataAPI