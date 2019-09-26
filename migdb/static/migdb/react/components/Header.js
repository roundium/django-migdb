import React from "react";

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-lg scrolling-navbar double-nav">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active">
              <a title="MigDB" href="/migdb">
                <img
                  className="logo"
                  src="/static/migdb/img/migdb_logo.svg"
                  alt="migDB"
                />
              </a>
            </li>
          </ol>
        </nav>
      </header>
    );
  }
}
