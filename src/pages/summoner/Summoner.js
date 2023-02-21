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
    const [matchid, setMatchId] = useState([]);
    const [matchcnt, setMatchCnt] = useState();
    const [user, setUser] = useState([]);
    const [games, setGames] = useState([{}]);
    const [mainRune, setMainRune] = useState();
    const [subRune, setSubRune] = useState();

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

    useEffect(() => {
        axios.get("/game/lol/match/v5/matches/by-puuid/"+`${userinfo.puuid}`+"/ids?&type=ranked&start=0&count=1&api_key="+`${api_key}`)
            .then((res) => {
                setMatchId(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
    },[userinfo]);

    useEffect(() => {
        axios.get("/game/lol/match/v5/matches/"+`${matchid}`+"?api_key="+`${api_key}`)
            .then((res) => {
                setGames(res.data.info);
                for(var i = 0; i<10; i++){
                    if(res.data.info.participants && res.data.info.participants.length > 0) {
                        if(res.data.info.participants[i].puuid === userinfo.puuid){
                            setUser(res.data.info.participants[i]);
                            setMainRune(res.data.info.participants[i].perks.styles[0].selections[0].perk);
                            setSubRune(res.data.info.participants[i].perks.styles[1].style);
                        }
                    }
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    },[matchid]);

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

    const getCreation = (creation) => {
        // Date의 프로토타입에 함수추가
        Date.prototype.yyyymmdd = function () {
            var yyyy = this.getFullYear().toString();
            var mm = (this.getMonth() + 1).toString();
            var dd = this.getDate().toString();

            return (
                yyyy +
                "-" +
                (mm[1] ? mm : "0" + mm[0]) +
                "-" +
                (dd[1] ? dd : "0" + dd[0])
            );
        };

        if (creation + 86400000 > Date.now()) {
            let temp = Date.now() - creation;
            if (temp < 60000) {
                return (temp / 1000).toFixed(0) + "초 전";
            } else if (temp < 3600000) {
                return (temp / 60000).toFixed(0) + "분 전";
            } else {
                return (temp / 3600000).toFixed(0) + "시간 전";
            }
        }
        return new Date(creation).yyyymmdd();
    };

    const getDuration = (duration) => {
        let minutes = (duration / 60).toFixed(0);
        let seconds = (duration % 60).toFixed(0);

        if ((minutes + "").length === 1) {
            minutes = "0" + minutes;
        }

        if ((seconds + "").length === 1) {
            seconds = "0" + seconds;
        }

        return minutes + ":" + seconds;
    };

    const getChampImg = () => {
        return (
            "/info/cdn/10.16.1/img/champion/" +
            `${user.championName}` +
            ".png"
        );
    };

    const getSpellImg = (spellId) => {
        let spellName = null;

        if (spellId === 21) {
            spellName = "SummonerBarrier";
        } else if (spellId === 1) {
            spellName = "SummonerBoost";
        } else if (spellId === 14) {
            spellName = "SummonerDot";
        } else if (spellId === 3) {
            spellName = "SummonerExhaust";
        } else if (spellId === 4) {
            spellName = "SummonerFlash";
        } else if (spellId === 6) {
            spellName = "SummonerHaste";
        } else if (spellId === 7) {
            spellName = "SummonerHeal";
        } else if (spellId === 13) {
            spellName = "SummonerMana";
        } else if (spellId === 30) {
            spellName = "SummonerPoroRecall";
        } else if (spellId === 31) {
            spellName = "SummonerPoroThrow";
        } else if (spellId === 11) {
            spellName = "SummonerSmite";
        } else if (spellId === 39) {
            spellName = "SummonerSnowURFSnowball_Mark";
        } else if (spellId === 32) {
            spellName = "SummonerSnowball";
        } else if (spellId === 12) {
            spellName = "SummonerTeleport";
        }

        return (
            "/info/cdn/10.16.1/img/spell/" +
            spellName +
            ".png"
        );
    };

    const getRuneImg = (perkId) => {
        if(perkId === mainRune){
            return (
                "/rank/meta/images/lol/perk/"+ `${perkId}`+ ".png"
            );
        }else{
            return (
                "/rank/meta/images/lol/perkStyle/"+ `${perkId}`+ ".png"
            );
        }
    };

    const getGrade = (kill, death, assist) => {
        if (death === 0) {
            return "Perfect 평점";
        }

        let grade = ((kill + assist) / death).toFixed(2);

        return grade + ":1 평점";
    };

    const solo_rank = solo.tier || '';
    const sub_rank = sub.tier || '';

    console.log(user);
    console.log(games);

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
                            <div className="realContent">
                                <div
                                    className="gameListContainer"
                                    data-summoer-id=""
                                    data-last-info=""
                                >
                                    <div className="content">
                                        {matchid && matchid.map(()=>(
                                            <div className="gameItemList">
                                                <div
                                                    className="gameItemWrap"
                                                    key={userinfo.id}
                                                >
                                                    <div
                                                        className={
                                                            user.win === true
                                                                ? "gameItemWinExtended"
                                                                : "gameItemLoseExtended"
                                                        }
                                                    >
                                                        <div className="toggle-content">
                                                            <div className="gameStats">
                                                                <div className="gameType" title="솔랭">
                                                                    {games.queueId === 420 ? "솔랭" : "자유"}
                                                                </div>
                                                                <div className="timeStamp">
                                                                <span className="toggle-time">
                                                                    {getCreation(games.gameCreation)}
                                                                </span>
                                                                </div>
                                                                <div className={
                                                                    user.win === true ? "bar" : "bar bar-lose"
                                                                }
                                                                ></div>
                                                                <div className="gameResult">
                                                                    {user.win === true ? "승리" : "패배"}
                                                                </div>
                                                                <div className="gameLength">
                                                                    {" "}{getDuration(games.gameDuration)}{" "}
                                                                </div>
                                                            </div>
                                                            <div className="gameSettingInfo">
                                                                <div className="championImage">
                                                                    <img src={getChampImg()} className="championIcon"/>
                                                                </div>
                                                                <div className="summonerSpell">
                                                                    <div className="spell1">
                                                                        <img src={getSpellImg(user.summoner1Id)} className="summonerSpell1"/>
                                                                    </div>
                                                                    <div className="spell2">
                                                                        <img src={getSpellImg(user.summoner2Id)} className="summonerSpell2"/>
                                                                    </div>
                                                                </div>
                                                                <div className="runes">
                                                                    <div className="rune1">
                                                                        <img src={getRuneImg(mainRune)} className="runeImage1"/>
                                                                    </div>
                                                                    <div className="rune2">
                                                                        <img src={getRuneImg(subRune)} className="runeImage2" />
                                                                    </div>
                                                                </div>
                                                                <div className="championName">
                                                                    {user.championName}
                                                                </div>
                                                            </div>
                                                            <div className="kdaWrap">
                                                                <div className="kda">
                                                                <span className="kill">
                                                                    {user.kills}
                                                                </span>
                                                                    /
                                                                    <span className="death">
                                                                    {user.deaths}
                                                                </span>
                                                                    /
                                                                    <span className="assist">
                                                                    {user.assists}
                                                                </span>
                                                                </div>
                                                                <div className="kdaRatio">
                                                                <span className="kdaRatioSpan">
                                                                     {getGrade(
                                                                         user.kills,
                                                                         user.deaths,
                                                                         user.assists
                                                                     )}
                                                                </span>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="stats"
                                                                style={{
                                                                    display: "table-cell",
                                                                    height: "96px",
                                                                    verticalAlign: "middle",
                                                                }}
                                                            >
                                                                <div className="stateLevel">
                                                                    레벨{user.champLevel}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>)
                                        )}
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
