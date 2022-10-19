export type IRecruitmentData = {
    _id: string;
    name: string;
    status: StatusType;
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

export const statuses = [
    "pending",
    "emailed",
    "scheduled",
    "recommended",
    "on hold",
    "accepted",
    "rejected",
    "second pref",
    "filtered",
] as const;
export const statusesTooltips = [
    "Haven't been looked at yet",
    "An email has been sent and waiting for response",
    "An interview has been scheduled",
    "Interviewed and is recommended to be accepted",
    "Interviewed but on hold, to see if there are better candidates",
    "Final Acceptance",
    "Final Rejection",
    "Transferred to second preference",
    "Filtered out from the form and is now on the waiting list, in case we need more people",
];
export type StatusType = typeof statuses[number];

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
    | "Media"
    | "FR";
