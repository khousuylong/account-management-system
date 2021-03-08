import { useState } from 'react'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import {useRouter} from 'next/router'

const BLOG_URL = "https://mango-ghostcms.herokuapp.com";
const CONTENT_API_KEY = "e0eb9911bf25eb7df5d873f2a9";

async function getPost(slug){
  const res = await fetch(`${BLOG_URL}/ghost/api/v3/content/posts/slug/${slug}?key=${CONTENT_API_KEY}&fields=title,slug,html`)
	.then(res=>res.json());
  return res.posts[0];
}

export const getStaticProps = async ({params}) =>{
	const post = await getPost(params.slug)
	return {
		props: post,
		revalidate: 10
	} 
};

export const getStaticPaths = async () => {
	return {
		paths: [],
		fallback: true
	}
}


export default function post(props) {
	const router = useRouter()
	const [enableLoadComments, setEnableLoadComments] = useState(true)


	if(router.isFallback) return <h2>Loading...</h2>

	function loadComments() {
		setEnableLoadComments(false)
			window.disqus_config = function () {
			this.page.url = window.location.href
			this.page.identifier = post.slug
		}

		const script = document.createElement('script')
    script.src = 'https://https-ghost-cms-on-nextjs-qh20p39cx-vercel-app.disqus.com/embed.js';

		script.setAttribute('data-timestamp', Date.now().toString())

		document.body.appendChild(script)
	}

  return (
		<div className={styles.container}>
			<Link href="/"><a>Go back</a></Link>
			<h2>{props.title}</h2>
			<div dangerouslySetInnerHTML={{__html:props.html}}></div>
			{enableLoadComments && (
				<p className={styles.goback} onClick={loadComments}>
					Load Comments
				</p>
			)}
			<div id="disqus_thread"></div>
		</div>
  )
}

