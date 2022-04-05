import '../styles/globals.css'
import type { AppProps } from 'next/app'

import {ReactElement} from "react";

function SafeHydrate({ children }: any): ReactElement {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  return (<SafeHydrate><Component {...pageProps} /></SafeHydrate>)
}

export default MyApp
