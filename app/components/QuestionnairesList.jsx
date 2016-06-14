import React, { PropTypes } from 'react';
import QuestionnaireItem from 'components/QuestionnaireItem';
import classNames from 'classnames/bind';
import styles from 'css/components/main-section';

const cx = classNames.bind(styles);

const QuestionnaireList = ({topics}) => {
  const topicItems = topics.map((topic, key) => {
    return (
      <QuestionnaireItem
        index={key}
        id={topic._id}
        key={key}
        title={topic.title}
        questionnaireType={topic.questionnaireType} />);
    });

  return (
    <div className={cx('main-section')}>
      <h3 className={cx('header')}>Select a Questionnaire to Fill Out</h3>
      <ul className={cx('list')}>{topicItems}</ul>
    </div>
  );
};

QuestionnaireList.propTypes = {
  topics: PropTypes.array.isRequired,
};

export default QuestionnaireList;
