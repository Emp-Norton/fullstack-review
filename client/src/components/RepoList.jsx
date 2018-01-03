import React from 'react';
import RepoEntry from './RepoEntry.jsx'

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {props.repos.map(repoEntry => 
    	<RepoEntry name={repoEntry.name} description={repoEntry.description} url={repoEntry.url} owner={repoEntry.owner}/>
    )}
  </div>
)

export default RepoList;