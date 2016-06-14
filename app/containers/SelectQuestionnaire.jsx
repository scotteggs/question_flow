import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import MainSection from 'components/MainSection';
import { fetchTopics } from 'actions/topics';
import styles from 'css/components/vote';
/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const cx = classNames.bind(styles);

class SelectQuestionnaire extends Component {

	static need = [
		fetchTopics
	]

	render() {
		const {topics} = this.props;
    return (
		<div>hello there</div>
    );
  }
}

SelectQuestionnaire.propTypes = {
  topics: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    topics: state.topic.topics,
    newTopic: state.topic.newTopic
  };
}


export default connect(mapStateToProps)(SelectQuestionnaire);
