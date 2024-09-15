import * as fs from 'fs/promises'
import Mustache from 'mustache'
import nodemailer from 'nodemailer'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function customizeEmail<T>(data: T, templateName: string) {
  const templatesDir = path.join(__dirname, 'mail')
  const templatePath = path.join(templatesDir, templateName)
  const html = (await fs.readFile(templatePath)).toString()

  const view = { ...data }
  const customized = Mustache.render(html, view)

  return customized
}

export async function sendEmail(
  html: string,
  to: string,
  subject: string,
  attachment?: string,
  filename?: string
) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    html,
    ...(attachment?.length && {
      attachments: [
        {
          filename,
          path: attachment,
        },
      ],
    }),
  }

  transporter.sendMail(
    { ...mailOptions, attachDataUrls: true },
    function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    }
  )
}
