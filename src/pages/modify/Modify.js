import React, {useState} from "react";
import "./Modify.css";
import {Link} from "react-router-dom";
import {withRouter} from "react-router-dom";
import lol from "../../img/lol.png";
import {checkNick, modify} from "../../_actions/userAction";
import {useDispatch} from "react-redux";


const Join = ({history}) => {

    const info = localStorage.getItem("info");
    const email = info[0];
    const nickname = info[1];

    const [Email, setEmail] = useState(email);
    const [Password, setPassword] = useState("");
    const [NickName, setNickName] = useState(nickname);
    const dispatch = useDispatch();

    const onNickNameHandler = (e) => {
        setNickName(e.currentTarget.value);
    };

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value);
    };

    const onChkNickHandler = (e) => {
        e.preventDefault();
        let body = {
            nickname: NickName
        }
        dispatch(checkNick(body))
            .then((res) => {
                if(res.payload.status === 200){
                    alert("사용 가능한 닉네임 입니다..");
                }else {
                    alert("사용 중인 닉네임 입니다.");
                }})
    }

    const onSubmitHandler = (e) => {
        let body = {
            email: Email,
            password: Password,
            nickname: NickName,
        }
        dispatch(modify(body))
            .then((res) => {
                if (res.payload.status === 200) {
                    alert("수정이 완료되었습니다.")
                    localStorage.setItem("jwtToken", res.payload.token);
                    history.push("/home");
                } else {
                    alert("수정에 실패하였습니다.");
                }
            })
    };

    const cancelHome = () => {
        history.push("/home");
    };

    const chkRegex = () => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/

        if(!passwordRegex.test(Password)){
            alert("비밀번호 형식에 올바르지 않습니다.");
            setPassword("");
        }
        if(NickName.length < 2 || NickName.length > 8){
            alert("닉네임 형식에 올바르지 않습니다.")
            setNickName("");
        }
    }

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
                        <br/>
                        비밀번호 형식: 숫자+영문자+특수문자 조합으로 8자리 이상
                        <br/>
                        닉네임 형식: 2자리 이상 8자리 이하
                    </div>
                    <div>
                        <form onSubmit={onSubmitHandler}>
                            <div className="modify_input">
                                <div className="modify_input_box_email" name="email">{Email}</div>
                            </div>
                            <div>
                                <div className="modify_input">
                                    <input
                                        onChange={onPasswordHandler}
                                        className="modify_input_box"
                                        type="password"
                                        autoComplete="off"
                                        name="password"
                                        placeholder="비밀번호"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="modify_input_chk">
                                    <input
                                        onChange={onNickNameHandler}
                                        className="modify_input_box_chk"
                                        type="text"
                                        autoComplete="off"
                                        name="nickname"
                                        placeholder={NickName}
                                    />
                                </div>
                                <button type="submit" onClick={onChkNickHandler} className="check_btn">
                                    중복확인
                                </button>
                            </div>
                            <div>
                                <button
                                    onClick={cancelHome}
                                    type="button"
                                    className="cancel_btn"
                                >
                                    취소
                                </button>
                                <button type="submit" onClick={chkRegex} className="sumbit_btn">
                                    수정하기
                                </button>
                            </div>
                        </form>
                    </div>
                    <br/>
                    <br/>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Join);
