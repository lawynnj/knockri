import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';

import { saveComment } from '../redux/modules/applications';
import VideoList from './VideoList';

class Candidate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWid: 0,
    };
  }

  componentDidMount() {
    this.setState({ windowWid: window.innerWidth});
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({ windowWid: window.innerWidth});
  }

  onSaveClick = (appId, questionId, comment) => {
    const { saveComment } = this.props;
    saveComment(appId, questionId, comment, () => alert('Saved!'), () => alert('Failed.'));
  }

  render() {
    const { candidates, match, applications, questions } = this.props;
    const { windowWid } = this.state;
    const id = match.params.id;
    const candidate = candidates.data[id];

    // show nothing if data is empty / not loaded
    if(candidates.isLoading)
      return <div>Loading</div>;

    if(_.isEmpty(candidates.data))
      return null;

    return (
      <div>
        <h2>
          Name: 
          {' '}
          {candidate.name}
        </h2>
        <div style={{ height: '90vh', overflow:'auto'}}>
          { /* display videos if the user has an application */}
          { 
            candidate.applicationId ? (
              <VideoList 
                appId={candidate.applicationId} 
                width={windowWid} 
                applications={applications} 
                questions={questions} 
                onSaveClick={this.onSaveClick}
              />
            ): 
              'The candidate does not have an application!' 
          }
        </div>
      </div>
    );
  }
}

Candidate.propTypes = {
  saveComment: PropTypes.func.isRequired,
  candidates: PropTypes.object.isRequired,
  questions: PropTypes.object.isRequired,
  applications: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default connect(null, { saveComment})(Candidate);
