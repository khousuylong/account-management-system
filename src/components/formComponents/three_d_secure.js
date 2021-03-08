import {
  useRecurly
} from '@recurly/react-recurly';

import {
  mockRecurly
} from '../../mocks/recurly';

export default function ThreeDSecure(props) {
  const container = document.querySelector('#three-d-secure-container');

  if(!props.data){
    container.style.display = 'none';
    return null;
  } 

  const recurly = props.TEST_MODE ? mockRecurly() : useRecurly();
  const risk = recurly.Risk();
  const threeDSecure = risk.ThreeDSecure({ actionTokenId: props.data.transaction_error.three_d_secure_action_token_id });
  threeDSecure.on('error', err => {
    container.style.display = 'none';
    props.onError(err)
  });

  threeDSecure.on('token', token => {
    props.onSuccess(token.id);
  })

  threeDSecure.attach(container);
  container.style.display = 'block';

  return <div></div>
}
