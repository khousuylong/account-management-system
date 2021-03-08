import Head from 'next/head'
import {useContext, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import styles from '../styles/Home.module.css'
import utils from '../styles/Utils.module.css'
import Spinner from '../src/components/spinner';
import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/router';
import Link from 'next/link';

const plans = [
	{
		"account_id": "234",
		"plan_id": 'pppp-pppp-ppppp'
	},
	{
		"account_id": "234",
		"plan_id": 'bbbbb-bbbbb-bbbbbb',
	},
	{
		"account_id": "234",
		"plan_id": 'eeeeeeeee-eeeeeeeee-eeeeeeee-eeeeeee',
		"add_ons": [
			{
				add_on_code: '1333000',
				quantity: 5 
			},
			{
				add_on_code: '1222000',
				quantity: 2 
			}
		]
	},
	{
		"account_id": "234",
		"plan_id": 'aaaaa-aaaaa-aaaaaa',
		"add_ons": [
			{
				add_on_code: '1222100',
				quantity: 8 
			},
			{
				add_on_code: '1333100',
				quantity: 12 
			}
		]
	},
  {
		"account_id": "234",
		"plan_id": 'pppp-pppp-ppppp-a'
	},
  {
		"account_id": "234",
		"plan_id": 'bbbbb-bbbbb-bbbbbb-2y',
	},
  {
		"account_id": "234",
		"plan_id": 'eeee-eeee-eeee-3y',
		"add_ons": [
			{
				add_on_code: '1333003',
				quantity: 5 
			},
			{
				add_on_code: '1222003',
				quantity: 2 
			}
		]
	}
] 

export default function Plans(props) {
	const router = useRouter();
	const handleCheckout = async id => {
    const plan = plans.find(plan=>plan.plan_id===id);
    const res = await fetch(`/checkout?subscription=${btoa(JSON.stringify({...plan, token: router.query.token}))}`, {
      method: 'GET',
      redirect: 'follow',
      headers: new Headers({
        'Authorization': router.query.token ? `Bearer ${router.query.token}` : '' 
      })
    });
    router.push(res.url)
	}

  const handleUpdate = async () => {
    const res = await fetch(`/billing/update?subscription=${btoa(JSON.stringify({"account_id": "234"}))}`, {
      method: 'GET',
      redirect: 'follow',
      headers: new Headers({
        'Authorization': router.query.token ? `Bearer ${router.query.token}` : '' 
      })
    });
    router.push(res.url);
  }

  const handleNoAuthorization = () => {
    const plan = plans.find(plan=>plan.plan_id==='pppp-pppp-ppppp');
    router.push(`http://localhost:3000/checkout?subscription=${btoa(JSON.stringify({...plan, token: router.query.token}))}`);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
				<Grid container direction="row" spacing={2}>
					<Grid item>
						<Button onClick={()=>handleCheckout('pppp-pppp-ppppp')} id='pro-button' variant="contained" color="primary">
							Professional
						</Button>
					</Grid>
					<Grid item>
						<Button onClick={()=>handleCheckout('bbbbb-bbbbb-bbbbbb')} id="biz-button" variant="contained" color="primary">
							Business
						</Button>
					</Grid>
					<Grid item>
						<Button onClick={()=>handleCheckout('eeeeeeeee-eeeeeeeee-eeeeeeee-eeeeeee')} id="ent-button" variant="contained" color="primary">
							Enterprise
						</Button>
					</Grid>
					<Grid item>
						<Button onClick={()=>handleCheckout('aaaaa-aaaaa-aaaaaa')} variant="contained" color="primary">
							Agency
						</Button>
					</Grid>
				</Grid>
        <Grid style={{marginTop: 40}} container direction="row" spacing={2}>
          <Grid item>
            <Button onClick={()=>handleCheckout('pppp-pppp-ppppp-a')} id='checkout-button' variant="contained" color="primary">
              Pro-annual
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={()=>handleCheckout('bbbbb-bbbbb-bbbbbb-2y')} id='checkout-button' variant="contained" color="primary">
              Biz-2 years
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={()=>handleCheckout('eeee-eeee-eeee-3y')} id='checkout-button' variant="contained" color="primary">
              Ent-3 years
            </Button>
          </Grid>
        </Grid>

        <Grid style={{marginTop: 40}} container direction="row" spacing={2}>
          <Grid item>
            <Button onClick={handleNoAuthorization} id='update-billing-button' variant="contained">
              No authorization header
            </Button>
          </Grid>
        </Grid>

        <Grid style={{marginTop: 40}} container direction="row" spacing={2}>
          <Grid item>
            <Button onClick={handleUpdate} id='update-billing-button' variant="contained" color="secondary">
              Update Billing 
            </Button>
          </Grid>
        </Grid>
      </main>
    </div>
  )
}
