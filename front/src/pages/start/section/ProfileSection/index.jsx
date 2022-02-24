import React, { useCallback, useState } from "react";
import styles from "./profile.module.css";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";

import { ReactComponent as CheckIcon } from "../../../../image/check.svg";
import { ReactComponent as CheckedIcon } from "../../../../image/checked.svg";
import { ReactComponent as Alert } from "../../../../image/alert.svg";
import { emojiSlice, isEmail, spaceSlice } from "../../../../utils/inputCheck";
import { useEffect } from "react";

function ProfileSection() {
  const [checked, setChecked] = useState([false, false]);
  const [orgName, setOrgName] = useState("");
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [activeBtn, setActiveBtn] = useState(false);

  const navigate = useNavigate();

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  const onChangeOrgName = useCallback((e) => {
    setOrgName(e.target.value);
  }, []);

  const onChangeName = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const onChangePhoneNum = useCallback((e) => {
    let value = emojiSlice(e.target.value);
    value = spaceSlice(value);
    value = value.replace(/[^0-9]/g, "");
    value = value.slice(0, 12);
    setPhoneNum(value);
  }, []);

  const EmailValidCheck = useCallback((value) => {
    if (!isEmail(value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
    if (value === "") {
      setEmailValid(false);
    }
  }, []);

  const debounceSomethingFunc = debounce((value) => {
    if (value.length >= 7) {
      EmailValidCheck(value);
    }
  }, 500);

  const onChangeEmail = useCallback((e) => {
    let value = emojiSlice(e.target.value);
    value = spaceSlice(value);

    setEmail(value);

    debounceSomethingFunc(value);
  }, []);

  const handleSubmitProfile = useCallback(
    (e) => {
      e.preventDefault();
      localStorage["profile"] = JSON.stringify({
        orgName,
        name,
        phoneNum,
        email,
        checked,
        result: false,
      });

      navigate("../foundation");
    },
    [orgName, name, phoneNum, email, checked]
  );

  useEffect(() => {
    if (
      checked[0] &&
      orgName.length > 2 &&
      name.length >= 2 &&
      phoneNum.length >= 6 &&
      email.length >= 7 &&
      !emailValid
    ) {
      setActiveBtn(true);
    } else {
      setActiveBtn(false);
    }
  }, [checked, orgName, name, phoneNum, email, emailValid]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <div className={styles.title}>아래의 정보를 입력해주세요</div>
        </div>
        <form onSubmit={handleSubmitProfile}>
          <div className={styles.body}>
            <div className={styles.field_wrap}>
              <BpTextField
                id="standard-textarea"
                label="회사명"
                multiline
                variant="standard"
                fullWidth
                value={orgName}
                onChange={onChangeOrgName}
              />
            </div>
            <div className={styles.field_wrap}>
              <BpTextField
                id="standard-textarea"
                label="대표자 성함"
                multiline
                variant="standard"
                fullWidth
                value={name}
                onChange={onChangeName}
              />
            </div>
            <div className={styles.field_wrap}>
              <BpTextField
                id="standard-textarea"
                label="휴대폰번호 (-빼고 숫자만 입력해주세요)"
                multiline
                variant="standard"
                fullWidth
                value={phoneNum}
                onChange={onChangePhoneNum}
              />
            </div>
            <div className={styles.field_wrap}>
              <BpTextField
                id="standard-textarea"
                label="이메일"
                multiline
                variant="standard"
                fullWidth
                value={email}
                onChange={onChangeEmail}
                helperText={
                  emailValid && (
                    <>
                      <Alert></Alert>
                      <span style={{ marginLeft: "4px" }}>
                        잘못된 형식의 이메일입니다
                      </span>
                    </>
                  )
                }
              />
            </div>
          </div>
          <div className={styles.footer}>
            <div className={styles.check_wrap}>
              <BpFormControlLabel
                label={
                  <>
                    <span className={styles.b}>모두 동의</span>
                  </>
                }
                control={
                  <Checkbox
                    checked={checked[0] && checked[1]}
                    onChange={handleChange1}
                    checkedIcon={<CheckedIcon />}
                    icon={<CheckIcon />}
                  />
                }
              />
            </div>
            <div className={styles.check_wrap}>
              <BpFormControlLabel
                label={
                  <>
                    <span>개인정보 수집 및 이용에 관한 동의 (필수)</span>
                  </>
                }
                control={
                  <Checkbox
                    checked={checked[0]}
                    onChange={handleChange2}
                    checkedIcon={<CheckedIcon />}
                    icon={<CheckIcon />}
                  />
                }
              />
              <span className={styles.sky}>보기</span>
            </div>
            <div className={styles.check_wrap}>
              <BpFormControlLabel
                label={
                  <>
                    <span>정보 수신에 관한 동의(선택)</span>
                  </>
                }
                control={
                  <Checkbox
                    checked={checked[1]}
                    onChange={handleChange3}
                    checkedIcon={<CheckedIcon />}
                    icon={<CheckIcon />}
                  />
                }
              />
              <span className={styles.sky}>보기</span>
            </div>
          </div>

          <button className={styles.button} disabled={!activeBtn}>
            진단 시작하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileSection;

const BpTextField = styled(TextField)({
  "& .MuiInput-underline:before": {
    borderBottomWidth: "2px",
    borderBottomColor: "#E5E5E5",
    "&:hover": {
      borderBottomWidth: "2px",
      borderBottomColor: "#E5E5E5",
    },
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#E5E5E5",
  },
  "& .MuiInput-input": {
    fontSize: "16px",
    lineHeight: "25px",
    letterSpacing: "-0.0025em",
    fontWeight: "700",
    paddingLeft: "4px",
  },
  "& .MuiInputLabel-root": {
    fontSize: "16px",
    lineHeight: "25px",
    letterSpacing: "-0.0025em",

    color: "#888888",
    "&.Mui-focused": {
      color: "#616161",
      fontSize: "18px",
      lineHeight: "27px",
      letterSpacing: "-0.0025em",
      fontWeight: "700",
      marginLeft: "4px",
    },
    "&.MuiFormLabel-filled": {
      color: "#616161",
      fontSize: "18px",
      lineHeight: "27px",
      letterSpacing: "-0.0025em",
      fontWeight: "700",
      marginLeft: "4px",
    },
  },
  ".MuiFormHelperText-root": {
    color: "#ec4f4a",
    fontSize: "12px",
    lineHeight: "19px",
    letterSpacing: "-0.0025em",
    fontWeight: "700",
    marginTop: "8px",
    display: "flex",
    alignItems: "center",
  },
});

const BpFormControlLabel = styled(FormControlLabel)({
  "& .MuiCheckbox-root": {
    paddingBottom: "0px",
    paddingTop: "0px",
    paddingRight: "0px",
    marginRight: "8px",
  },
  "&": {
    marginLeft: "0px",
  },
  "& .MuiFormControlLabel-label": {
    lineHeight: "22px",
    fontSize: "14px",
    fontWeight: "400",
    letterSpacing: "-0.0025em",
    color: "#616161",
  },
});
