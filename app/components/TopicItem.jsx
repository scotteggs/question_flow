import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import QuestionItem from 'components/QuestionItem';
import styles from 'css/components/topic-item';

const cx = classNames.bind(styles);

export default class TopicItem extends Component {

  constructor(props) {
    super(props);
    this.onDestroyClick = this.onDestroyClick.bind(this);
  }

  onDestroyClick() {
    const { id, index, onDestroy} = this.props;
    onDestroy(id, index);
  }


  render() {
    const questions = this.props.questions.map((question, key) => {
      return (
        <QuestionItem
          key={key}
          index={key}
          question={question.question}
          questionType={question.questionType} />);
    });
    return (
      <li className={cx('topic-item')} key={this.props.id}>
        <span className={cx('topic')}>{this.props.title}</span>
        <span className={cx('topic')}>{this.props.questionnaireType}</span>
        <button
          className={
          cx('button', 'destroy')
        } onClick={this.onDestroyClick}>{String.fromCharCode(215)}</button>
        <ul className={cx('list')}>{questions}</ul>
      </li>
    );
  }
}

TopicItem.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onDestroy: PropTypes.func.isRequired
};
