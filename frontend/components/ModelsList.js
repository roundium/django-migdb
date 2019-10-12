import React from "react";
// import Item from "./Item";
import { List, Skeleton, Row, Col } from "antd";
import { Link } from "react-router-dom";

export default class ModelsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      initLoading: true,
      loading: true,
    };
  }
  componentDidMount() {
    fetch("")
      .then(res => res.json())
      .then(data => {
        this.setState({
          app_name: data.app_name,
          new_app_name: data.new_app_name,
          items: data.models,
          error: false,
          initLoading: false,
          loading: false,
        });
        document.title = `Migdb - ${data.app_name} -> models`;
      })
      .catch(err => console.log(err));
  }
  render() {
    const { app_name, initLoading, loading, items } = this.state;
    return (
      <Row>
        <Col span={12} offset={6}>
          <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            dataSource={items}
            renderItem={item => (
              <Row>
                <List.Item>
                  <Col span={8} align={"middle"}>
                    <Skeleton title={false} loading={loading} active>
                      <List.Item.Meta
                        title={
                          <Link to={`/${app_name}/${item}/fields/`}>
                            {item}
                          </Link>
                        }
                      />
                    </Skeleton>
                  </Col>
                  <Col span={8} offset={8}>
                    <Link to={`/${app_name}/${item}/fields/`}>
                      <i
                        className="fas fa-wrench ml-auto"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Click to show models"
                      ></i>
                    </Link>
                  </Col>
                </List.Item>
              </Row>
            )}
          />
        </Col>
      </Row>
    );
  }
}
