import Layout from '../comp/Layout'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout {...Component}>

      <Component {...pageProps} />

    </Layout>
  )
}