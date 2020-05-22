import React, { useState, useEffect } from "react";
import axios from "axios";
import { beli } from "./../actioncreators/cart";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./item.css";
import Cartt from "./../cart/Test";
import NumberFormat from "react-number-format";
const Test = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.juliaveronica.com/item/show/", {
        headers: {
          // x-access-token (backend), jwtToken(key application localstorage(chrome)).
          "x-access-token": localStorage.getItem("jwtToken"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
      // .then((res) => res.json())
      // .then(json=>{
      //   console.log(this.state.item)
      //   this.setState({
      //     isLoaded: true,
      //     items: json
        // })
  }, []);
  // const testimage = "https://i.imgur.com/tq4h23x.jpg";
  const URL = "http://3.136.102.205/";
  // const URL = "https://api.juliaveronica.com/"
  console.log(data);
  const showData = data.map((item, index) => {
    return(
    <div className="col-lg-3 col-md-6 mb-4">
      <div className="card" key={index}>
        <div className="box">
          <img
            src={`${URL}${item.imageUrl}`}
            // src={require(`https://api.juliaveronica.com/${item.imageUrl}`)}
            alt={item.name}
            className="card-img-top"
            // style={{ height: "200px", width: "100%" }}
          />
        </div>
        <div className="card-body pt-0">
          <h5>{item.name}</h5>
          <p>Remaining Stock : {item.quantity}</p>
          <p>
            <NumberFormat
              value={item.price}
              displayType="text"
              thousandSeparator={true}
              prefix={"Rp "}
            />
          </p>
        </div>
        <div className="card-footer d-flex flex-row justify-content-center">
          <Link className="btn btn-primary mr-4" to={`/item/${item.id}`}>
            Detail
          </Link>
          <Cartt key={item.id} cart={item} />
        </div>
      </div>
    </div>
  )});
  // return <div>{showData}</div>;
  return (
    <div className="container pt-4 mb-4">
      <h3 className="text-center">Our Items</h3>
      <hr className="hr mb-4" />
      <div className="row">{showData}</div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    beli,
  };
};

export default connect(null, mapDispatchToProps)(Test);
