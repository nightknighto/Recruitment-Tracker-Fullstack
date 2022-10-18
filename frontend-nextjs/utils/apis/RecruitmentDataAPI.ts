import axios from 'axios'
import config from '../config'
import { authHeader } from '../services/auth'
import { StatusType } from '../types/RecruitmentDataTypes'

async function getAllData() {
    const response = await axios.get(`${config.backendUrl}/memberapplications`, {headers: authHeader()})
    return response.data
}

async function setStatus(id: string, status: StatusType) {
    const payload = {
        "_id": id,
        "data": {
            "status": status
        }
    }
    const response = await axios.put(`${config.backendUrl}/memberapplications`, payload, {headers: authHeader()})
    return response.data
}

const RecruitmentDataAPI = {
    getAllData,
    setStatus
}

export default RecruitmentDataAPI