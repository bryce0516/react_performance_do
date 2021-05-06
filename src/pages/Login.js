import React, { useState, useRef, useEffect } from "react";
import LoginLogo from "../assets/images/login_logo.png";
import InfoPNG from "../assets/images/info.png";
import LockPNG from "../assets/images/lock.png";

import { makeStyles } from "@material-ui/core/styles";

import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& .card": {
      flex: 1,
      flexDirection: "column",
      width: "480px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "10px 10px 20px 0 rgba(0, 0, 0, 0.2)",
      padding: "0 40px 48px",
      background: "#fff",
      "& > img": {
        width: "205px",
        height: "246px",
      },
      "& .card-title": {
        textAlign: "center",
        fontFamily: '"Montserrat", sans-serif',
        paddingBottom: "14px",
        "& .card-title-upper": {
          fontSize: "30px",
          fontWeight: 300,
          fontStretch: "normal",
          fontStyle: "normal",
          lineHeight: 1.07,
          letterSpacing: "normal",
        },
        "& .card-title-lower": {
          fontSize: "28px",
          fontWeight: "bold",
          letterSpacing: "3.36px",
        },
      },

      "& .login-form": {
        width: "100%",
      },

      "& .input-field": {
        width: "100%",
        display: "flex",
        marginTop: "16px",
        "& .input-adornment-img": {
          width: "36px",
        },
      },

      "& .find-passowrd-txt": {
        fontFamily: '"Noto Sans KR", sans-serif',
        fontSize: "12px",
        fontWeight: 300,
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: 1.5,
        letterSpacing: "-0.48px",
        color: "#ff6702",
        textAlign: "right",
        marginTop: "10px",
      },
      "& .btn-container": {
        display: "flex",
        width: "100%",
      },
      "& .login-submit-btn": {
        height: "40px",
        borderRadius: "20px",
        marginTop: "26px",
        flex: 1,
        border: "none",
        color: "#fff",
        backgroundColor: theme.palette.primary.light,
      },
    },
  },
}));

export default function Login({ userContext }) {
  console.log("userContext", userContext);
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  let history = useHistory();

  const [wrongInfoOpen, setWrongInfoOpen] = useState(false);
  const [failOpen, setFailOpen] = useState(false);

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setFailOpen(false);
    setWrongInfoOpen(false);
  };

  const handleSubmit = async () => {
    let result = await userContext.signIn(
      usernameRef.current.value,
      passwordRef.current.value
    );

    if (result.success_yn) {
      userContext.updateContext();
    } else {
      if (result.status === 403) {
        console.log(result);
        setWrongInfoOpen(true);
      } else {
        setFailOpen(true);
      }
    }
  };

  useEffect(() => {
    if (userContext.user.admin_type === "AD_001") {
      history.push("/mk");
    } else if (userContext.user.admin_type === "AD_002") {
      history.push("/kitchen");
    } else {
      history.push("/login");
    }
    return () => {};
  }, [userContext.user.admin_type]);

  const props = { backgroundColor: "black", color: "white" };
  const classes = useStyles(props);

  return (
    <div className={classes.root} onKeyPress={handleEnterPress}>
      <div className="card">
        <img src={LoginLogo} alt="" />
        <p className="card-title">
          <span className="card-title-upper">MONTHLY</span>
          <br />
          <span className="card-title-lower">KITCHEN</span>
        </p>
        <div className="login-form">
          <div className="input-field">
            <FormControl style={{ flex: 1 }}>
              <OutlinedInput
                id="input-username-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <img className="input-adornment-img" src={InfoPNG} alt="" />
                  </InputAdornment>
                }
                inputRef={usernameRef}
              />
            </FormControl>
          </div>

          <div className="input-field">
            <FormControl style={{ flex: 1 }}>
              <OutlinedInput
                id="input-password-with-icon-adornment"
                type="password"
                startAdornment={
                  <InputAdornment position="start">
                    <img className="input-adornment-img" src={LockPNG} alt="" />
                  </InputAdornment>
                }
                inputRef={passwordRef}
              />
            </FormControl>
          </div>
        </div>
        <div className="btn-container">
          <Button
            className="login-submit-btn"
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </div>
      </div>
      <Snackbar
        open={wrongInfoOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning">
          아이디 / 비밀번호를 확인해주세요.
        </Alert>
      </Snackbar>
      <Snackbar open={failOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          로그인에 실패하였습니다.
        </Alert>
      </Snackbar>
    </div>
  );
}
