import data from '../data.json'
import IRecruitmentData from '../interfaces/RecruitmentData'

async function getAllData() {
    return data as IRecruitmentData[]
}

const RecruitmentDataAPI = {
    getAllData
}

export default RecruitmentDataAPI