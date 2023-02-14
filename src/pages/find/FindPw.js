import React, {useState} from "react";
import "./FindPw.css";
import axios from "axios";
import {Link} from "react-router-dom";
import {withRouter} from "react-router-dom";
import lol from "../../img/lol.png";


const FindPw = ({history}) => {

    const [form, setForm] = useState({
        email: "",
        nickname: "",
    });

    const cancelHome = () => {
        history.push("/login");
    };

    const handleOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        axios.post(
            "/users/findpw",
            form,
            {
                headers: {
                    // Accept: 'application/json',
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => {
                alert("임시 비밀번호를 보내드렸습니다.");
                history.push("/login");
            })
            .catch((error) => {
                console.log(error.response);
                alert("일치하는 회원정보가 없습니다.");
            });
    };

    return (
        <div className="find_container">
            <div className="find_layout">
                <div className="find_layout_inside">
                    <div className="register_header">
                        <Link to={"/home"}>
                            <img src={lol} className="find_layout_logo_img"/>
                        </Link>
                    </div>
                    <h2 className="top_text">비밀번호 찾기</h2>
                    <div className="top_sub">
                        이메일과 닉네임을 입력 시 해당 이메일로 임시 비밀번호를 보내드립니다.
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="find_input">
                                <input
                                    onChange={handleOnChange}
                                    className="find_input_box"
                                    type="text"
                                    autoComplete="off"
                                    name="email"
                                    placeholder="이메일 주소"
                                />
                            </div>
                            <div className="find_input">
                                <input
                                    onChange={handleOnChange}
                                    className="find_input_box"
                                    type="text"
                                    autoComplete="off"
                                    name="nickname"
                                    placeholder="닉네임"
                                />
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
                                    메일 받기
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

export default withRouter(FindPw);
