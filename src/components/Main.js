import React, { useState } from "react";
import axios from "axios";

import { Col, Row } from "antd";
import SatSetting from "./SatSetting";
import SatelliteList from "./SatelliteList";
import WorldMap from "./WorldMap";

import { NEARBY_SATELLITE, SAT_API_KEY, STARLINK_CATEGORY } from "../constants";

const Main = () => {
  const [satInfo, setSatInfo] = useState(null);
  const [satList, setSatList] = useState(null);
  const [setting, setSetting] = useState(null);
  const [isLoadingList, setIsLoadingList] = useState(false);

  const showNearbySatellite = (setting) => {
    setSetting(setting);
    fetchSatellite(setting);
  };

  const fetchSatellite = async (setting) => {
    const { latitude, longitude, elevation, altitude } = setting;
    const url = `/api/${NEARBY_SATELLITE}/${latitude}/${longitude}/${elevation}/${altitude}/${STARLINK_CATEGORY}/&apiKey=${SAT_API_KEY}`;

    setIsLoadingList(true);
    try {
      const response = await axios.get(url);
      // console.log(response.data);
      setSatInfo(response.data);
    } catch (error) {
      console.log("err in fetch satellite -> ", error);
    } finally {
      setIsLoadingList(false);
    }
  };

  const showMap = (selected) => {
    setSatList([...selected]);
  };

  return (
    <Row className="main">
      <Col span={8}>
        <SatSetting onShow={showNearbySatellite} />
        <SatelliteList
          isLoad={isLoadingList}
          satInfo={satInfo}
          onShowMap={showMap}
        />
      </Col>
      <Col span={16} className="right-side">
        <WorldMap satData={satList} observerData={setting} />
      </Col>
    </Row>
  );
};

export default Main;
