import React, { Component } from "react";
import { connect } from "react-redux";
import { createLoginAndContinue } from "../network/action";

class Login extends Component {
  state = {
    data: {}
  };
  onChange = e => {
    const target = e.target;
    const { name, value } = target;
    this.setState({
      data: { ...this.state.data, [name]: value }
    });
  };

  onSignIn = () => {
    const { data } = this.state;
    if (data.email !== "" && data.password !== "") {
      this.props.createLoginAndContinue(data, token => {
        if (token !== "") {
          sessionStorage.setItem("Authorization", token);
          this.props.history.push("/employees");
        }
      });
    }
  };

  render() {
    const { errors = {} } = this.props;
    const { data = {} } = this.state;
    let enableLogin = false;
    if (data.email && data.password) {
      enableLogin = true;
    }
    return (
      <div
        className="container"
        style={{
          padding: "20px",
          margin: "50px auto",
          width: "400px",
          border: "1px solid #ccc",
          background: "#f6f6f6",
          boxShadow: "0px 0px 4px #ccc"
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <div className="input-label" style={{ marginBottom: "15px" }}>
            Email
          </div>
          <div className="">
            {" "}
            <input
              className="form-control"
              name="email"
              onChange={this.onChange}
              type="email"
              placeholder="Email"
            />
          </div>
          {errors.email && <div className="has-error">{errors.email}</div>}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <div className="input-label" style={{ marginBottom: "15px" }}>
            Password
          </div>
          <div className="">
            {" "}
            <input
              className="form-control"
              name="password"
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
          </div>
          {errors.password && (
            <div className="has-error">{errors.password}</div>
          )}
        </div>

        <button
          className={enableLogin ? "btn btn-primary" : "btn disabled"}
          style={{ width: "100%" }}
          onClick={this.onSignIn}
        >
          LOGIN
        </button>
      </div>
    );
  }
}

const reducerState = state => {
  return {
    errors: state.entityErrors
  };
};

const dispatchToProps = {
  createLoginAndContinue
};

export default connect(reducerState, dispatchToProps)(Login);
