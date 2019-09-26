import React from "react";
import Item from "./Item";


export default class AppsList extends React.Component {
  constructor(props){
    super();
    this.state = {
      items: [],
    }
  }
  componentDidMount(){
    fetch("apps")
    .then(res => res.json())
    .then((data) => {this.setState({items: data.apps, error: false})})
    .catch((err) => console.log(err))
  }
  render() {
    let apps = this.state.items.map((app, i) => <Item itemType="app" item={app} key={i} />);
    return (
      <main>
        <div className="container-fluid">
          <section>
            <div className="row">
              <div className="col-lg-4 col-md-12 mb-lg-0 mb-4"></div>
              <div className="col-lg-4 col-md-12 mb-md-0 mb-4">
                <div className="card">
                  <div className="card-header white-text primary-color">
                    Choose an App
                  </div>
                  <div className="card-body text-center px-4 mb-3">
                    <div className="list-group list-panel">
                        { apps }
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 mb-lg-0 mb-4"></div>
            </div>
          </section>
        </div>
      </main>
    );
  }
}
