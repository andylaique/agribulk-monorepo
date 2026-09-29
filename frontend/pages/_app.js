import '../styles/globals.css';
import Layout from '../components/Layout';
import ChatBot from '../components/ChatBot';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <ChatBot />
    </Layout>
  );
}
