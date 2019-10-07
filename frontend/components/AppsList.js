import React from "react";
import { List, Skeleton, Row, Col } from "antd";
import { Link } from "react-router-dom";

export default class AppsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      initLoading: true,
      loading: true,
    };
  }
  componentDidMount() {
    fetch("apps")
      .then(res => res.json())
      .then(data => {
        this.setState({
          items: data.apps,
          error: false,
          initLoading: false,
          loading: false,
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { initLoading, loading, items } = this.state;
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
                          <Link to={`/${item.label}/models/`}>{item.name}</Link>
                        }
                      />
                    </Skeleton>
                  </Col>
                  <Col span={8} offset={8}>
                    <Link to={`/${item.label}/models/`}>
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
