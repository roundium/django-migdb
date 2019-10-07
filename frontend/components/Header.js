import React from "react";
import { Avatar } from "antd";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Link to="/">
      <Avatar
        size="large"
        alt="Migdb"
        title="Migdb"
        shape="circle"
        src="/static/migdb/img/migdb_logo.svg"
      />
    </Link>
  );
};

export default Header;
