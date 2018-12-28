import React from 'react'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({name: event.target.value});
    }

    handleSubmit() {
      const name = this.state.name;
      const letters = /^[A-Öa-ö]+$/;
      if (name.length > 0 && name.match(letters)) {
        this.props.history.push('/lobby', { name});
      } else {
        alert('You did not enter a name! Only letters allowed.');
      }
    }

    render() {
      return(
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter name:
            <input type="text" value={this.state.name} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }