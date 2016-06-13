import React, { PropTypes } from 'react';
import TopicItem from 'components/TopicItem';
import classNames from 'classnames/bind';
import styles from 'css/components/main-section';

const cx = classNames.bind(styles);

const MainSection = ({onDestroy, topics}) => {
  const topicItems = topics.map((topic, key) => {
    return (
      <TopicItem
        index={key}
        id={topic._id}
        key={key}
        title={topic.title}
        questions={topic.questions}
        questionnaireType={topic.questionnaireType}
        onDestroy={onDestroy} />);
    });

  return (
    <div className={cx('main-section')}>
      <h3 className={cx('header')}>Questionnaires</h3>
      <ul className={cx('list')}>{topicItems}</ul>
    </div>
  );
};

MainSection.propTypes = {
  topics: PropTypes.array.isRequired,
  onDestroy: PropTypes.func.isRequired
};

export default MainSection;
