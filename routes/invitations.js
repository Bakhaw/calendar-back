import { Router } from 'express';
import Invitation from '../models/Invitation';

const router = Router();

router.get('/', (req, res) => {
  Invitation.find({}, (err, invitations) => {
    return err ? console.log(err) : res.json(invitations);
  });
});

router.post('/add', (req, res) => {
  const newInvitation = new Invitation(req.body);
  newInvitation.save((err, invitation) => {
    return err ? console.log(err) : res.json('Invitation created with success!')
  });
});

router.post('/update/:id', (req, res) => {
  Invitation.findByIdAndUpdate(req.params.id, req.body, (err, invitation) => {
    return err ? res.send(err) : res.json('Invitation updated with success!');
  });
});

router.get('/delete/:id', (req, res) => {
  Invitation.findByIdAndRemove(req.params.id, (err, invitation) => {
    return err ? res.send(err) : res.json('Invitation removed with success!');
  });
});

export default router;