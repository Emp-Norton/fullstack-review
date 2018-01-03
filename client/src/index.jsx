import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
// import Repo from '../database/index.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }

  componentDidMount(){
    var app = this;
    $.get('/repos', function(data){
        console.log('got repos')
        app.setState({repos: data})
    })
  }

  search (term) {
    console.log(`searching for ${term}`);
    $.ajax({
      url: '/repos',
      type: 'POST',
      data: { 
        uname: `${term}`
      },
      success: function(data){
        console.log(`${data} was processed`);
      },
      failure: function(err){
        console.log('failed ', err)
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));