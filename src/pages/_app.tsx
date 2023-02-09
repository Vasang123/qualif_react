import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import  FavoriteProvider  from '@/components/FavoriteContext';
export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
    <FavoriteProvider>
      <Component {...pageProps} />
    </FavoriteProvider>
  </>
  
  );
}
