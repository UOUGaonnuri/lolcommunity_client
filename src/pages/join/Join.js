import React, {useState} from "react";
import "./join.css";
import {Link} from "react-router-dom";
import {withRouter} from "react-router-dom";
import lol from "../../img/lol.png";
import {useDispatch} from "react-redux";
import {registerUser} from "../../_actions/userAction";

const Join = ({history}) => {

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [NickName, setNickName] = useState("");
    const dispatch = useDispatch();

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value);
    };

    const onNickNameHandler = (e) => {
        setNickName(e.currentTarget.value);
    };

    const onPasswordHanlder = (e) => {
        setPassword(e.currentTarget.value);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (Password) {
            let body = {
                email: Email,
                password: Password,
                nickname: NickName,
            };
            dispatch(registerUser(body)).then((res) => {
                alert("가입이 정상적으로 완료되었습니다");
                history.push("/login");
            });
        } else {
            alert("비밀번호가 일치하지 않습니다");
        }
    };

    const cancelHome = () => {
        history.push("/login");
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
                        <form onSubmit={onSubmitHandler}>
                            <div>
                                <div className="join_input_chk">
                                    <input
                                        onChange={onEmailHandler}
                                        className="join_input_box_chk"
                                        type="text"
                                        autoComplete="off"
                                        name="email"
                                        placeholder="이메일 주소"
                                    />
                                </div>
                                <button type="submit" className="check_btn">
                                    중복확인
                                </button>
                                <p className="message"></p>
                            </div>
                            <div>
                                <div className="join_input">
                                    <input
                                        onChange={onPasswordHanlder}
                                        className="join_input_box"
                                        type="password"
                                        autoComplete="off"
                                        name="password"
                                        placeholder="비밀번호"
                                    />
                                </div>
                                <p className="message"></p>
                            </div>
                            <div>
                                <div className="join_input_chk">
                                    <input
                                        onChange={onNickNameHandler}
                                        className="join_input_box_chk"
                                        type="text"
                                        autoComplete="off"
                                        name="nickname"
                                        placeholder="닉네임"
                                    />
                                </div>
                                <button type="submit" className="check_btn">
                                    중복확인
                                </button>
                                <p className="message"></p>
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
