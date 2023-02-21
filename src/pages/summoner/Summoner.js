import {api_key} from "./api_key";
import React, {useState, useEffect} from "react";
import NavigationBar from "../../addition/navigation-bar";
import styled from "styled-components";
import "../summoner/Summoner.css";
import {withRouter} from "react-router-dom";
import axios from "axios";
import defaulticon from "../../img/default.png"

const SummonerHeader = styled.div`
  position: relative;
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0 0 0;
`;

const Summoner = ({match, history}) => {
    if (match.params === null) {
        history.goBack();
    }
    const summoner = match.params.summoner;
    const [userinfo, setUserInfo] = useState([]);
    const [solo, setSolo] = useState([]);
    const [sub, setSub] = useState([]);

    const [isUpdate, setIsUpdate] = useState(false);
    const getDetailDto = () => {

    };

    const changeName = () => {

    };

    useEffect(() => {
        axios.get("/riot/lol/summoner/v4/summoners/by-name/" + `${summoner}` +'?api_key=' + `${api_key}`)
            .then((res) => {
                setUserInfo(res.data);
            })
            .catch((err) => {
                alert("해당 소환사가 없습니다.");
            })
    },[]);

    useEffect(()=>{
        axios.get("/riot/lol/league/v4/entries/by-summoner/" + `${userinfo.id}` +'?api_key=' + `${api_key}`)
            .then((res) => {
                if(res.data.length === 3){
                    setSolo(res.data[0]);
                    setSub(res.data[2]);
                }else if(res.data.length === 2){
                    if((res.data[0].queueType).length === 15 && (res.data[1].queueType).length === 14 ){
                        setSolo(res.data[0]);
                        setSub(res.data[1]);
                    }else if((res.data[0].queueType).length === 15){
                        setSolo(res.data[0]);
                    }else if((res.data[0].queueType).length === 14){
                        setSub(res.data[0]);
                    }else if((res.data[1].queueType).length === 14){
                        setSub(res.data[1]);
                    }
                }else if(res.data.length === 1) {
                    if ((res.data[0].queueType).length === 15) {
                        setSolo(res.data[0]);
                    } else if ((res.data[0].queueType).length === 14) {
                        setSub(res.data[0]);
                    }
                }})
            .catch((err) => {
            })
    },[userinfo]);

    const updateInfo = (summonerName) => {
        setIsUpdate(true);
        axios
            .get("/riot/lol/summoner/v4/summoners/by-name/" + `${summoner}` +'?api_key=' + `${api_key}`)
            .then((res) => {
                alert("갱신이 완료되었습니다.");
                setUserInfo(res.data);
                setIsUpdate(false);
            })
            .catch((error) => {
                console.log(error.response);
            });
    };

    const solo_rank = solo.tier || '';
    const sub_rank = sub.tier || '';

    return (
        <>
            <NavigationBar changeName={changeName}/>
            <div>
                <div className="header">
                    <div className="face">
                        <div className="profileIcon">
                            <img
                                className="profileImage"
                                src={"/info/cdn/10.16.1/img/profileicon/"+userinfo.profileIconId+".png"}
                            />
                            <span className="level">
                                {userinfo.summonerLevel}
                            </span>
                        </div>
                    </div>
                    <div className="profile">
                        <div className="information">
                            <span className="name">
                                {userinfo.name}
                            </span>
                            <div className="button">
                                {isUpdate === false ? (
                                    <button
                                        className="button__blue"
                                        onClick={() => {updateInfo(userinfo.name);}}
                                    >
                                        전적갱신
                                    </button>
                                ) : (<button className="button__blue">갱신중</button>)}
                            </div>
                        </div>
                    </div>
                    <div className="contentWrap">
                        <div className="tabItem__content">
                            <div className="sideContent">
                                <div className="tierbox">
                                    <div className="summonerRating">
                                        <div className="medal">
                                            {solo.length === 0 ? (
                                                    <img
                                                        className="medalImage"
                                                        src={defaulticon}
                                                        alt="솔랭"/>
                                                )
                                                :
                                                (
                                                    <img
                                                        className="medalImage"
                                                        src={"/rank/images/medals_new/"+solo_rank.toLowerCase()+".png"}
                                                        alt="솔랭"/>)}
                                        </div>
                                        <div className="tierRankInfo">
                                            <div className="rankType">솔로랭크</div>
                                            <div className="tierRank">
                                                {solo.tier}{" "}{solo.rank}
                                            </div>
                                            <div className="tierInfo">
                                             <span className="leaguePoints">
                                                 {solo.leaguePoints+" LP"}{" "}
                                             </span>
                                                <span className="winLose">
                                                <span className="wins">
                                                    {" "}{solo.wins}승{" "}
                                                </span>
                                                <span className="lossers">
                                                    {solo.losses}패{" "}
                                                </span>
                                                <br />
                                                <span className="winRatio">
                                                    승률{" "}
                                                    {(solo.wins/(solo.wins+solo.losses)*100).toFixed(2)}%
                                                </span>
                                            </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="sub-tier">
                                    {sub.length === 0 ?
                                        (<img
                                            className="medalImage"
                                            src={defaulticon}
                                            alt="자랭"/>)
                                        :
                                        (
                                            <img
                                                className="img-sub-tier__medal"
                                                src={"/rank/images/medals_new/"+sub_rank.toLowerCase()+".png"}
                                                alt="자랭"
                                            />)}
                                    <div className="sub-tier__info__unranked">
                                        <div className="tierRankInfo">
                                            <div className="rankType">자유 5:5 랭크</div>
                                            <div className="tierRank">
                                                {sub.tier}{" "}{sub.rank}
                                            </div>
                                            <div className="tierInfo">
                                                <span className="leaguePoints">
                                                    {sub.leaguePoints+" LP"}
                                                </span>
                                                <span className="winLose">
                                                    <span className="wins">
                                                        {" "}{sub.wins}{" "}승{" "}
                                                    </span>
                                                    <span className="lossers">
                                                        {" "}{sub.losses}{" "}패{" "}
                                                    </span>
                                                    <br />
                                                    <span className="winRatio">
                                                        승률{" "}
                                                        {(sub.wins/(sub.wins+sub.losses)*100).toFixed(2)}%
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default withRouter(Summoner);
