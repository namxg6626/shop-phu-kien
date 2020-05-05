import React, { useState, useEffect } from "react";
import Form from "../../components/Form";
import "./Login.scss";
import axios from "axios";

export default function Login() {
  const _API = "http://localhost:8000";

  const loginFieldConfig = {
    method: "POST",
    action: `${_API}/login`,
    feildSet: [
      { feildName: "email", type: "email", required: true },
      { feildName: "password", type: "password", required: true },
    ],
  };

  const registerFeildConfig = {
    method: "POST",
    action: `${_API}/register`,
    feildSet: [
      { feildName: "email", type: "email", required: true },
      { feildName: "password", type: "password", required: true },
      { feildName: "confirm-password", type: "password", required: true },
    ],
  };

  const [hasAnAccount, setHasAnAccount] = useState(true);
  const [feilds, setFeilds] = useState(loginFieldConfig);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (hasAnAccount) setFeilds(loginFieldConfig);
    else setFeilds(registerFeildConfig);
  }, [hasAnAccount]);

  const toggleMode = () => {
    setHasAnAccount(!hasAnAccount);
  };

  const post = (route, json) => {
    axios({
      url: `${_API}/${route}`,
      method: "POST",
      data: json,
      withCredentials: true,
      headers: { crossDomain: true, "Content-Type": "application/json" },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.form;
    const { email, password } = form;
    const json = {
      email: email.value,
      password: password.value,
    };

    if (hasAnAccount) post("login", json);
    else {
      if (password.value !== form["confirm-password"].value) {
        setMessage("Xác nhận mật khẩu không khớp");
        return;
      }

      post("register", {
        ...json,
        "confirm-password": form["confirm-password"].value,
      });
    }
  };

  return (
    <main className="main">
      <div className="main__container">
        <section className="login">
          <Form feildConfig={feilds} handleSubmit={handleSubmit} />
          <button onClick={toggleMode}>
            {hasAnAccount ? "Chưa có tài khoản?" : "Đã có tài khoản"}
          </button>
          <div className="login__message">{message}</div>
        </section>
      </div>
    </main>
  );
}
