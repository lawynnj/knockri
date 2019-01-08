import React from 'react';
import _ from 'lodash';
import { ListGroup, ListGroupItem } from 'reactstrap';

import Video from './Video';


const VideoList = props => {
  const { applications, questions, appId, width, onSaveClick } = props;

    // Show loading state
    if(_.isEmpty(applications.data) || _.isEmpty(questions.data))
      return <div>Loading</div>

    const application = applications.data[appId];
    const { videos } = application;

    const vidWidth = width < 1024 ? 400 : 600; // responsive video width

    // display list of videos
    return (
      <ListGroup> 
        { Object.keys(videos).map(key => {
            const { questionId, src } = videos[key];
            return (
              <ListGroupItem key={questionId + appId + src}>
                <Video 
                  question={questions.data[questionId].question} 
                  src={src}
                  width={vidWidth}
                  appId={appId}
                  questionId={questionId}
                  onSaveClick={onSaveClick}
                />
              </ListGroupItem>
            )
        })}     
      </ListGroup>
    );
}


export default VideoList;