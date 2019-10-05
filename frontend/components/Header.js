import React from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "antd";

export default class Header extends React.Component {
  render() {
    const routes = [
      {
        path: "/",
        breadcrumbName: "Home",
      },
    ];
    return (
      <PageHeader title="MigDB" breadcrumb={{ routes }} subTitle="MigDB" />
    );
  }
}
