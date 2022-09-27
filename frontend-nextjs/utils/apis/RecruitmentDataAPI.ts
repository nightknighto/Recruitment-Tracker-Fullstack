import data from '../data.json'
import IRecruitmentData from '../interfaces/RecruitmentData'

export async function getAllData() {
    return data as IRecruitmentData[]
}