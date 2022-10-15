import data from '../data.json'
import { IRecruitmentData } from '../types/RecruitmentDataTypes'
import axios from 'axios'
import config from '../config'

async function getAllData() {
    console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
    const response = await axios.get(`${config.backendUrl}/memberapplications`)
    return response.data
}

const RecruitmentDataAPI = {
    getAllData
}

export default RecruitmentDataAPI