import { Form, Formik } from "formik";
import { useState } from "react";
import LoginInput from "../../components/inputs/logininputs";
import { Link } from "react-router-dom";
export default function CodeVerification({ code, setCode, error }) {
  return (
    <div className="reset_form">
      <div className="reset_form_header">Code Verification</div>
      <div className="reset_form_text">
        Please enter code that has been sent to your email!!!
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          code,
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="code"
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter the Code"
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
