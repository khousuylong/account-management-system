const plans = [
  {
    "links": {
      "self": ""
    },
    "data": {
      "id": "eeeeeeeee-eeeeeeeee-eeeeeeee-eeeeeee",
      "name": "Enterprise - Monthly",
      "code": "enterprise",
      "interval_length": 1,
      "currencies": [
        {
          "currency": "USD",
          "unit_ammount": 299 
        }
      ],
      "created_at": "2019-09-28 16:00:10",
      "updated_at": "2019-09-28 16:00:10"
    }
  },
  {
    "links": {
      "self": ""
    },
    "data": {
      "id": "aaaaa-aaaaa-aaaaaa",
      "name": "Agency - Monthly",
      "code": "agency",
      "interval_length": 1,
      "currencies": [
        {
          "currency": "USD",
          "unit_ammount": 499 
        }
      ],
      "created_at": "2019-09-28 16:00:10",
      "updated_at": "2019-09-28 16:00:10"
    }
  },
  {
    "links": {
      "self": ""
    },
    "data": {
      "id": "bbbbb-bbbbb-bbbbbb",
      "name": "Business - Monthly",
      "code": "business",
      "interval_length": 1,
      "currencies": [
        {
          "currency": "USD",
          "unit_ammount": 199 
        }
      ],
      "created_at": "2019-09-28 16:00:10",
      "updated_at": "2019-09-28 16:00:10"
    }
  },
  {
    "links": {
      "self": ""
    },
    "data": {
      "id": "pppp-pppp-ppppp",
      "name": "Professional - Monthly",
      "code": "professional",
      "interval_length": 1,
      "currencies": [
        {
          "currency": "USD",
          "unit_ammount": 49 
        }
      ],
      "created_at": "2019-09-28 16:00:10",
      "updated_at": "2019-09-28 16:00:10"
    }
  },
  {
    "links": {
      "self": ""
    },
    "data": {
      "id": "pppp-pppp-ppppp-a",
      "name": "Professional - Annual",
      "code": "professional_one_year",
      "interval_length": 12,
      "currencies": [
        {
          "currency": "USD",
          "unit_ammount": 470 
        }
      ],
      "created_at": "2019-09-28 16:00:10",
      "updated_at": "2019-09-28 16:00:10"
    }
  },
  {
    "links": {
      "self": ""
    },
    "data": {
      "id": "bbbbb-bbbbb-bbbbbb-2y",
      "name": "Business - 2 Years",
      "code": "business_two_years",
      "interval_length": 24,
      "currencies": [
        {
          "currency": "USD",
          "unit_ammount": 1663
        }
      ],
      "created_at": "2019-09-28 16:00:10",
      "updated_at": "2019-09-28 16:00:10"
    }
  },
  {
    "links": {
      "self": ""
    },
    "data": {
      "id": "eeee-eeee-eeee-3y",
      "name": "Enterprise - 3 Years",
      "code": "enterprise_three_years",
      "interval_length": 36,
      "currencies": [
        {
          "currency": "USD",
          "unit_ammount": 5014 
        }
      ],
      "created_at": "2019-09-28 16:00:10",
      "updated_at": "2019-09-28 16:00:10"
    }
  },
]; 

export default function PlanHandler(req, res) {
  const {
    query: { plan_id },
    method,
  } = req

  switch (method) {
    case 'GET':
      // Get data from your database
      res.status(200).json(plans.find(plan=> plan.data.id === plan_id ))
      break
    case 'POST':
      res.status(200).json(req.body)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
