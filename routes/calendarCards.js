import { Router } from 'express';
import CalendarCard from '../models/CalendarCard';

const router = Router();

router.get('/', (req, res) => {
  CalendarCard.find({}, (err, calendarCards) => {
    return err ? console.log(err) : res.json(calendarCards);
  });
});

router.post('/add', (req, res) => {
    console.log('POST CALENDAR', req.body)
  const newInvitation = new CalendarCard(req.body);
  newInvitation.save((err, calendarCard) => {
    err ? console.log(err) : res.json('CalendarCard updated with success!');
  });
});

router.post('/update/:id', (req, res) => {
  CalendarCard.findByIdAndUpdate(req.params.id, req.body, (err, calendarCard) => {
    return err ? res.send(err) : res.json('CalendarCard updated with success!');
  });
});

router.get('/delete/:id', (req, res) => {
  CalendarCard.findByIdAndRemove(req.params.id, (err, calendarCard) => {
    return err ? res.send(err) : res.json('CalendarCard removed with success!');
  });
});

export default router;