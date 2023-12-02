import { Form, Formik } from "formik";
import { useState } from "react";
import LoginInput from "../../components/inputs/logininputs";
import { Link } from "react-router-dom";
export default function ChangePassword({
  password,
  conf_password,
  setConf_Password,
  setPassword,
  error,
}) {
  return (
    <div className="reset_form" style={{ height: "290px" }}>
      <div className="reset_form_header">Change Password</div>
      <div className="reset_form_text">Enter the strong Password</div>
      <Formik
        enableReinitialize
        initialValues={{
          password,
          conf_password,
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
            />
            <LoginInput
              type="text"
              name="conf_password"
              onChange={(e) => setConf_Password(e.target.value)}
              placeholder="Confirm Password"
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="black_btn">
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
