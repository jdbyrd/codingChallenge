import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/List.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      input: '',
      response: {'': [[''], ''] },
      final: ''
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
    return axios.post('/input', {input: this.state.input})
    .then((res) => {
      this.setState({
        response: res.data
      });
      console.log(this.state.response);
    });
  }

  render () {
    return (
    <div>
      <h1>Turnkey Coding Challenge</h1>
      <h3>Enter your question</h3>
      <input onChange={this.inputChange}>
      </input>
      <button onClick={this.onSubmit}>
        submit
      </button>
      <List response={this.state.response} />
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));