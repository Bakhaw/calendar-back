import { Router } from 'express';
import moment from 'moment';
import Invitation from '../models/Invitation';

const router = Router();

// ? GET ALL INVITATIONS
router.get('/', (req, res) => {
  Invitation.find({}, (err, invitations) => {
    return err ? console.log(err) : res.json(invitations);
  });
});

// ? GET ONLY AVAILABLES INVITATIONS
router.get('/availables', (req, res) => {
  Invitation.find({ checked: false }, (err, invitations) => {
    return err ? console.log(err) : res.json(invitations);
  });
});

// ? GET ONLY DATES OF ALL INVITATIONS
router.get('/availables/dates', async (req, res) => {
  const query = { checked: false };

  let filteredDates = [];
  const formatted = [];

  await Invitation.find(query, (err, invit) => {
    if (err) return console.log(err);
    filteredDates = invit.map(d => d.dates.split(','));
  });


  filteredDates.forEach((d, index) => {
    d.forEach((e, j) => {
      const start = d[j].split('-')[0];
      const end = d[j].split('-')[1];

      formatted.push({ start, end, index })
    })
  });

  const result = formatted.reduce((acc, curr) => {
    //finding Index in the array where the index matched
    const findIfIndexExist = acc.findIndex(item => item.index === curr.index);
    // if in the new array no such object exist where
    // namecategory matches then create a new object
    if (findIfIndexExist === -1) {
      const obj = {
        index: curr.index,
        dates: [curr]
      }
      acc.push(obj)
    } else {
      // if name category matches , then push the value 
      acc[findIfIndexExist].dates.push(curr)
    }
    return acc;

  }, []);

  res.json(result)
});

// ? ADD A NEW INVITATION
router.post('/add', (req, res) => {
  const newInvitation = new Invitation(req.body);
  newInvitation.save((err, invitation) => {
    return err ? console.log(err) : res.json('Invitation created with success!')
  });
});

// ? UPDATE AN INVITATION
router.post('/update/:id', (req, res) => {
  Invitation.findByIdAndUpdate(req.params.id, req.body, (err, invitation) => {
    return err ? res.send(err) : res.json('Invitation updated with success!');
  });
});

// ? TOGGLE AN INVITATION TO TRUE (QUAND UN USER S'INSCRIT)
router.get('/toggleEventCheckToTrue/:eventId', (req, res) => {
  const query = { _id: req.params.eventId };
  const update = { checked: true };
  const options = { upsert: false, 'new': false };

  Invitation.findOneAndUpdate(query, update, options, (err, inv) => {
    return err ? console.log(err) : res.json(inv)
    // if (err) {
    //   return res.status(500).send(err);
    // }
    // if (!inv) {
    //   return res.status(400).send({ msg: 'Already exist or not found' });
    // }
    // return res.status(200).send({ message: "Thanks :)" });
  })
});

// ? TOGGLE AN INVITATION TO FALSE (QUAND UN USER SE DÉSINSCRIT)
router.get('/toggleEventCheckToFalse/:eventId', (req, res) => {
  const query = { _id: req.params.eventId };
  const update = { checked: false };
  const options = { upsert: false, 'new': false };

  Invitation.findOneAndUpdate(query, update, options, (err, inv) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!inv) {
      return res.status(400).send({ msg: 'Already exist or not found' });
    }
    return res.status(200).send({ message: "Thanks :)" });
  })
});

// ? REMOVE AN INVITATION
router.get('/delete/:id', (req, res) => {
  Invitation.findByIdAndRemove(req.params.id, (err, invitation) => {
    return err ? res.send(err) : res.json('Invitation removed with success!');
  });
});

export default router;