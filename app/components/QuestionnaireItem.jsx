import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/topic-item';

const cx = classNames.bind(styles);

export default class QuestionnaireItem extends Component {

  constructor(props) {
    super(props);
    // this.onDestroyClick = this.onDestroyClick.bind(this);
  }

  // onDestroyClick() {
  //   const { id, index, onDestroy} = this.props;
  //   onDestroy(id, index);
  // }


  render() {
    return (
      <li className={cx('topic-item')} key={this.props.id}>
        <span className={cx('topic')}>{this.props.title}</span>
      </li>
    );
  }
}

QuestionnaireItem.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
