import router from 'express';
import { Sender } from './email';



const sendMail = router.post('/email/send', async (req, res) => {
  try {
    await Sender({ from: req.body.email, message: req.body.message, name: req.body.name });
    return res.status(200).json({ message: 'Thank you for your patronage!', status: 'Bosom will reply you soonest!' });
  } catch (error) {
    return res.status(500).json({ message: 'Oops! something went wrong', error });
  }
});

export default sendMail;