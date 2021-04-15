import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

export default function App() {
    return <h1>Hello React Router123</h1>;
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);