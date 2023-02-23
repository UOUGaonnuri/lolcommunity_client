import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { CommunityWrap } from "./Community";
import CommunityReply from "./CommunityReply";
import NavigationBar from "../../addition/navigation-bar";
import Descript from "../../addition/Descript";
import MainForm from "./MainForm";
import moment from "moment";
import "moment/locale/ko";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import {boardDetail, boardDelete, replyWrite, replyDelete} from "../../_actions/userAction";
import {useDispatch} from "react-redux";
import recommend from "../../img/recommend.png"

const CommunityContentBox = styled.div`
  width: 100%;
  text-align: left;

  .detail {
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
  }
  
  .detail_header {
    padding-left: 24px;
    padding-right: 24px;
    padding: 24px 16px;
    border-bottom: 1px solid #ebeef1;
  }

  .detail_title {
    text-align: left;
    line-height: 36px;
    font-size: 24px;
    /* color: #1e2022; */
    word-wrap: break-word;
    word-break: break-all;
    overflow: auto;
  }

  .detail_sub {
    margin-top: 9px;
    line-height: 30px;
    font-size: 14px;
    color: #7b858e;
  }

  .detail_list {
    float: left;
    margin-top: 0;
  }

  .detail_content {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    margin-left: 8px;
    padding-left: 9px;
  }

  .detail_list_right {
    float: right;
  }
  
  .detail_content_container {
    padding-right: 24px;
    padding-left: 24px;
    padding: 24px 16px;
  }

  .detail_content_size p {
    margin: 10px 0;
    color: #555;
  }

  .recommend_box {
    border-top: 1px solid #ebeef1;
    border-bottom: 1px solid #ebeef1;
    text-align: center;
  }

  .recommend_btn {
    border-radius: 4px;
    background-color: #fff;
    border: 1px solid #dddfe4;

    width: 88px;
    line-height: 17px;
    font-size: 14px;
    height: 43px;

    color: #1e2022;
  }

  /*화살표 이미지*/

  .recommend_arrow {
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: 16px;
    line-height: 999px;
    vertical-align: top;
    overflow: hidden;
    display: inline-block;
    margin-top: 1px;
    transition: all 0.5s;
  }

  /*추천 숫자*/

  .recommend_count {
    transition: all 0.3s;
    display: inline-block;
  }

  .recommend_container {
    padding: 12px 0;
  }
  
  .delete_modify_btn {
    margin-top: 0px;
  }

  .delete_modify_btn_lo:first-child {
    margin-left: 1%;
  }

  .delete_modify_btn_lo {
    display: inline-block;
    vertical-align: middle;
  }

  button,
  input {
    margin: 0;
    font-size: 14px;
    outline: 0;
    border: 1px solid #dddfe4;
    border-radius: 4px;
  }

  .delete_btn {
    line-height: 15px;
    font-size: 12px;
    padding: 8px 15px 7px;
    border-color: #f95b54;
    background: #fff;
    color: #f95b54;
    margin-right: 5px;
  }

  .modify_btn {
    border: 1px solid #dddfe4;

    border-radius: 4px;
    line-height: 15px;
    font-size: 12px;
    padding: 10px 15px 7px;
    color: black;
    box-sizing: border-box;
  }
`;

const CommunityDetail = ({ match, history }) => {
  const dispatch = useDispatch();
  moment.locale("ko");
  const id = match.params;
  const pno = id.pno;
  console.log(pno);

  const [resp, setResp] = useState({});
  const [postinfo, setPostInfo] = useState("");

  const user= localStorage.getItem("jwtToken");
  const storageinfo = (user !== "null") ? (user) : ("null");

  useEffect(() => {
    dispatch(boardDetail(pno)).then((res) => {
      console.log(res);
      if(res.payload.status === 200){
        setResp(res.payload.data);
        setPostInfo(res.payload.data.token);
      }else{
        alert("게시물 불러오기에 실패하였습니다.");
      }
    })
  }, []);

  const onDeleteHandler  = () => {
    if (window.confirm("게시글을 삭제하시겠습니까?") == true) {
      dispatch(boardDelete(pno)).then((res) => {
        if(res.payload.status === 200){
          alert("삭제가 완료되었습니다.");
          history.push("/community");
        }else{
          alert("삭제가 완료되지 않았습니다.");
        }
      })
    }
  };

  const addReply = (reply) => {
    let body = {
      content: reply,
      pno: pno,
      writer: user,
    }
    dispatch(replyWrite(body)).then((res) => {
      if(res.payload.status === 200){
        alert("댓글 작성이 완료되었습니다.");
      }else{
        alert("댓글 작성에 실패하였습니다.")
      }
    })
  };

  const deleteReply = (reply) => {
    if (window.confirm("게시글을 삭제하시겠습니까?") == true){
      dispatch(replyWrite(pno)).then((res) => {
        if(res.payload.status === 200){
          alert("삭제가 완료되었습니다.");
          history.push("/:pno");
        }else{
          alert("삭제가 완료되지 않았습니다.");
        }
      })
    }
  }

  return (
    <div>
      <CommunityWrap>
        <NavigationBar />
        <div className="communityDetail_conatiner">
          <MainForm />
          <CommunityContentBox>
            <div key={resp.pno}>
              <div className="detail">
                <div className="detail_header">
                  <div className="detail_title">
                    {resp.title}
                  </div>
                  <div className="detail_sub">
                    <div className="detail_list">
                      <div className="detail_content">
                              <span>
                                {moment(resp.regDate)
                                    .startOf("second")
                                    .fromNow()}
                              </span>
                      </div>
                      <div className="detail_content">
                        {resp.writer}
                      </div>
                    </div>
                    <div className="detail_list detail_list_right">
                      <div className="detail_content">
                        <span>조회 {resp.data}</span>
                      </div>
                      <div className="detail_content">
                        <span>댓글 {resp.data}</span>
                      </div>
                      <div className="detail_content">
                        <span>추천 {resp.data}</span>
                      </div>
                    </div>
                  </div>

                  {postinfo === storageinfo && (
                      <div className="delete_modify_btn">
                        <div className="delete_modify_btn_lo">
                          <button
                              className="delete_btn"
                              onClick={onDeleteHandler}
                          >
                            삭제
                          </button>
                        </div>
                        <div className="delete_modify_btn_lo">
                          <Link
                              to={{
                                pathname: "/edit",
                                state: {
                                  pno: pno,
                                  title: resp.title,
                                  content: resp.content,
                                },
                              }}
                              className="modify_btn"
                          >
                            수정
                          </Link>
                        </div>
                      </div>
                  )}
                </div>
                <div>
                  <div className="detail_content_container">
                    <p>{resp.content}</p>
                  </div>
                </div>
                <div className="recommend_box">
                  <div className="recommend_container">
                    <button
                        style={{ cursor: "pointer" }}
                        type="submit"
                        className="recommend_btn"
                    >
                      <img src={recommend} className="recommend_arrow"/>
                      <span className="recommend_count">
                              {resp.data}
                            </span>
                    </button>
                  </div>
                </div>
                <CommunityReply
                    addReply={addReply}
                    deleteReply={deleteReply}
                    replies={resp.replies}
                />
              </div>
            </div>
            <Descript />
          </CommunityContentBox>
        </div>
      </CommunityWrap>
    </div>
  );
};

export default withRouter(CommunityDetail);
