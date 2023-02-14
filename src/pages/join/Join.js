import React, {useState} from "react";
import "./join.css";
import axios from "axios";
import {Link} from "react-router-dom";
import {withRouter} from "react-router-dom";
import lol from "../../img/lol.png";


const Join = ({history}) => {

    const [chk, setChk] = useState({
        email: "",
    });

    const [chk_1, setChk_1]=useState({
        nickname: "",
    });
    const [emailMessage, setEmailMessage] = React.useState("");
    const [pwMessage, setPwMessage] = React.useState("");
    const [nickMessage, setNickMessage] = React.useState("");

    const [form, setForm] = useState({
        email: "",
        password: "",
        nickname: "",
    });

    const cancelHome = () => {
        history.push("/login");
    };

    const handleOnChange_email = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        setChk({
            ...chk,
            [e.target.name]: e.target.value,
        });

        const emailRegExp =
            /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

        if (!emailRegExp.test(e.target.value)) {
            setEmailMessage("이메일의 형식이 올바르지 않습니다!");
        }else{
            setEmailMessage("");
        }
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
        setChk_1({
            ...chk_1,
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
        axios.post(
            "/users/register",
            form,
            {
                headers: {
                    // Accept: 'application/json',
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => {
                alert("회원가입이 완료되었습니다.");
                history.push("/login");
            })
            .catch((error) => {
                console.log(error.response);
                alert("회원가입에 실패하셨습니다.");
            });
    };

    const handleSubmit_email = (e) => {
        e.preventDefault();
        console.log(chk);
        axios.post(
            "/users/check/email",
            chk,
            {
                headers: {
                    // Accept: 'application/json',
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => {
                alert("사용 가능한 이메일 입니다.");
            })
            .catch((error) => {
                console.log(error.response);
                alert("사용 중인 이메일 입니다.");
            });
    };

    const handleSubmit_nick = (e) => {
        e.preventDefault();
        console.log(chk_1);
        axios.post(
            "/users/check/nickname",
            chk_1,
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
        <div className="join_container">
            <div className="join_layout">
                <div className="join_layout_inside">
                    <div className="register_header">
                        <Link to={"/home"}>
                            <img src={lol} className="join_layout_logo_img"/>
                        </Link>
                    </div>
                    <h2 className="top_text">기본정보 입력</h2>
                    <div className="top_sub">
                        회원가입을 위해 이메일 주소를 기입해주시길 바랍니다.
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <div className="join_input_chk">
                                    <input
                                        onChange={handleOnChange_email}
                                        className="join_input_box_chk"
                                        type="text"
                                        autoComplete="off"
                                        name="email"
                                        placeholder="이메일 주소"
                                    />
                                </div>
                                <button type="submit" onClick={handleSubmit_email} className="check_btn">
                                    중복확인
                                </button>
                                <p className="message">{emailMessage}</p>
                            </div>
                            <div>
                                <div className="join_input">
                                    <input
                                        onChange={handleOnChange_pw}
                                        className="join_input_box"
                                        type="password"
                                        autoComplete="off"
                                        name="password"
                                        placeholder="비밀번호"
                                    />
                                </div>
                                <p className="message">{pwMessage}</p>
                            </div>
                            <div>
                                <div className="join_input_chk">
                                    <input
                                        onChange={handleOnChange_nick}
                                        className="join_input_box_chk"
                                        type="text"
                                        autoComplete="off"
                                        name="nickname"
                                        placeholder="닉네임"
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
                                    가입하기
                                </button>
                            </div>
                        </form>
                    </div>
                    <br/>
                    <br/>
                    <div className="join_to_login">
                        이미 회원이신가요?
                        <Link
                            to={"/login"}
                            href=""
                            type="button"
                            className="join_to_login_btn"
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
