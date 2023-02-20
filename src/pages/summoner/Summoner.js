import {api_key} from "./api_key";
import React, {useState, useEffect} from "react";
import NavigationBar from "../../addition/navigation-bar";
import Descript from "../../addition/Descript";
import styled from "styled-components";
import "../summoner/Summoner.css";
import {withRouter} from "react-router-dom";
import {Link} from "react-router-dom";
import axios from "axios";

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
    const getDetailDto = () => {

    };

    const updateInfo = () => {

    };

    const changeName = () => {

    };

    useEffect(() => {
        axios.get("/riot/lol/summoner/v4/summoners/by-name/" + `${summoner}` +'?api_key=' + `${api_key}`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
                console.log(summoner);
            })
    })

    return (
        <>
            <NavigationBar changeName={changeName}/>
            <div>
                <div className="header">
                    <div className="face">
                        <div className="profileIcon">
                            <div className="borderImage"></div>
                            <img
                                className="profileImage"
                            />
                        </div>
                    </div>
                    <div className="profile">
                        <div className="information">
                            <div className="rank">
                                <div className="ladderRank">
                                    랭킹{" "}
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
