import React from "react";
import { gapi } from "gapi-script";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { store, persistor } from "./Redux/ReduxStore";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import App from "./App";
import { ProSidebarProvider } from "react-pro-sidebar";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ProSidebarProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
      </Provider>
    </ProSidebarProvider>
  </React.StrictMode>
);
// this the solution for google authenctication client id issue
gapi.load("client:auth2", () => {
  gapi.client.init({
    clientId: "*****.apps.googleusercontent.com",
    plugin_name: "chat",
  });
});
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
