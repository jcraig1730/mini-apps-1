class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "home",
      name: "",
      email: "",
      password: "",
      addressL1: "",
      addressL2: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
      creditcard: "",
      exp: "",
      cvv: "",
      billingZip: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    switch (this.state.currentPage) {
      case "home":
        this.setState({ currentPage: "a" });
        break;
      case "a":
        this.setState({ currentPage: "b" });
        break;
      case "b":
        this.setState({ currentPage: "c" });
        break;
      case "c":
        this.setState({ currentPage: "verify" });
        break;
      case "verify":
        fetch("http://127.0.0.1:3000", {
          method: "POST",
          body: JSON.stringify(this.state),
          header: { "Content-Type": "application/json" }
        })
          .then(res => console.log(res))
          .catch(err => console.log(err));
        this.setState({ currentPage: "home" });
    }
  }

  handleChange(e) {
    console.log(e);
    this.setState({
      [e.target.name]: (this.state[e.target.name] = e.target.value)
    });
    console.log(e.target.value);
  }

  render() {
    let page;
    let navButton;
    if (this.state.currentPage === "home") {
      navButton = <button onClick={this.handleClick}>Start</button>;
    } else if (this.state.currentPage === "verify") {
      navButton = <button onClick={this.handleClick}>Purchase</button>;
    } else {
      navButton = <button onClick={this.handleClick}>Next</button>;
    }

    if (this.state.currentPage === "home") {
      page = <button>Begin Checkout</button>;
    }

    if (this.state.currentPage === "home") {
      page = <p>Click to Begin Checkout</p>;
    }

    if (this.state.currentPage === "a") {
      page = (
        <form onSubmit={this.handleSubmit}>
          Name:{" "}
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
          />
          Email:{" "}
          <input
            type="text"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
          />
          Password:{" "}
          <input
            type="password"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
          />
        </form>
      );
    }

    if (this.state.currentPage === "b") {
      page = (
        <form onSubmit={this.handleSubmit}>
          Address (line 1):{" "}
          <input
            type="text"
            name="addressL1"
            onChange={this.handleChange}
            value={this.state.addressL1}
          />
          Address (line 2):{" "}
          <input
            type="text"
            name="addressL2"
            onChange={this.handleChange}
            value={this.state.addressL2}
          />
          City:{" "}
          <input
            type="text"
            name="city"
            onChange={this.handleChange}
            value={this.state.city}
          />
          State:{" "}
          <input
            type="text"
            name="state"
            onChange={this.handleChange}
            value={this.state.state}
          />
          Zip:{" "}
          <input
            type="text"
            name="zip"
            onChange={this.handleChange}
            value={this.state.zip}
          />
          Phone:{" "}
          <input
            type="text"
            name="phone"
            onChange={this.handleChange}
            value={this.state.phone}
          />
        </form>
      );
    }

    if (this.state.currentPage === "c") {
      page = (
        <form onSubmit={this.handleSubmit}>
          Credit Card Number:{" "}
          <input
            type="text"
            name="creditcard"
            onChange={this.handleChange}
            value={this.state.creditcard}
          />
          Expiration:{" "}
          <input
            type="text"
            name="exp"
            onChange={this.handleChange}
            value={this.state.exp}
          />
          CVV:{" "}
          <input
            type="text"
            name="cvv"
            onChange={this.handleChange}
            value={this.state.cvv}
          />
          Billing Zip:{" "}
          <input
            type="text"
            name="billingZip"
            onChange={this.handleChange}
            value={this.state.billingZip}
          />
        </form>
      );
    }

    if (this.state.currentPage === "verify") {
      page = (
        <ul>
          <li>Name: {this.state.name}</li>
          <li>Email: {this.state.email}</li>
          <li>
            Address: {this.state.addressL1} {this.state.addressL2}
          </li>
          <li>City: {this.state.city}</li>
          <li>State: {this.state.state}</li>
          <li>Zip: {this.state.zip}</li>
          <li>Phone: {this.state.phone}</li>
        </ul>
      );
    }

    return (
      <div>
        {page}
        {navButton}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
