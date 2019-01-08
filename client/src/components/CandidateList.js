        
import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { ListGroup, ListGroupItem } from 'reactstrap';

const CandidateList = ({ candidates }) =>{
  if(_.isEmpty(candidates.data))
    return null;
  
  return(
    <div>
      <h1>Candidates</h1>
      <p>Select a candidate:</p>
      <ListGroup>
        {Object.keys(candidates.data).map(key => {
          const person = candidates.data[key];
          return <ListGroupItem key={person.id}><Link to={`/candidate/${person.id}`}>{person.name}</Link></ListGroupItem>
        })}
      </ListGroup>
    </div>
    )
}

CandidateList.propTypes = {
  candidates: PropTypes.object,
}

export default CandidateList;