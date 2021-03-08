import "@testing-library/jest-dom/extend-expect";
import {
  render, 
  screen,
  fireEvent,
  waitForElement,
  cleanup
} from '@testing-library/react'
import Account from "../pages/[id]/account";
import AppContext from '../src/contexts/appContext';

jest.mock("next/link", () => {
  return ({children}) => {
    return children;
  }
});


describe('Checkout Button', () => {
  const spies = {};
  let component;
  beforeAll( () => {
  })
  beforeEach(() => {
    component = render(<AppContext.Provider value={{planid: '234'}}><Account /></AppContext.Provider>);
  });
  it('Checkout button exists in the page', () => {
    expect(component.getByText("Checkout")).toBeInTheDocument();
  })
  it('click the button', () => {
    const checkout = component.getByText("Checkout") 
    expect(checkout).toBeInTheDocument();
    fireEvent.click(component.getByText('Checkout'));
  })
  afterEach(() => {
    cleanup();
  });
});
