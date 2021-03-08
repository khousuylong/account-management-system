import {useState, useEffect} from 'react';
import {
  useRecurly
} from '@recurly/react-recurly';

import {
  mockRecurly
} from '../../mocks/recurly';

export default function TotalPrice(props) {
  const {planInfo, addonsInfo, companyInfo} = props;
	const [price, setPrice] = useState(null);

  const recurly = props.TEST_MODE ? mockRecurly() : useRecurly();

  const country = companyInfo ? companyInfo.country : ''; 
  const currency = country === "GB" ? "GBP" : "USD"; 

  useEffect(() => {
    const chained = recurly.Pricing()
    .plan( planInfo.code, { quantity: 1 })
    .currency(currency)
    .address({
      country: country 
    })
    .tax({
      tax_code: 'digital',
      vat_number: companyInfo ? companyInfo.vat_number : ''
    })

    if(addonsInfo.length > 0){
      chained
      .addon( addonsInfo[0].code, { quantity: addonsInfo[0].quantity})
      .addon( addonsInfo[1].code, { quantity: addonsInfo[1].quantity})
      .done(function (price) {
        setPrice(price)
      });
    }else {
      chained
      .done(function (price) {
        setPrice(price)
      });
    }
    
  }, [props]);

  if(price){
    const taxes = price.taxes.length > 0 ? ` + VAT ${parseFloat(price.taxes[0].rate) * 100}%` : '';
    return (
      <span>{`${price.currency.symbol}${price.now.total}${taxes}`}</span>
    )
  }
    
  return null
}
