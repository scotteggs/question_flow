import React, { PropTypes } from 'react';
import QuestionnaireItem from 'components/QuestionnaireItem';
import classNames from 'classnames/bind';
import styles from 'css/components/main-section';

const cx = classNames.bind(styles);

const QuestionnaireSection = ({onIncrement, onDecrement, onDestroy, topics}) => {
  const topicItems = topics.map((topic, key) => {
    return (
      <QuestionnaireItem index={key}
        id={topic.id}
        key={key}
        text={topic.text}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onDestroy={onDestroy} />);
    });

  return (
    <div className={cx('main-section')}>
      <h3 className={cx('header')}>Questionnaires</h3>
      <ul className={cx('list')}>{topicItems}</ul>
    </div>
  );
};

QuestionnaireSection.propTypes = {
  topics: PropTypes.array.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onDestroy: PropTypes.func.isRequired
};

export default QuestionnaireSection;
