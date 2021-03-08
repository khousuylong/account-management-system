import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';

const {BLOG_URL, CONTENT_API_KEY} = process.env 

async function getPosts(){
  const res = await fetch(`${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=title,slug,custom_excerpt`).then(res=>res.json());
  return res.posts;
}

export const getStaticProps = async({param}) => {
  const posts = await getPosts();
  return {
    props: {posts}
  }
}

export default function Home(props) {
  console.log('i got some props', props)

  const {posts} = props;
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2>Welcome to my testing block</h2>
        {
          posts.map( (post,index) => {
            return <li key={index}><Link href='/post/[slug]' as={`/post/${post.slug}`}><a>{post.title}</a></Link></li>
          })
        }
      </main>

    </div>
  )
}
