// import "react-circular-progressbar/dist/styles.css";
import "../styles/ProgressStyles.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
