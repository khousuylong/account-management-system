import jwt from 'jsonwebtoken';
const {JWT_SECRET_KEY} = process.env
export default function Login(req, res) {
  const {
    method,
  } = req

  switch (method) {
    case 'POST':
      if(!req.body){
        res.status(404).end('Error')
        return;
      }

      const {username, password } = JSON.parse(req.body);
      res.status(200).json({token: jwt.sign({username, admin: username === 'admin'}, JWT_SECRET_KEY)})
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
