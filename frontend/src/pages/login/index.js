import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import "./style.css";
import LoginInput from "../components/home/inputs/logininputs";

export default function Login() {
  const [login, setLogin] = useState(logininfo);
  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_wrap">
          <div className="login_1">
            <img src="" alt="Blogram Image" />
            <span>
              Blogram helps you connect and share with the people in your life.
            </span>
          </div>
          <div className="login_2">
            <div className="login_2_wrap">
              <Formik initialValues={{ email: "", password: "" }}>
                {(formik) => (
                  <Form>
                    <LoginInput
                      type="text"
                      name="email"
                      placeholder="Email Address or Phone Number"
                    />
                    <LoginInput
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                    <button type="Submit" name="email" className="black_btn">
                      Login
                    </button>
                  </Form>
                )}
              </Formik>
              <Link to="/forget" className="forgot_password">
                Forgotton Password
              </Link>
              <div className="sign_splitter"></div>
              <button className="black_btn open_signup">Create Account</button>
            </div>
            <Link to="/" className="sign_extra">
              <b>Create a Page </b>
              for a celebrity, brand and buisness
            </Link>
          </div>
        </div>
        <div className="register"></div>
      </div>
    </div>
  );
}
