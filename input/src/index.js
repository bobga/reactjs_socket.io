import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import io from 'socket.io-client'
const socket = io('http://localhost:8000')

let count = 0;

class Products extends React.Component {

  constructor(props) {
    super(props);

    //  this.state.products = [];
    this.state = {};
    this.state.filterText = "";
    this.state.products = [
    ];

    this.handleInterval = this.handleInterval.bind(this);
    this.handleInterval();

  }

componentDidMount(){
    setInterval(this.handleInterval.bind(this), 10000);
}
   handleInterval(){
      count++;
      var self = this;
      
      if(count>1){
        var products = self.state.products;
        var length = products.length;
        var lproduct = products[length-1];
        console.log(lproduct);
        socket.emit('tabledata', lproduct);
      }


      var date = new Date;


      var minutes = date.getMinutes();
      var hour = date.getHours();

      var ftime = hour+":"+minutes;


      var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
      var product = {
        id: id,
        no: count,
        date: ftime,
        lvalue: 0,
        vvalue: 0,

      }

      self.state.products.push(product);
      self.setState(self.state.products);




    }


  handleUserInput(filterText) {
    this.setState({filterText: filterText});
  };
  handleRowDel(product) {
    var index = this.state.products.indexOf(product);
    this.state.products.splice(index, 1);
    this.setState(this.state.products);
  };

  handleAddEvent(evt) {

    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var product = {
      id: id,
      no: 3,
      date: "05:08",
      lvalue: 0,
      vvalue: 0,

    }
    this.state.products.push(product);
    this.setState(this.state.products);

  }

  handleProductTable(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
var products = this.state.products.slice();
  var newProducts = products.map(function(product) {

    for (var key in product) {
      if (key == item.name && product.id == item.id) {
        product[key] = item.value;

      }
    }
    return product;
  });
    this.setState({products:newProducts});
  };
  render() {




    return (

      <div>
        <ProductTable onProductTableUpdate={this.handleProductTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} products={this.state.products} filterText={this.state.filterText}/>
      </div>
    );

  }

}
class SearchBar extends React.Component {
  handleChange() {
    this.props.onUserInput(this.refs.filterTextInput.value);
  }
  render() {
    return (
      <div>

        <input type="text" placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)}/>

      </div>

    );
  }

}

class ProductTable extends React.Component {

  render() {
    const tablestyle = {
      width: "auto",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop:"5%",
      borderWidth: 3,
      borderStyle:"solid", 
      borderColor:"#111111",
      borderCollapse : "collapse"
    };

    const thstyle = {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "rgb(100,100,100)",
        textAlign: "left",
        padding: 8,
        textAlign:"center"
    };



    
    var onProductTableUpdate = this.props.onProductTableUpdate;
    var rowDel = this.props.onRowDel;
    var filterText = this.props.filterText;
    var rownum=0;
    var product = this.props.products.map(function(product) {
      rownum++;
      if (product.date.indexOf(filterText) === -1) {
        return;
      }
      return (<ProductRow rownum={rownum} onProductTableUpdate={onProductTableUpdate} product={product} onDelEvent={rowDel.bind(this)} key={product.id}/>)
    });
    return (
      <div>


     
        <table class="main_table" style={tablestyle} className="table table-bordered">
          <thead>
            <tr>
              <th style={thstyle}>#</th>
              <th style={thstyle}>Date</th>  
              <th style={thstyle}>L</th>
              <th style={thstyle}>V</th>
            </tr>
          </thead>

          <tbody>

            {product}

          </tbody>

        </table>
      </div>
    );

  }

}

class ProductRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.product);

  }
  render() {
    const evenrowstyle = {
        backgroundColor: "#e2e2e2"
    };
    const rownum = this.props.rownum;
    return (
      <tr className="eachRow" style={rownum%2?evenrowstyle:null}>
        <EditableCell rownum={rownum} onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          "type": "no",
          value: this.props.product.no,
          id: this.props.product.id
        }}/>
        <EditableCell rownum={rownum} onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "date",
          value: this.props.product.date,
          id: this.props.product.id
        }}/>
        <EditableCell rownum={rownum} onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "lvalue",
          value: this.props.product.lvalue,
          id: this.props.product.id
        }}/>
        <EditableCell rownum={rownum} onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "vvalue",
          value: this.props.product.vvalue,
          id: this.props.product.id
        }}/>

      </tr>
    );

  }

}
class EditableCell extends React.Component {

  render() {
    const rownum = this.props.rownum;
    const thstyle = {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "rgb(100,100,100)",
        textAlign: "left",
  
        lineHeight:"25px"
    };
    const inputstyle ={
      backgroundColor: "#e2e2e2",
      borderWidth:0,
      width:150,
      border:"none",
      lineHeight:"25px",
      textAlign:"center",
      lineHeight:"25px"
    }

    const eveninputstyle ={
      borderWidth:0,
      width:150,
      border:"none",
      lineHeight:"25px",
      textAlign:"center"
    }
    return (
      <td style={thstyle}>
        <input style={rownum%2?inputstyle:eveninputstyle} type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onProductTableUpdate}/>
      </td>
    );

  }

}
ReactDOM.render( < Products /> , document.getElementById('root'));

serviceWorker.unregister();
