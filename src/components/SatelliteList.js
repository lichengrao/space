import React, { useState } from "react";
import { Button, Spin, List, Avatar, Checkbox } from "antd";

import satellite from "../assets/images/satellite.svg";

const SatelliteList = (props) => {
  const [selected, setSelected] = useState([]);

  const showMap = () => {
    props.onShowMap(selected);
  };

  const onChange = (e) => {
    const { dataInfo, checked } = e.target;
    const list = addOrRemove(dataInfo, checked, selected);
    setSelected(list);
  };

  const addOrRemove = (item, status, list) => {
    const found = list.some((entry) => entry.satid === item.satid);

    if (status && !found) {
      list.push(item);
    }

    if (!status && found) {
      list = list.filter((entry) => entry.satid !== item.satid);
    }

    return list;
  };

  const { satInfo, isLoad } = props;
  const satList = satInfo ? satInfo.above : [];

  return (
    <div className="sat-list-box">
      <Button
        className="sat-list-btn"
        size="large"
        disabled={selected.length === 0}
        onClick={showMap}
      >
        Track on the map
      </Button>
      <hr />
      {isLoad ? (
        <div className="spin-box">
          <Spin tip="Loading..." size="large" />
        </div>
      ) : (
        <List
          className="sat-list"
          itemLayout="horizontal"
          dataSource={satList}
          renderItem={(item) => (
            <List.Item
              actions={[<Checkbox dataInfo={item} onChange={onChange} />]}
            >
              <List.Item.Meta
                avatar={<Avatar src={satellite} size="large" alt="satellite" />}
                title={<p>{item.satname}</p>}
                description={`Launch Date: ${item.launchDate}`}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default SatelliteList;
