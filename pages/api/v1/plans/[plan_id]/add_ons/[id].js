const add_ons = [
  {
    "links": {
      "self": ""
    },
    "data": {
      "code": "1333000",
      "name": "Administrators",
      "currencies": [
        {
          "currency": "USD",
          "unit_ammount": 122 
        }
      ]
    }
  },
  {
    "links": {
      "self": ""
    },
    "data": {
      "code": "1222000",
      "name": "Data Editors",
      "currencies": [
        {
          "currency": "USD",
          "unit_ammount": 100 
        }
      ]
    }
  },
  {
    "links": {
      "self": ""
    },
    "data": {
      "code": "1222100",
      "name": "Administrators",
      "currencies": [
        {
          "currency": "USD",
          "unit_ammount": 122 
        }
      ]
    }
  },
  {
    "links": {
      "self": ""
    },
    "data": {
      "code": "1333100",
      "name": "Data Editors",
      "currencies": [
        {
          "currency": "USD",
          "unit_ammount": 100 
        }
      ]
    }
  },
  {
    "links": {
      "self": ""
    },
    "data": {
      "code": "1222003",
      "name": "Administrators",
      "currencies": [
        {
          "currency": "USD",
          "unit_ammount": 1235 
        }
      ]
    }
  },
  {
    "links": {
      "self": ""
    },
    "data": {
      "code": "1333003",
      "name": "Data Editors",
      "currencies": [
        {
          "currency": "USD",
          "unit_ammount": 100 
        }
      ]
    }
  }
]
export default function AddonsHandler(req, res) {
  const {
    query: { id },
    method,
  } = req

  switch (method) {
    case 'GET':
      // Get data from your database
      res.status(200).json(add_ons.find(add_on=> add_on.data.code === id ))
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
