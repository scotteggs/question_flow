import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from 'css/components/topic-item';
import { createTopic } from 'actions/topics';

const cx = classNames.bind(styles);

class ViewItem extends Component {


  constructor(props) {
    super(props);
    this.handleSubmission = this.handleSubmission.bind(this);
  }

  handleSubmission(event) {
    event.preventDefault();
    const { createTopic } = this.props;
    const type = 'submission';
    const title = this.props.title;
    const description = this.props.description;
    const questions = [
      {
        question: this.props.questions[0].question,
        questionType: this.props.questions[0].questionType,
        response: ReactDOM.findDOMNode(this.refs.q1).value
      },
      {
        question: this.props.questions[1].question,
        questionType: this.props.questions[1].questionType,
        response: ReactDOM.findDOMNode(this.refs.q2).value
      }
    ];

    createTopic({ title, description, questions, type});
  }


  render() {
    const { isWaiting } = this.props.user;
    return (
      <div>
        <li className={cx('topic-item')} key={this.props.id}>
          <span className={cx('topic')}>{this.props.title}</span>
          <div>
            <p>{this.props.questions[0].question}</p>
            <p>{this.props.questions[0].response}</p>
          </div>
          <div>
            <p>{this.props.questions[1].question}</p>
            <p>{this.props.questions[1].response}</p>
          </div>
        </li>
      </div>
    );
  }
}

ViewItem.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired
};

function mapStateToProps({user}) {
  return {
    user
  };
}


export default connect(mapStateToProps, { createTopic })(ViewItem);
