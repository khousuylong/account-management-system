import Head from 'next/head'
import {useState} from 'react';
import { useRouter } from 'next/router'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styles from '../styles/Home.module.css'
import utils from '../styles/Utils.module.css'

export default function Login(props) {
  const router = useRouter();
  const [username, setUsernam] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({username, password})
    }).then( res => res.json() )

    if(res.token)   
      router.push({
        pathname: '/plans',
        query: { token: res.token}
      })
    else alert('You are not logged in');
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Login to Account Management System</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form>
          <TextField id="user-name" onChange={evt => setUsernam(evt.target.value)} value={username} nam='username' label="Username" defaultValue="User name" />
          <br></br>
          <TextField
            onChange = {evt => setPassword(evt.target.value)}
            value={password}
            style={{marginTop: 20}}
            name='password'
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <br></br>
          <Button id="login-button" onClick={submitForm} style={{marginTop: 20}} variant="outlined" color="primary">
            Login
          </Button>
        </form>
      </main>
    </div>
  )
}
