import { useState } from "react";
import "./style.css";
import axios from "axios";
export default function SendVerification({ user }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const sendVerificationLink = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/sendVerification",
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(data.message);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="send_verification">
      <span>
        Your account is not verified, verify your account before it get
        deleted!!!
      </span>
      <a
        onClick={() => {
          sendVerificationLink();
        }}
      >
        Click Here to resend verification link!!!
      </a>
      {success && <div className="success_text">{success}</div>}
      {error && <div className="error_text">{error}</div>}
    </div>
  );
}
