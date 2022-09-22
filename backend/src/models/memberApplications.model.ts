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
      type: Number,
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
    otherTrackInterst: {
      type: String,
      required: true,
    },
    otherStudentActivities: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: 'RecruitmentApplications' },
);

const memberApplication = mongoose.model('RecruitmentApplication', memberApplicationsSchema);
export default memberApplication;
