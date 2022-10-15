export type IRecruitmentData = {
    _id: string;
    name: string;
    status: "pending" | "accepted" | "rejected";
    submissionTime: string;
    collegeID: number;
    phone: number;
    email: string;
    year: string;
    track: TracksType;
    knowledge: string;
    trackReason: string;
    otherTrackInterest: string;
    otherTrackInterestReason?: string;
    otherStudentActivites: string;
};

export type TracksType =
    | "(AC) Embedded Systems"
    | "(AC) Web Development"
    | "(AC) Flutter Mobile Applications"
    | "(AC) Desktop C++ Applications"
    | "(AC) Competitive Programming"
    | "(AC) Android (Kotlin) Mobile Applications"
    | "Logistics"
    | "PR"
    | "HR"
    | "Media";
