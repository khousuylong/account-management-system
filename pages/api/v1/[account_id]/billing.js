import jwt from 'jsonwebtoken';
const errorObj = {
  "links": {
    "self": ""
  },
  title: '',
  detail: '',
  transaction_error: {
    object: {},
    transaction_id: "",
    category: 'card declined',
    code: '',
    message: '',
    merchant_advice: '',
    three_d_secure_action_token_id: ''
  }
}

const {JWT_SECRET_KEY} = process.env

export default function userHandler(req, res) {
  const {
    query: { id, name },
    method,
  } = req

  switch (method) {
    case 'GET':
      // Get data from your database
      res.status(200).json({ id, name: `User ${id}` })
      break
    case 'PUT':

      const jwtToken = req.headers.authorization.split('Bearer ')[1]
      if(jwtToken){
        const decoded = jwt.verify(jwtToken, JWT_SECRET_KEY)    
        if(!decoded.admin){
          return res.status(401).json({});
        } 
      }

      //3DS request success
      if(req.query.token_id === 'three_d_secure_action_result_token_id') return res.status(200).json(req.body)

      //3DS challenged required
      if(req.body.first_name === '3-d-secure'){
        const error = {...errorObj};
        error['transaction_error']['category'] = "3d_secure_action_required";
        error['transaction_error']['three_d_secure_action_token_id'] = "2e232-232311sds";
        return res.status(422).json(error);
      }

      //Throw back card declined error, so client can display 
      if(req.body.first_name === 'declined'){
        return res.status(403).json(errorObj);
      }

      //Frictionless creating billing
      return res.status(200).json(req.body)
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
