import React, { PropTypes } from 'react';
import ViewItem from 'components/ViewItem';
import classNames from 'classnames/bind';
import styles from 'css/components/main-section';

const cx = classNames.bind(styles);

const QuestionnaireList = ({topics}) => {
  const topicItems = topics.map((topic, key) => {
    return (
      <ViewItem
        index={key}
        id={topic._id}
        key={key}
        title={topic.title}
        questionnaireType={topic.questionnaireType}
        questions={topic.questions} />);
    });

  return (
    <div className={cx('main-section')}>
      <h3 className={cx('header')}>View Submitted Questionnaires</h3>
      <ul className={cx('list')}>{topicItems}</ul>
    </div>
  );
};

QuestionnaireList.propTypes = {
  topics: PropTypes.array.isRequired,
};

export default QuestionnaireList;
