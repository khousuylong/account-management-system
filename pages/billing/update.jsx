import {useEffect, useState} from 'react';
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import utils from '../../styles/Utils.module.css'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Spinner from '../../src/components/spinner';
import HeaderBar from '../../src/components/headerBar'
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';
import UpdateBillingForm from '../../src/components/formComponents/updateBillingForm';
import Cookies from 'cookies'
import Alert from '@material-ui/lab/Alert';
import {
  RecurlyProvider,
  Elements
} from '@recurly/react-recurly';

const {RECURLY_PUBLIC_KEY, BILLING_SERVICE_ENDPOINT, UPDATE_CARD_SUCCESS_REDIRECT_URL, UPDATE_CARD_QUIT_REDIRECT_URL} = process.env
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
			jwt = jwtStore.token
		}
	}

  return {
		props: {...params, jwt, recurly_public_key: RECURLY_PUBLIC_KEY, restUrl: BILLING_SERVICE_ENDPOINT, TEST_MODE, updateSuccessUrl: UPDATE_CARD_SUCCESS_REDIRECT_URL, quitUrl: UPDATE_CARD_QUIT_REDIRECT_URL }
  }
}


export default function Update(props) {
	const {recurly_public_key} = props;
	const [paymentInfo, setPaymentInfo] = useState(null);
	const [accountId, setAccountId] = useState(null);
  const [planInfo, setPlanInfo] = useState(null);
	const [addonsInfo, setAddonsInfo] = useState([]);
	const [ready, setReady] = useState(false);

  const router = useRouter();
	
	useEffect(async () => {
		if(!props.jwt ){
			router.push('/403')
		}
		if(window){
			setReady(true);
		} 
  }, [props])


  if(router.isFallback){
    return <Spinner /> 
  }

	if(props.jwt && ready){
		return (
			<div>
				<Head>
					<title>Update</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<Container className={utils.noPadding} maxWidth={false}>
					<Container maxWidth="sm">
						<HeaderBar {...props} title={
								<Typography className={`page-title ${utils.noMargin} ${utils.paddingMedium}`} variant="h6" gutterBottom>
									Update billing
								</Typography>
							}
						/>
					</Container>
				</Container>
				<div>
					<RecurlyProvider publicKey={recurly_public_key}>
						<Elements>
							<UpdateBillingForm {...props} accountId={accountId}/>
						</Elements>
					</RecurlyProvider>
				</div>
			</div>
		)
	}
	return null
}
