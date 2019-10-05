import React from "react";
import { PageHeader } from "antd";

const Header = () => {
  const routes = [
    {
      path: "/",
      breadcrumbName: "Home",
    },
  ];
  return <PageHeader title="MigDB" breadcrumb={{ routes }} subTitle="MigDB" />;
};

export default Header;
