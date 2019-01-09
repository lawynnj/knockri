import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
  }

  updateComment = (e) => {
    this.setState({
      comment: e.target.value
    });
  }

  render() {
    const { question, appId, questionId, width, src, onSaveClick } = this.props;
    const { comment } = this.state;
    
    return (
      <div style={{ paddingTop: 20, paddingBotom: 40 }}>
        {/* Question and Video */}
        <h4>{ question }</h4>
        <video 
          width={width}
          style={{ borderRadius: 10 }} 
          controls
        >
          <source 
            src={src} 
            type="video/mp4"
          />
          
          <track default kind="captions" />
        </video>

        {/* Comment Section */}
        <div>
          <input 
            style={{ width: '70%', padding: 10, borderRadius: 5 }}
            onChange={this.updateComment} 
            value={comment} 
            placeholder="Comment here..."
          /> 
          <Button 
            color="primary" 
            style={{ display: 'block', marginTop: 10 }}
            onClick={() => onSaveClick(appId, questionId, comment)} 
          >
            Save Comment
          </Button>      
        </div>
      </div>
    );
  }
}

Video.propTypes = {
  question: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  appId: PropTypes.number.isRequired,
  questionId: PropTypes.number.isRequired,
  onSaveClick: PropTypes.func.isRequired,
};

export default Video;