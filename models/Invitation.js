import mongoose from 'mongoose';

const InvitationSchema = new mongoose.Schema({
  dates: String,
})

export default mongoose.model('Invitation', InvitationSchema, 'invitations');