const recurlyPlans = {
  professional: {"now":{"subtotal":"49.00","plan":"49.00","addons":"0.00","setup_fee":"0.00","discount":"0.00","tax":"0.00","total":"49.00"},"next":{"subtotal":"49.00","plan":"49.00","addons":"0.00","setup_fee":"0.00","discount":"0.00","tax":"0.00","total":"49.00"},"base":{"plan":{"unit":"49.00","setup_fee":"0.00"},"addons":{}},"addons":{},"currency":{"code":"USD","symbol":"$"},"taxes":[]}, 

  business: {"now":{"subtotal":"99.00","plan":"99.00","addons":"0.00","setup_fee":"0.00","discount":"0.00","tax":"0.00","total":"99.00"},"next":{"subtotal":"99.00","plan":"99.00","addons":"0.00","setup_fee":"0.00","discount":"0.00","tax":"0.00","total":"99.00"},"base":{"plan":{"unit":"99.00","setup_fee":"0.00"},"addons":{}},"addons":{},"currency":{"code":"USD","symbol":"$"},"taxes":[]}, 

  enterprise: {"now":{"subtotal":"396.00","plan":"199.00","addons":"197.00","setup_fee":"0.00","discount":"0.00","tax":"0.00","total":"396.00"},"next":{"subtotal":"396.00","plan":"199.00","addons":"197.00","setup_fee":"0.00","discount":"0.00","tax":"0.00","total":"396.00"},"base":{"plan":{"unit":"199.00","setup_fee":"0.00"},"addons":{"144400":"1.00","155500":"2.50","1222000":"49.00","1333000":"19.80"}},"addons":{"144400":"1.00","155500":"2.50","1222000":"49.00","1333000":"19.80"},"currency":{"code":"USD","symbol":"$"},"taxes":[]}, 

  agency: {"now":{"subtotal":"1028.60","plan":"399.00","addons":"629.60","setup_fee":"0.00","discount":"0.00","tax":"0.00","total":"1028.60"},"next":{"subtotal":"1028.60","plan":"399.00","addons":"629.60","setup_fee":"0.00","discount":"0.00","tax":"0.00","total":"1028.60"},"base":{"plan":{"unit":"399.00","setup_fee":"0.00"},"addons":{"1222100":"49.00","1333100":"19.80"}},"addons":{"1222100":"49.00","1333100":"19.80"},"currency":{"code":"USD","symbol":"$"},"taxes":[]},
  professional_one_year: {"now":{"subtotal":"470.00","plan":"470.00","addons":"0.00","setup_fee":"0.00","discount":"0.00","tax":"0.00","total":"470.00"},"next":{"subtotal":"470.00","plan":"470.00","addons":"0.00","setup_fee":"0.00","discount":"0.00","tax":"0.00","total":"470.00"},"base":{"plan":{"unit":"470.00","setup_fee":"0.00"},"addons":{}},"addons":{},"currency":{"code":"USD","symbol":"$"},"taxes":[]},
  business_two_years: {"now":{"subtotal":"1663.00","plan":"1663.00","addons":"0.00","setup_fee":"0.00","discount":"0.00","tax":"0.00","total":"1663.00"},"next":{"subtotal":"1663.00","plan":"1663.00","addons":"0.00","setup_fee":"0.00","discount":"0.00","tax":"0.00","total":"1663.00"},"base":{"plan":{"unit":"1663.00","setup_fee":"0.00"},"addons":{}},"addons":{},"currency":{"code":"USD","symbol":"$"},"taxes":[]},
  enterprise_three_years: {"now":{"subtotal":"9979.00","plan":"5014.00","addons":"4965.00","setup_fee":"0.00","discount":"0.00","tax":"0.00","total":"9979.00"},"next":{"subtotal":"9979.00","plan":"5014.00","addons":"4965.00","setup_fee":"0.00","discount":"0.00","tax":"0.00","total":"9979.00"},"base":{"plan":{"unit":"5014.00","setup_fee":"0.00"},"addons":{"1222003":"1235.00","1333003":"499.00"}},"addons":{"1222003":"1235.00","1333003":"499.00"},"currency":{"code":"USD","symbol":"$"},"taxes":[]}
}


export function mockRecurly(){
  return {
    Pricing: () => {
      let country = '';
      const chained = {
        plan: ( code, quantity ) => {
          chained['plan_code'] = code;
          return chained;
        },
        currency: currency => chained,
        address: address => {
          country = address.country
          return chained;
        },
        tax: tax => chained,
        addon: (code, quantity) => chained,
        done: (callback => {
          const price = {...recurlyPlans[chained['plan_code']]};
          if(country === 'GB') price['taxes'] = [{type: "gb", region: "GB", rate: "0.2"}];
          callback(price)
          return chained;
        }) 
      }
      return chained;
    },
    Risk: () => {
      return{
        ThreeDSecure: params => {
          console.log('given params', params) 
          const listeners = []
          return {
            on: (action, callback) => {
              listeners.push({action, callback});
            },
            attach: dom => {
              dom.innerHTML = ''
              const container = document.createElement('div');
              container.style.top = '50%';
              container.style.left = '50%';
              container.style.transform = 'translate(-50%, -50%)';
              container.style.position = 'absolute';

              const button1 = document.createElement("button");
              button1.className = "challenge-pass";
              button1.innerText = "Challenge Pass";
              container.appendChild(button1);
              button1.addEventListener('click', function(){
                listeners.find(evt => evt.action === 'token').callback({id: 'three_d_secure_action_result_token_id'})
              })

              const button2 = document.createElement("button");
              button2.className = "challenge-failed";
              button2.innerText = "Challenge failed";
              container.appendChild(button2);
              button2.addEventListener('click', function(){
                listeners.find(evt => evt.action === 'error').callback({message: '3DS failed, try again'})
              })
              dom.appendChild(container);
            }
          }
        }
      }
    }
  }
}
