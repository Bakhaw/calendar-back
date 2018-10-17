import mongoose from 'mongoose';

const InvitationSchema = new mongoose.Schema({
  name: String,
  dates: String,
  checked: Boolean
})

export default mongoose.model('Invitation', InvitationSchema, 'invitations');