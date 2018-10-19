import mongoose from 'mongoose';

const CalendarCardSchema = new mongoose.Schema({
    title: String,
    start: Date,
    end: Date,
    invitationId: String
})

export default mongoose.model('CalendarCard', CalendarCardSchema, 'calendar_cards');