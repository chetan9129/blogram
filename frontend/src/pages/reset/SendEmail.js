import { Link } from "react-router-dom";

export default function SendEmail({ user }) {
  return (
    <div className="reset_form dynamic_height">
      <div className="reset_form_header">Reset Your Password</div>
      <div className="reset_grid">
        <div className="reset_left">
          <div className="reset_form_text">
            How do you want to recieve the code to reset your password?
          </div>
          <label htmlFor="email" className="hover1">
            <input type="radio" name="" id="email" checked readOnly />
            <div className="label_col">
              <span>Send Code via email</span>
              <span>email@email.come</span>
            </div>
          </label>
        </div>
        <div className="reset_right">
          <img src={user.picture} alt="" />
          <span>email@email.come</span>
          <span>Blogram User</span>
        </div>
      </div>
      <div className="reset_form_btns">
        <Link to="/login" className="gray_btn">
          Not You?
        </Link>
        <button type="submit" className="black_btn">
          Continue
        </button>
      </div>
    </div>
  );
}
