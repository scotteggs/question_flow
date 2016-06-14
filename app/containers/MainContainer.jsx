import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import EntryBox from 'components/EntryBox';
import MainSection from 'components/MainSection';
import QuestionnaireAdd from 'components/QuestionnaireAdd';
import { createTopic, typing, incrementCount,
  decrementCount, destroyTopic, fetchTopics } from 'actions/topics';
import styles from 'css/components/vote';

const cx = classNames.bind(styles);

class MainContainer extends Component {

  //Data that needs to be called before rendering the component
  //This is used for server side rending via the fetchComponentDataBeforeRender() method
  static need = [  // eslint-disable-line
    fetchTopics
  ]
  
  render() {
    const {newTopic, topics, typing, createTopic, destroyTopic} = this.props;
    const filteredTopics = _.filter(topics, { 'questionnaireType': 'master'});
    return (
      <div className={cx('vote')}>
        <MainSection topics={filteredTopics}
          onDestroy={destroyTopic} />
      </div>
    );
  }
}

MainContainer.propTypes = {
  topics: PropTypes.array.isRequired,
  typing: PropTypes.func.isRequired,
  createTopic: PropTypes.func.isRequired,
  destroyTopic: PropTypes.func.isRequired,
  newTopic: PropTypes.string
};

function mapStateToProps(state) {
  return {
    topics: state.topic.topics,
    newTopic: state.topic.newTopic,
    destroyTopic: state.topic.destroyTopic
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, { createTopic, typing, destroyTopic })(MainContainer);
