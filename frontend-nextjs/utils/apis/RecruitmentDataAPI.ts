import data from '../data.json'
import { IRecruitmentData } from '../types/RecruitmentDataTypes'

async function getAllData() {
    return data as unknown as IRecruitmentData[]
}

const RecruitmentDataAPI = {
    getAllData
}

export default RecruitmentDataAPI