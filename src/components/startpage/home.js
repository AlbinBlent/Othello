import React from 'react'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value});
      console.log(this.state.value)
    }

    handleSubmit() {
      const letters = /^[A-Öa-ö]+$/;
      if (this.state.value.length > 0 && this.state.value.match(letters)) {
        this.props.history.push('/Board');
      } else {
        alert('You did not enter a name! Only letters allowed.');
      }
    }

    render() {
      return(
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }