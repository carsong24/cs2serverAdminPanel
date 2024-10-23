import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const auth = { login: process.env.AUTH_USER, password: process.env.AUTH_PASS }
  
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

    if (login && password && login === auth.login && password === auth.password) {
      res.status(200).json({ message: 'Authenticated' })
    } else {
      res.setHeader('WWW-Authenticate', 'Basic realm="401"')
      res.status(401).send('Authentication required.')
    }
  }
  