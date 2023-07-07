import React from "react"
import { createRoot } from "react-dom/client"
import { ToastContainer } from "react-toastify"

import "./index.css"
import "react-toastify/dist/ReactToastify.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

const container = document.getElementById("root")
const root = createRoot(container as HTMLElement)

root.render(
  <React.StrictMode>
    <App />
    <ToastContainer autoClose={10000} theme={"light"} position={"bottom-left"} />
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
