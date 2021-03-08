import {useEffect, useState} from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import utils from '../styles/Utils.module.css'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Spinner from '../src/components/spinner';
import HeaderBar from '../src/components/headerBar'
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';
import CheckoutForm from '../src/components/formComponents/checkoutForm';
import Cookies from 'cookies'
import Alert from '@material-ui/lab/Alert';
import {
  RecurlyProvider,
  Elements
} from '@recurly/react-recurly';

const {RECURLY_PUBLIC_KEY, BILLING_SERVICE_ENDPOINT, CHECKOUT_QUIT_REDIRECT_URL} = process.env
const TEST_MODE = process.env.TEST_MODE ? true : false;

export const getServerSideProps = async({res, req, params}) => {

	let jwt = "";
	if(req.headers.authorization){
		const obj = { referer: req.headers.referer, token: req.headers.authorization}
		res.setHeader('Set-Cookie', `jwt-store=${JSON.stringify(obj)}`);
		jwt = req.headers.authorization
	}else{
		const cookies = new Cookies(req, res);
		if(cookies.get('jwt-store')){
			const jwtStore = JSON.parse(cookies.get('jwt-store'));

			//Will be mainly for development
			if(jwtStore.referer === req.headers.referer) jwt = jwtStore.token
			//Will happen when user press refresh button
			if(!req.headers.referer && jwtStore.token) jwt = jwtStore.token
		}
	}

  return {
		props: {...params, jwt, recurly_public_key: RECURLY_PUBLIC_KEY, restUrl: BILLING_SERVICE_ENDPOINT, TEST_MODE, quitUrl: CHECKOUT_QUIT_REDIRECT_URL }
  }
}


export default function Checkout(props) {

	const {recurly_public_key} = props;
	const [paymentInfo, setPaymentInfo] = useState(null);
	const [accountId, setAccountId] = useState(null);
  const [planInfo, setPlanInfo] = useState(null);
	const [addonsInfo, setAddonsInfo] = useState([]);

  const router = useRouter();
	
	useEffect(async () => {
		if(!props.jwt ){
			router.push('/403')
		}
		if(window){
			if(router.query.subscription){
				const queryParam = router.query.subscription;
				const query = JSON.parse(atob(queryParam))
				const res = await fetch(`${props.restUrl}/v1/plans/${query.plan_id}`).then(res=>res.json());

				const addons = []
				if(query.add_ons){
					for(let i=0;i<query.add_ons.length;i++){
						const res = await fetch(`${props.restUrl}/v1/plans/${query.plan_id}/add_ons/${query.add_ons[i].add_on_code}`).then(res=>res.json());
						addons.push({...res.data, ...query.add_ons[i]})
					}
					setAddonsInfo(addons)
				}
				setAccountId(query.account_id);
				setPlanInfo(res.data)
			}
		} 
  }, [props])


  if(router.isFallback){
    return <Spinner /> 
  }
	
	if(!planInfo) return <Spinner />

	if(props.jwt){
		return (
			<div>
				<Head>
					<title>Checkout</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<Container className={utils.noPadding} maxWidth={false}>
					<Container maxWidth="sm">
						<HeaderBar {...props} title={
								<Typography className={`page-title ${utils.noMargin} ${utils.paddingMedium}`} variant="h6" gutterBottom>
									Checkout  	
								</Typography>
							}
						/>
					</Container>
				</Container>
				<div>
					<RecurlyProvider publicKey={recurly_public_key}>
						<Elements>
							<CheckoutForm {...props} accountId={accountId} planInfo={planInfo} addonsInfo={addonsInfo} />
						</Elements>
					</RecurlyProvider>
				</div>
			</div>
		)
	}
	return null
}
