import React from "react";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      invalidInput: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const name = this.state.name;
    const letters = /^[A-Öa-ö]+$/;
    if (name.length >= 3 && name.match(letters)) {
      this.props.history.push("/lobby", { name });
    } else {
      this.setState({
        invalidInput:
          "Please enter a name with at least 3 alphabetic characters!"
      });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter a name:
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div className="invalidInput">{this.state.invalidInput}</div>
      </div>
    );
  }
}
