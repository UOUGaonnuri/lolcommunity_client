import React, {useState} from "react";
import "./Modify.css";
import axios from "axios";
import {Link} from "react-router-dom";
import {withRouter} from "react-router-dom";
import lol from "../../img/lol.png";
import {useCookies} from "react-cookie";


const Join = ({history}) => {
    const [cookies, setCookie] = useCookies(['info']);
    const user= localStorage.getItem("info");
    const info = JSON.parse(user);
    const user_email = info[0];
    const user_pw = info[1];
    const user_nick = info[2];

    const [chk, setChk]=useState({
        nickname: "",
    });

    const [pwMessage, setPwMessage] = React.useState("");
    const [nickMessage, setNickMessage] = React.useState("");

    const [form, setForm] = useState({
        email: user_email,
        password: user_pw,
        nickname: user_nick,
    });

    const cancelHome = () => {
        history.push("/home");
    };

    const handleOnChange_pw = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        const passwordRegExp =
            /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if (!passwordRegExp.test(e.target.value)) {
            setPwMessage(
                "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
            );
        } else {
            setPwMessage("");
        }
    };

    const handleOnChange_nick = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        setChk({
            ...chk,
            [e.target.name]: e.target.value,
        });

        if (e.target.value.length > 8) {
            setNickMessage("닉네임은 8글자 이하로 입력해주세요!");
        }else{
            setNickMessage("");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        const email = form.email;
        const pw = form.password;
        const nick = form.nickname;
        const arr = [email, pw, nick];
        const arrString = JSON.stringify(arr);

        axios.put(
            "/users/update",
            form,
            {
                headers: {
                    // Accept: 'application/json',
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => {
                alert("수정이 완료되었습니다.");
                localStorage.setItem("info", arrString);
                setCookie('token',response.data.token);
                history.push("/home");
            })
            .catch((error) => {
                console.log(error.response);
                alert("수정에 실패하였습니다.");
            });
    };


    const handleSubmit_nick = (e) => {
        e.preventDefault();
        console.log(chk);
        axios.post(
            "/users/check/nickname",
            chk,
            {
                headers: {
                    // Accept: 'application/json',
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => {
                alert("사용 가능한 닉네임 입니다.");
            })
            .catch((error) => {
                console.log(error.response);
                alert("사용 중인 닉네임 입니다.");
            });
    };

    return (
        <div className="modify_container">
            <div className="modify_layout">
                <div className="modify_layout_inside">
                    <div className="register_header">
                        <Link to={"/home"}>
                            <img src={lol} className="modify_layout_logo_img"/>
                        </Link>
                    </div>
                    <h2 className="top_text">회원정보</h2>
                    <div className="top_sub">
                        이메일은 변경 불가능 합니다.
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="modify_input">
                                <div className="modify_input_box_email" name="email">{user_email}</div>
                            </div>
                            <div>
                                <div className="modify_input">
                                    <input
                                        onChange={handleOnChange_pw}
                                        className="modify_input_box"
                                        type="password"
                                        autoComplete="off"
                                        name="password"
                                        placeholder="비밀번호"
                                    />
                                </div>
                                <p className="message">{pwMessage}</p>
                            </div>
                            <div>
                                <div className="modify_input_chk">
                                    <input
                                        onChange={handleOnChange_nick}
                                        className="modify_input_box_chk"
                                        type="text"
                                        autoComplete="off"
                                        name="nickname"
                                        placeholder={user_nick}
                                    />
                                </div>
                                <button type="submit" onClick={handleSubmit_nick} className="check_btn">
                                    중복확인
                                </button>
                                <p className="message">{nickMessage}</p>
                            </div>
                            <div>
                                <button
                                    onClick={cancelHome}
                                    type="button"
                                    className="cancel_btn"
                                >
                                    취소
                                </button>
                                <button type="submit" className="sumbit_btn">
                                    수정하기
                                </button>
                            </div>
                        </form>
                    </div>
                    <br/>
                    <br/>
                    <div className="modify_to_login">
                        이미 회원이신가요?
                        <Link
                            to={"/login"}
                            href=""
                            type="button"
                            className="modify_to_login_btn"
                            alt="ff"
                        >
                            로그인하기
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Join);
