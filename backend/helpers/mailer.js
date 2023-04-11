const nodemailer = require("nodemailer");

const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const oauth_link = "https://developers.google.com/oauthplayground";
const { EMAIL, MAILING_ID, MAILING_REFRESH, MAINLING_SECRET } = process.env;

const auth = new OAuth2(MAILING_ID, MAILING_REFRESH, MAINLING_SECRET);

exports.sendVerificationEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAINLING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Blogram Email Verification",
    html: ``,
  };
  stmp: sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      return res;
    }
  });
};
