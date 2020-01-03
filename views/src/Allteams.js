import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class Allteams extends Component {
  constructor() {
    super();
    this.state = {allUrl: [],
                  isLoaded: false};
  };

  loadUrl = () => {
    axios.get(`http://localhost:3002/api/getVideoUrl`)
      .then(response => this.setState({ 
        allUrl: response.data.reverse(),
        isLoaded : true}));
  };

  deleteUrl = (id) => {
    if (window.confirm('Are you sure you wish to delete this video url?')) {
      axios.delete(`http://localhost:3002/api/deleteVideo/${id}`)
      .then(window.location.reload()); //this line is horrible
    } else return;
  };

  modifyUrl = (id) => {
    const urlToModify = this.state.allUrl.filter(item => item.id === id)[0].TeamName;
    const newName = prompt("What's the new video url ?", urlToModify);
    if (newName)
      axios.put(`http://localhost:3002/api/modifyVideo/${id}`,{ newName })
      .then(window.location.reload());
  };

  componentDidMount() {
    this.loadUrl();
  };

  render() {
    const { allUrl , isLoaded } = this.state;
    if (!isLoaded) return <div>Loading...</div>
    return (
  <div class="list-group">
  {allUrl.map((item) => 
  <a key={item.id} href="#" class="list-group-item list-group-item-action">{item.video_url} <span class="float-right">
              <button class="btn btn-light mr-3" onClick={() => this.deleteUrl(item.id)}>Delete</button>
              <button class="btn btn-light" onClick={() => this.modifyUrl(item.id)}>Modify</button></span></a>
              )}
  </div>
    );
  };
};

export default Allteams;