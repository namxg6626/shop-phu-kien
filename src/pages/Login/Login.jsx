import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Form from "../../components/Form";
import { UserContext } from "../../UserContext";
import Logo from "../../assets/logo/logo.png";
import "./Login.scss";

export default function Login() {
  // config
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
      { feildName: "phone-number", type: "text", required: true },
      { feildName: "password", type: "password", required: true },
      // { feildName: "confirm-password", type: "password", required: true },
    ],
  };

  // initial hooks
  const [hasAnAccount, setHasAnAccount] = useState(() => true);
  const [feilds, setFeilds] = useState(() => loginFieldConfig);
  const [message, setMessage] = useState(() => "");
  const { setTokens } = useContext(UserContext);
  const history = useHistory();

  // initial effect
  useEffect(() => {
    if (hasAnAccount) setFeilds(loginFieldConfig);
    else setFeilds(registerFeildConfig);
  }, [hasAnAccount]);

  // inittial function
  const postRequest = (route, json) => {
    return new Promise((res, rej) => {
      fetch(`${_API}/${route}`, {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((result) => result.json())
        .then((json) => res(json))
        .catch((err) => rej(err));
    });
  };

  const login = async (userdata) => {
    try {
      const response = await postRequest("login", userdata);
      if (response.status === 404) setMessage("Không tồn tại email này");
      else if (response.status === 403) setMessage("Sai email hoặc mật khẩu");
      else {
        setTokens(response);
        history.push("/");
      }
    } catch (error) {
      setMessage("Không thể đăng nhập");
    }
  };

  const register = async (userdata) => {
    try {
      const response = await postRequest("register", userdata);
      console.log(response);

      if (response.status === 201) setMessage("Đăng ký thành công");
      if (response.status === 400)
        setMessage(
          "Đã tồn tại email này hoặc thông tin nhập vào không chính xác"
        );
    } catch (error) {
      setMessage("Không thể đăng kí");
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.form;
    const { email, password } = form;
    const json = {
      email: email.value,
      password: password.value,
    };

    if (hasAnAccount) login(json);
    else {
      json.phoneNumber = form["phone-number"].value;
      register(json);
    }
  };

  const toggleMode = () => {
    setHasAnAccount(!hasAnAccount);
    setMessage("");
    document.form.reset();
  };

  return (
    <main className="main">
      <div className="main__container">
        <section className="login">
          <Form
            feildConfig={feilds}
            handleSubmit={handleSubmit}
            title={hasAnAccount ? "Đăng nhập" : "Đăng ký"}
          />
          <button onClick={toggleMode}>
            {hasAnAccount ? "Chưa có tài khoản?" : "Đã có tài khoản"}
          </button>
          <div className="login__message">{message}</div>
        </section>
      </div>
    </main>
  );
}
