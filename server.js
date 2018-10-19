import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import config from './config';
import invitationsRoutes from './routes/invitations';
import calendarCardsRoutes from './routes/calendarCards';

const app = express();

mongoose.connect(config.mongoUrl, { useNewUrlParser: true }, () => console.log(`DB connected at ${config.mongoUrl} ...`));

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/invitations', invitationsRoutes);
app.use('/calendar', calendarCardsRoutes);

app.listen(config.port, () => console.log(`App running on port ${config.port} ...`))