import React, { Component } from 'react';
import axios from 'axios';
import Allteams from './Allteams';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {videoUrl: ''};
  };

  handleChangeTxt = (e) => {
    this.setState({videoUrl: e.target.value});
    
  };

  submitvideoUrl = (e) => {
    console.log(this.state)
    e.preventDefault();
    if (!this.state.videoUrl) alert('video url is empty');
    else {
      axios.post('http://localhost:3002/api/CreateUrl', this.state)
        .then(this.setState({videoUrl: ''}))
        .then(window.location.reload()); //this line is horrible
    };
  };

  render() {
    return (
      <div class="container">
        <div class="row mt-5">
            <div class="col-md-4">
                <div class="card">
                  <div class="card-body">
                    <form onSubmit={this.submitvideoUrl}>
                    <div class="mb-3 mt-5">
                    <span>Insert video link (URL)</span>
                    <input class="form-control"
                      type="text"
                      name="videoUrl"
                      placeholder="e.g. https://www.youtube.com/watch?v=NWxISwEBU0U"
                      value={this.state.videoUrl}
                      onChange={this.handleChangeTxt}
                    /></div>
                   <div class="mb-5">
                    <button type="submit" class="btn btn-primary">Insert</button></div>
                  </form>
                  </div>
                </div>
            </div>
            <div class="col-md-8">
              <div class="card">
                <div class="card-body">
                  <Allteams />
                </div>
              </div>
            </div>
          </div>
        
      </div>
    );
  };
};

export default App;