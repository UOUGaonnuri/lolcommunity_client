import React, { useState } from "react";
import styled from "styled-components";
import { CommunityWrap } from "./Community";
import NavigationBar from "../../addition/navigation-bar";
import MainForm from "./MainForm";
import Descript from "../../addition/Descript";
import { withRouter } from "react-router-dom";
import axios from "axios";

const WriteBox = styled.div`
  text-align: center;
  width: 100%;

  .write_container {
    background: rgb(255, 255, 255);
    padding: 20px 10px;
  }
  
  .write_title {
    color: rgb(30, 32, 34);
    text-align: left;
    font-weight: 700;
  }
  .write_area {
    margin-top: 16px;
  }
  .write_header {
    position: static;
    text-align: left;
    padding-bottom: 0px;
    padding-top: 8px;
    background: rgb(255, 255, 255);
  }

  .write_area_title {
    display: block;
    width: 100%;
    background-color: rgb(255, 255, 255);
    line-height: 19px;
    font-size: 16px;
    color: rgb(30, 32, 34);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(221, 223, 228);
    border-image: initial;
    padding: 10px 16px 9px;
  }

  .write_content {
    width: 100%;
  }
  
  .write_area_content {
    width: 97.8%;
    margin-top: 13px;
    border: 1px solid rgb(221, 223, 228);
    color: rgb(30, 32, 34);
    resize: none;
    height: 350px;
    font-size: 17px;
    padding: 10px;
  }

  .write_submit_btn {
    margin-top: 16px;
    position: static;
    border: 0;
    color: #fff;
    border-radius: 4px;
    background-color: #46cfa7;
    width: 154px;
    height: 48px;
    line-height: 19px;
    font-size: 16px;
  }

  .write_cancel_btn {
    margin-top: 16px;
    line-height: 19px;
    font-size: 16px;
    color: #7b858e;
    border-radius: 4px;
    background-color: #fff;
    border: 1px solid #dddfe4;
    width: 154px;
    height: 48px;
  }

  .write_btn {
    display: flex;
    justify-content: space-between;
  }
`;



const CommunityWrite = ({ history }) => {

  const user= localStorage.getItem("info");
  const info = JSON.parse(user);
  const user_email = info[0];

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const storageUserId = parseInt(localStorage.getItem("userId"));

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  // 이거 작성완료 누르면 데이터보내고 본진으로 가는것을 구현할 것이다
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title);
    console.log(content);

    axios
      .post(
        "/board/write",
        {
          writer: user_email,
          title: title,
          content: content,
        },
        {
          headers: {
            // Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
        }
      )
      .then((response) => {
        console.log(response);

        alert("글작성이 완료되었습니다.");
        history.push("/community");
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div>
      <CommunityWrap>
        <NavigationBar />
        <div className="communityWrite_conatiner">
          <MainForm />
          <div>
            <WriteBox>
              <div className="content">
                <form onSubmit={handleSubmit}>
                  <div className="write_container">
                    <div className="write_header">
                      <div className="write_title">글쓰기</div>
                    </div>
                    <div className="write_area">
                      <input
                        onChange={handleChangeTitle}
                        type="text"
                        name="title"
                        className="write_area_title"
                        placeholder="제목"
                        autoComplete="off"
                      />
                    </div>
                    <div className="write_content">
                      <textarea
                        onChange={handleChangeContent}
                        className="write_area_content"
                      ></textarea>
                    </div>
                    <div className="write_btn">
                      <button
                        className="write_btn write_cancel_btn"
                        type="button"
                        onClick={() => history.push("/community")}
                      >
                        취소
                      </button>
                      <button
                        className="write_btn write_submit_btn"
                        type="submit"
                      >
                        작성완료
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </WriteBox>
          </div>
          <Descript />
        </div>
      </CommunityWrap>
    </div>
  );
};

export default withRouter(CommunityWrite);
