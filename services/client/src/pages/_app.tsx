import {AppProps} from 'next/app';
import Head from 'next/head';
import {ThemeProvider} from 'next-themes';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'app.global.css';
import {Header, Footer} from 'containers';

const themes = ['system', 'light', 'dark', 'mystique', 'stitch', 'prime', 'red'];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24,
      retry: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchInterval: false
    },
  }
});

function MyApp({Component, pageProps}: AppProps) {

  return (
    <div className='w-full h-full flex flex-col'>
      <Head>
        <title>Kitapbar</title>
        <meta charSet='UTF-8'/>
        <meta name='description' content='Kitapbar aradığınız kitabı sizin yerinize yandex linklerinden arayıp size sunmak amacıyla tasarlanmış bir uygulamadır. Keyfini çıkarın..'/>
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png'/>
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png'/>
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png'/>
        <link rel='manifest' href='/site.webmanifest'/>
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5'/>
        <meta name='msapplication-TileColor' content='#da532c'/>
        <meta name='theme-color' content='#ffffff'/>

        <meta property='og:title' content='Kitapbar'/>
        <meta property='og:site_name' content='Kitapbar'/>
        <meta property='og:type' content='website'/>
        <meta property='og:url' content='https://kitapbar.com/'/>
        <meta property='og:description' content='Kitapbar aradığınız kitabı sizin yerinize yandex linklerinden arayıp size sunmak amacıyla tasarlanmış bir uygulamadır. Keyfini çıkarın..'/>
        <meta property='og:locale' content='tr_TR'/>
        <meta property='og:image' content='https://kitapbar.com/icon.png'/>
        <meta property='og:image:type' content='image/png'/>
        <meta property='og:image:width' content='512'/>
        <meta property='og:image:height' content='512'/>
      </Head>
      <ThemeProvider storageKey='theme' themes={themes} defaultTheme='stitch' nonce='URKmaGCPpzopBJCAmwrn+w=='>
        <QueryClientProvider client={queryClient}>
          <Header/>
          <Component {...pageProps} />
          <ToastContainer
            position='bottom-left'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            draggablePercent={30}
            pauseOnHover={false}
            toastClassName='bg-bgs text-secondary text-sm'
          />
          <Footer/>
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  )
}

export default MyApp;
