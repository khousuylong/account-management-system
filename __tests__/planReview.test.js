import "@testing-library/jest-dom/extend-expect";
import {
  render, 
  screen,
  fireEvent,
  waitForElement,
  cleanup
} from '@testing-library/react'
import Plan from "../pages/[id]/plans/[planid]";
import {getStaticPaths, getStaticProps} from "../pages/[id]/plans/[planid]";
import AppContext from '../src/contexts/appContext';

import { getPage } from 'next-page-tester';

let isBack = false, accountUrl = "";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      isFallback: false,
      back: function(){
        isBack = true;
      },
      push: function(params){
        accountUrl = params
      }
    };
  },
}));

const responseJson = {
  "links": {
    "self": ""
  },
  "data": [
    {
      "id": "pppppppp-pppp-pppp-pppp-pppppppppppp",
      "name": "Agency - Monthly",
      "code": "agency",
      "interval_length": 1,
      "currencies": [
        {
          "currency": "USD",
          "unit_ammount": 399
        }
      ],
      "add_ons": [
        {
          "code": "111222333",
          "quantity": 0
        }
      ],
      "created_at": "2019-09-28 16:00:10",
      "updated_at": "2019-09-28 16:00:10"
    }
  ]
}

describe('Plan Review Page', () => {
  let component;
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponseOnce(JSON.stringify(responseJson));
  });
  beforeEach(async () => {
    const {props} = await getStaticProps({params:{ id: '223', planid: '234' }});
    component = render(<AppContext.Provider value={{planid: '234', accountid: '123'}}><Plan {...props} /></AppContext.Provider>);
  });
  it('It should render the page', () => {
    expect(component.getByText('Agency - Monthly')).toBeInTheDocument()
    expect(component.getByText('Due Today')).toBeInTheDocument();
    expect(component.getAllByText("$399 USD")[0]).toBeInTheDocument();
  });
  it('Back button should behave correctly', () => {
    const backButton = component.getByTestId('go-back');
    expect(backButton).toBeInTheDocument();
    expect(isBack).toBeFalsy()
    fireEvent.click(backButton)
    expect(isBack).toBeTruthy()
  });
  it('Close button shuld behave correctly', () => {
    const closeButton = component.getByTestId('close-button')
    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);    
    expect(accountUrl).toEqual('/123/account')
  })
  afterEach(() => {
    let isBack = false, accountUrl = "";
    cleanup();
  });
});
