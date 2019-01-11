import React from "react";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
    this.state = { validInput: true };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit() {
    const name = this.state.name;
    const letters = /^[A-Öa-ö]+$/;
    if (name.length > 0 && name.match(letters)) {
      this.props.history.push("/lobby", { name });
    } else {
      this.setState({ validInput: false });
    }
  }

  render() {
    if (this.state.validInput === true) {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter name:
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    } else {
      return <h1>FEL INPUT! (Hur gör jag detta snyggare..)</h1>;
    }
  }
}
