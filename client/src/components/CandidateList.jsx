        
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { ListGroup, ListGroupItem } from 'reactstrap';

const CandidateList = ({ candidates }) =>{
  if(candidates.isLoading)
    return <div>Loading...</div>;

  if(_.isEmpty(candidates.data))
    return <div>There are no candidates</div>;
  
  return(
    <div>
      <h1>Candidates</h1>
      <p>Select a candidate:</p>
      <ListGroup>
        {Object.keys(candidates.data).map(key => {
          const person = candidates.data[key];
          return <ListGroupItem key={person.id}><Link to={`/candidate/${person.id}`}>{person.name}</Link></ListGroupItem>;
        })}
      </ListGroup>
    </div>
  );
};

CandidateList.propTypes = {
  candidates: PropTypes.object.isRequired,
};

export default CandidateList;