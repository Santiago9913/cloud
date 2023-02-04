import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import LogIn from "./views/auth/login";
import SignUp from "./views/auth/signup";
import Home from "./views/dashboard/home";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     children: [
//       {
//         path: "React",
//         element: <App />,
//       },
//       {
//         path: "login",
//         element: <LogIn />,
//       },
//       {
//         path: "signup",
//         element: <SignUp />,
//       },
//     ],
//   },
// ]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<LogIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
