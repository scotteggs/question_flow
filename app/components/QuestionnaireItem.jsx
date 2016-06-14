import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/topic-item';

const cx = classNames.bind(styles);

export default class QuestionnaireItem extends Component {

  constructor(props) {
    super(props);
    this.select = this.select.bind(this);
  }

  select() {
    const { id } = this.props;
    let selected = id;
    console.log("selected: ", selected);
  }


  render() {
    return (
      <li className={cx('topic-item')} key={this.props.id}>
        <span className={cx('topic')}>{this.props.title}</span>
        <button
          onClick={this.select}>
          Select</button>
      </li>
    );
  }
}

QuestionnaireItem.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};