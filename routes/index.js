import { Router } from 'express';
import Invitation from '../models/Invitation';

const router = Router();

router.get('/invitations', (req, res) => {
  Invitation.find({}, null, { skip: 0, sort: { dates: 0 }}, (err, invitations) => {
    console.log('here', invitations)
    return err ? console.log(err) : res.json(invitations);
  });
});

router.post('/invitations/add', (req, res) => {
  let newInvitation;
  const allValues = req.body.dates.split(',');

  allValues.forEach(async (dates, index) => {
    req.body.dates = await dates;
    newInvitation = new Invitation(req.body);
    await newInvitation.save();
  });
  res.redirect('http://localhost:8080/')
})

router.post('/invitations/update/:id', (req, res) => {
  Invitation.findByIdAndUpdate(req.params.id, req.body, (err, invitation) => {
    return err ? res.send(err) : res.json(`${invitation.name} updated with success!`);
  })
})

router.get('/invitations/delete/:id', (req, res) => {
  Invitation.findByIdAndRemove(req.params.id, (err, invitation) => {
    return err ? res.send(err) : res.json(`${invitation.name} updated with success!`);
  });
});

export default router;