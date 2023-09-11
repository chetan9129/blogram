import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Form, Formik } from "formik";
import { useState } from "react";
import LoginInput from "../../components/inputs/logininputs";
import SearchAccount from "./SearchAccount";
import SendEmail from "./SendEmail";
import CodeVerification from "./CodeVerification";
import Footer from "../../components/login/Footer";
import ChangePassword from "./ChangePassword";
export default function Reset() {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, setEmail } = useState("");
  const { code, setCode } = useState("");
  const { password, setPassword } = useState("");
  const { conf_password, setConf_Password } = useState("");

  const { error, setError } = useState("");
  const [visible, setVisible] = useState(0);
  const logout = () => {
    Cookies.set("user", "");
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };
  return (
    <div className="reset">
      <div className="reset_header">
        <img src="../../icons/blogram.png" alt="" width={195} height={80} />
        {user ? (
          <div className="right_reset">
            <Link to="/profile">
              <img src={user.picture} alt="" />
            </Link>
            <button
              className="black_btn"
              onClick={() => {
                logout();
              }}
            >
              Logut
            </button>
          </div>
        ) : (
          <Link to="/login" className="right_reset">
            <button className="black_btn">Login</button>
          </Link>
        )}
      </div>
      <div className="reset_wrap">
        {visible === 0 && (
          <SearchAccount email={email} setEmail={setEmail} error={error} />
        )}
        {visible === 1 && <SendEmail user={user} />}
        {visible === 2 && (
          <CodeVerification
            user={user}
            code={code}
            setCode={setCode}
            error={error}
          />
        )}
        {visible === 3 && (
          <ChangePassword
            user={user}
            password={password}
            conf_password={conf_password}
            setConf_Password={setConf_Password}
            setPassword={setPassword}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
