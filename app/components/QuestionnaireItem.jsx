import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/topic-item'; // CBTT

const cx = classNames.bind(styles);

export default class QuestionnaireItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className={cx('topic-item')} key={this.props.id}>
        <span className={cx('topic')}>{this.props.text}</span>
      </li>
    );
  }
}

QuestionnaireItem.propTypes = {
  // new types
  title: PropTypes.string,
  questionnaireType: PropTypes.string,
  creator: PropTypes.string,
  questions: PropTypes.array,
  // existingtypes
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};
