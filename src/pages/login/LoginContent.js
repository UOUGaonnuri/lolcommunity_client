import React, {useId, useState} from "react";
import { Link} from "react-router-dom";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';

import lol from "../../img/lol.png";
const LoginContent = ({ history }) => {
  const [cookies, setCookie] = useCookies(['info']);
  const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onChangeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "/users/login",

        form,
        {
          headers: {
            // Accept: 'application/json',
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        const email = form.email;
        const pw = form.password;
        const nick = response.data.nickname;
        const arr = [email, pw, nick];

        const arrString = JSON.stringify(arr);
        alert("로그인이 완료되었습니다!");
        localStorage.setItem("info", arrString);
        setCookie('token',response.data.token);

        history.push("/home");
      })
      .catch((error) => {
        console.log(error.response);
        alert("로그인이 되지 않았습니다!");
      });
  };

  return (
    <div className="app">
      {!localStorage.getItem("jwtToken") ? (
        <div className="login_layout">
          {/* <!-- 흰색 박스 --> */}
          <div className="login_layout_container">
            {/* <!-- 컨테이너 안 div --> */}
            <div className="login_layout_inside">
              {/* <!-- 로고 div --> */}
              <Link to={"/home"}>
                <h1 className="login_layout_logo">
                  <img
                    className="login_layout_logo_img"
                    src={lol}
                  />
                </h1>
              </Link>
              <div className="login">
                <form onSubmit={onSubmit}>
                  <h2 className="login_email">이메일 로그인</h2>
                  <div className="login_input">
                    {/* <!-- 이메일 input 박스 --> */}
                    <input
                        id="memberInput6908"
                        className="login_input_box"
                        type="text"
                        autoComplete="off"
                        name="email"
                        placeholder="이메일"
                        onChange={onChangeForm}
                    />
                  </div>
                  <div>
                    <div className="login_input">
                      {/* <!-- 비밀번호 input 박스 --> */}
                      <input
                        id="memberInput3108"
                        className="login_input_box"
                        type="password"
                        autoComplete="off"
                        name="password"
                        onChange={onChangeForm}
                        placeholder="비밀번호"
                      />
                    </div>
                    <Link className="login_link" to="/find">
                      비밀번호를 잊으셨나요?
                    </Link>
                  </div>
                  <button type="submit" className="login_btn_text login_btn">
                    로그인
                  </button>
                  <div className="login_join">
                    LOL.GG에 처음이세요?
                    <Link className="login_link" to="/join">
                      회원가입하기
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>{(alert("잘못된 접근입니다."), history.push("/"))}</div>
      )}
    </div>
  );
};

export default withRouter(LoginContent);
