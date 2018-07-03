import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    {Object.keys(props.response).map(key => <ListItem question ={key} response = {props.response[key]} />)}
  </div>
)

export default List;