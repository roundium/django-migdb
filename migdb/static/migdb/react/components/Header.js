import React from "react";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-lg scrolling-navbar double-nav">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">
              <Link title="MigDB" to="/migdb/">
                <img
                  className="logo"
                  src="/static/migdb/img/migdb_logo.svg"
                  alt="migDB"
                />
              </Link>
            </li>
          </ol>
        </nav>
      </header>
    );
  }
}
