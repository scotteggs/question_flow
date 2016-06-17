import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
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
        <tr key={this.props.id}>
          <td>{this.props.title}</td>
          <td>{this.props.description}</td>
          <td>
            <Button
            bsStyle="danger"
            className={
            cx('button', 'destroy')
            } onClick={this.onDestroyClick}>Delete</Button>
          </td>
          <td>
            <ul className={cx('list')}>{questions}</ul>
          </td>
        </tr>
    );
  }
}

TopicItem.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onDestroy: PropTypes.func.isRequired
};
