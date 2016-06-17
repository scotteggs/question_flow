import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/topic-item';

const cx = classNames.bind(styles);

export default class QuestionItem extends Component {

  constructor(props) {
    super(props);
    this.onDestroyClick = this.onDestroyClick.bind(this);
  }

  onDestroyClick() {
    const { id, index, onDestroy} = this.props;
    onDestroy(id, index);
  }


  render() {
    return (
      <li className={cx('topic-item')} key={this.props.id}>
        <span className={cx('topic')}>{this.props.question}</span>
        <span className={cx('topic')}>{this.props.questionType}</span>
        <br /><br />
      </li>
    );
  }
}

QuestionItem.propTypes = {
  index: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  questionType: PropTypes.string.isRequired
};
