import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const memberApplicationsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    collegeID: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    track: {
      type: String,
      required: true,
    },
    knowledge: {
      type: String,
      required: true,
    },
    trackReason: {
      type: String,
      required: true,
    },
    otherTrackInterest: {
      type: String,
      required: true,
    },
    otherTrackInterestReason: {
      type: String,
      required: true,
    },
    otherStudentActivites: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    submissionTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: 'RecruitmentApplications' },
);

const memberApplication = mongoose.model('RecruitmentApplication', memberApplicationsSchema);
export default memberApplication;
