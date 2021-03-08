const account = {
  "links": {
    "self": ""
  },
  "data": {
    "company": "MangoMap Limited",
		"address1": "76 Hawkins Cres, Bradley Stoke",
		"email": "admin@mangomap.com",
		"city": "Bristol",
		"state": "",
		"suite_unit": '',
		"postal_code": "BS32 8EH",
		"country": "GB",
    "plan_id": "pppppppp-pppp-pppp-pppp-pppppppppppp"
  }
}
export default function AccountHandler(req, res) {
  const {
    query: { id, name },
    method,
  } = req

  switch (method) {
    case 'GET':
      // Get data from your database
      res.status(200).json(account);
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
