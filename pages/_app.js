import "../global.css";
import {DefaultLayout} from "../components/Layout";

function MyApp({
  Component,
  pageProps: { session: authSession, ...pageProps },
}) {
  const Layout = Component.getLayout ?? DefaultLayout;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
