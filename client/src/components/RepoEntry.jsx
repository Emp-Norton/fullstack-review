import React from 'react';

const RepoEntry = (props) => (


<div style={{backgroundColor: 'lightBlue', border: '1px solid grey', borderRadius: '4px'}}> 
	<p><b> {props.name} </b></p>
	<p> {props.url} </p>
	<p> {props.owner} </p>
	<p> {props.description} </p>

</div>

)

export default RepoEntry;