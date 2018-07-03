import React from 'react';
import axios from 'axios';

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      input: this.props.response[1]
    }
    this.inputChange = this.inputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  inputChange(input) {
    this.setState({
      input: input.target.value
    });
  }

  onSubmit(){
    console.log(this.props.response[0]);
    let changes = this.props.response[0].reduce((update, word) => {
      update[word] = this.state.input;
      return update;
    }, {})
    return axios.post('/update', changes)
    .then((res) => {
      console.log('update sent');
    });
  }

  render () {
    return (
      <div>
        <h4>{this.props.question}</h4>
        <div>
          Keywords: {this.props.response[0]}
        </div>
        <div>
          Response: 
          <input defaultValue = {this.props.response[1]} onChange={this.inputChange}>
          </input>
          <button onClick={this.onSubmit}>
            submit
          </button>
        </div>
      </div>
    )
  }
}

export default ListItem;