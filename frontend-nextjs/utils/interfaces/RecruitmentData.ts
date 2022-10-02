
export default interface IRecruitmentData {
    "_id": string,
    "name": string,
    "status": "pending" | "accepted" | "rejected",
    "submissionTime": string,
    "collegeID": number,
    "phone": number,
    "email": string,
    "year": string,
    "track": string,
    "knowledge": string,
    "trackReason": string,
    "otherTrackInterest": string,
    "otherTrackInterestReason"?: string,
    "otherStudentActivites": string
}