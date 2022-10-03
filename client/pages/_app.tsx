import { Provider } from "react-redux";
import "../styles/globals.scss";
import { store } from "../store/store";
import type { AppProps } from "next/app";
import { ModalList, Modals } from "../components/UI/Modals";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Modals modal={ModalList.NewQuote} />

      <Modals modal={ModalList.NewReply} />
    </Provider>
  );
}

export default MyApp;
