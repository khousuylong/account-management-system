import Head from 'next/head'
import styles from '../styles/Home.module.css'
import utils from '../styles/Utils.module.css'

export default function PermisionDenied(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>403</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main id='error-message' className={styles.main}>
        You do not have permission to perform this action
      </main>
    </div>
  )
}
