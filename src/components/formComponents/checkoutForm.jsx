import {useState} from 'react';
import utils from '../../../styles/Utils.module.css'
import Container from '@material-ui/core/Container';
import {LeftRightBox, LeftRightCenterBox, CenterBox} from '../wrappers/gridContainer';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import TotalPrice from './total_price';
import ThreeDSecure from './three_d_secure';
import RecurlyForm from './recurlyForm';

const companyInfoData = {"country": "","company":"","address1":"","suite_unit":"","city":"","state":"","postal_code":"","email":""}; 

export default function CheckoutForm(props) {
	const {planInfo, addonsInfo} = props;
	const [companyInfo, setCompanyInfo] = useState(companyInfoData);
	const [threeDSecureData, setThreeDSecureData] = useState(null);
	const [recurlyFormError, setRecurlyFormError] = useState(false);
	const [elementError, setElementError] = useState(null);
	const [payload, setPayload] = useState(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const createSubscription = () => {
		const payload = {
			data: {
				id: planInfo.id,
				add_ons: addonsInfo
			}
		}
		axios.post(`${props.restUrl}/v1/${props.accountId}/billing/subscriptions`, payload, {
			headers: {"Access-Control-Allow-Origin": "*", 'Authorization': props.jwt}
		})
		.then(response=>{
			router.push('/checkout/success')
		}, error=>{
			const {data} = error.response;
			if(data['transaction_error'] && data['transaction_error']['category']) {
				setRecurlyFormError(data['transaction_error']['category']);
			}
		});
	}

	const createBilling = (payload, token) => {
		setLoading(true);
		axios.put(`${props.restUrl}/v1/${props.accountId}/billing?token_id=${token}`, payload, {
			headers: {
				'Authorization': props.jwt 
			}
		})
		.then((response) => {
			setThreeDSecureData(null)
			createSubscription();
		}, (error, response) => {
			if(error.response.status === 401 ) router.push('/403')
			setLoading(false);
			const {data} = error.response;
			if(data['transaction_error']){
				if(data['transaction_error']['category'] !== '3d_secure_action_required') {
					const errorObj = {
						details: [
							{field: 'number', messages: [data['transaction_error']['category']]}
						]	
					}
					setRecurlyFormError(data['transaction_error']['category']);
					setElementError(errorObj);
				}else{
					setThreeDSecureData(data)
				}
			}
		});
	}

	const handle3DError = error => {
		setRecurlyFormError(error.message);
		setThreeDSecureData(null)
	} 

	const handleSuccess3DSecure = token => {
		createBilling(payload, token);
	}

	const handleSubmit = data => {
		setPayload(data);
		createBilling(data, data.token.id);
	};

  const billingCycle = planInfo.interval_length===1 ? 'per month' : ('every ' + planInfo.interval_length + ' months' )
	const TotalElement = () => <TotalPrice {...props} planInfo={planInfo} addonsInfo={addonsInfo} companyInfo={payload} />
  return (
    <div>
			<Box bgcolor="success.main" color="background.paper" p={2}>
				<Container className={utils.noPadding} maxWidth={false}>
					<Container maxWidth="sm">
						<Typography id="plan-name" variant="h5" gutterBottom>
							<span>Subscribe to {planInfo.name}</span>
						</Typography>
						<div>
							{
								addonsInfo.map( (addon, i )=><Typography key={i} className="add-ons" variant="subtitle1" gutterBottom> + {addon.quantity} * {addon.name}</Typography>)
							}
						</div>
						<span id="total-price">
							<TotalElement /> {billingCycle}
						</span>
					</Container>
				</Container>
			</Box>
			<RecurlyForm 
				{...props} 
				loading={loading} 
				elementError={elementError} 
				recurlyFormError={recurlyFormError} 
				companyInfo={companyInfo} 
				onDataChange={data=>setPayload(data)}
				onSubmit={handleSubmit} 
				submitEle={<span>Submit <TotalElement /></span>} 
			/>
			<ThreeDSecure TEST_MODE={props.TEST_MODE} onSuccess={handleSuccess3DSecure} onError={handle3DError} data={threeDSecureData} />
		</div>
  )
};
