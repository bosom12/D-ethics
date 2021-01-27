import nodemailer from 'nodemailer';
import ses from 'nodemailer-ses-transport';
import { config } from 'dotenv';

config();

const transport = nodemailer.createTransport(
  ses({
    region: process.env.region,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  })
);

exports.Sender = async (options) => {
  const mailOptions = {
    from: `${options.name} <bosomadex@gmail.com>`,
    to: 'bosom.adex.sam@gmail.com',
    subject: `${options.name || options.from}: Job Invitation`,
    html: ``,
    text: `${options.message}. From: ${options.from}`
  };

  return transport.sendMail(mailOptions);
};

