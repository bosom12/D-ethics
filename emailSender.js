import { Router } from 'express'
import { Sender } from './email'


const router = Router();

const sendMail = router.post('/email/send', async (req, res) => {
  try {
    await Sender({
      from: req.body.email,
      message: req.body.message,
      name: req.body.name
    })
    return res.status(200)
      .jsend.success({ message: 'Thank you for your patronage!, Bosom will reply you soonest' })
  } catch (error) {
    return res.status(500).jsend.fail({ error: true, message: 'Oops! something went wrong' })
  }
})

export default sendMail;
