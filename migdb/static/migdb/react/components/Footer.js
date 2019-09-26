import React from "react";

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="page-footer pt-0 rgba-stylish-light">
        <div className="footer-copyright py-3 text-center">
          <div className="container-fluid">
            Developed in{" "}
            <a href="https://www.roundium.com/" target="_blank">
              {" "}
              Roundium{" "}
            </a>{" "}
            with
            <i className="fa fa-heart red-text"></i>
          </div>
        </div>
      </footer>
    );
  }
}
