import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import QuestionnairesList from 'components/QuestionnairesList';
import { fetchTopics } from 'actions/topics';
import styles from 'css/components/vote';
/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const cx = classNames.bind(styles);

class SelectQuestionnaire extends Component {
	//get topics prior to page loading
	static need = [
		fetchTopics
	]

	render() {
		const {topics} = this.props;
		const filteredTopics = _.filter(topics, { 'questionnaireType': 'master'});
    const active = null;

    return (
		<div>
			<QuestionnairesList topics={filteredTopics} />
		</div>
    );
  }
}

SelectQuestionnaire.propTypes = {
  topics: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    topics: state.topic.topics
  };
}


export default connect(mapStateToProps)(SelectQuestionnaire);
