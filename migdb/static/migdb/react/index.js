import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import ItemList from "./components/ItemList";

class App extends React.Component {
  render(){
    return (
      <div>
        <Header />
        <ItemList itemType="apps" />
        <Footer />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('react')
);
