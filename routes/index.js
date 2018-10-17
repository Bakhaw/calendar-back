import { Router } from 'express';
import Invitation from '../models/Invitation';

const router = Router();

router.get('/invitations', (req, res) => {
  Invitation.find({}, (err, invitations) => {
    return err ? console.log(err) : res.json(invitations);
  });
});

router.post('/invitations/add', (req, res) => {
  const newInvitation = new Invitation(req.body);

  newInvitation.save((err, invitation) => {
    return err ? console.log(err) : res.json(`${invitation.name} added with success!`);
  });
});

router.post('/invitations/update/:id', (req, res) => {
  Invitation.findByIdAndUpdate(req.params.id, req.body, (err, invitation) => {
    return err ? res.send(err) : res.json(`${invitation.name} updated with success!`);
  })
})

router.get('/invitations/delete/:id', (req, res) => {
  Invitation.findByIdAndRemove(req.params.id, (err, invitation) => {
    return err ? res.send(err) : res.json(`${invitation.name} updated with success!`);
  });
});

export default router;