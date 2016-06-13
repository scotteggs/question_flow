import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/topic-item';

const cx = classNames.bind(styles);

export default class QuestionnaireAdd extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <a href="/create">Add a new Questionnaire</a>
      </div>
    );
  }
}
