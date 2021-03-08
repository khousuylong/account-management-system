import Head from 'next/head'
import Button from '@material-ui/core/Button';
import styles from '../../styles/Home.module.css'
import utils from '../../styles/Utils.module.css'
import Typography from '@material-ui/core/Typography';
import Link from 'next/link'

const {CHECKOUT_SUCCESS_REDIRECT_URL} = process.env

export const getStaticProps = ({params}) => {
  return {
    props: {...params, redirectUrl: CHECKOUT_SUCCESS_REDIRECT_URL}
  }
}

export default function Success(props) {
  return (
    <div>
      <Head>
        <title>Success</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <Link href={props.redirectUrl}>
          <Button id='return-to-account' variant="outlined" color="secondary">
            Return to account
          </Button>
        </Link>
        <Typography className={utils.paddingTopMedium} variant="h5" gutterBottom>
          <span>Thanks for your purchase!</span>
        </Typography>
        <span>We just sent your receipt to your email address, and your account is all set and ready to go.</span>
      </div>
    </div>
  )
}
