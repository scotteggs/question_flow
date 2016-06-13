import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { manualLogin, signUp, toggleLoginMode } from 'actions/users';
import { createTopic } from 'actions/topics';
import styles from 'css/components/login';
import classNames from 'classnames/bind';
import hourGlassSvg from 'images/hourglass.svg';

const cx = classNames.bind(styles);

class Create extends Component {
  /*
   * This replaces getInitialState. Likewise getDefaultProps and propTypes are just
   * properties on the constructor
   * Read more here: https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html#es6-classes
   */
  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(event) {
    event.preventDefault();

    const { createTopic } = this.props;
    const title = ReactDOM.findDOMNode(this.refs.title).value;
    const description = ReactDOM.findDOMNode(this.refs.description).value;
    const questions = [
			{
				question: ReactDOM.findDOMNode(this.refs.question1).value,
				questionType: 'openResponse'
			},
			{
				question: ReactDOM.findDOMNode(this.refs.question2).value,
				questionType: 'openResponse'
			}
		];
    createTopic({ title, description, questions});
 }

  renderHeader() {
      return (
        <div className={cx('header')}>
          <h1 className={cx('heading')}>Create a New Questionnaire</h1>
        </div>
      );
    }


  render() {
    const { isWaiting } = this.props.user;

    return (
      <div className={cx('login', {
        waiting: isWaiting
      })}>
        <div className={cx('container')}>
          { this.renderHeader() }
          <img className={cx('loading')} src={hourGlassSvg} />
          <div className={cx('email-container')}>
            <form onSubmit={this.handleOnSubmit}>
              <input className={cx('input')}
              type="text"
              ref="title"
              placeholder="title" />
              <input className={cx('input')}
              type="text"
              ref="description"
              placeholder="description" />
              <input className={cx('input')}
              type="text"
              ref="question1"
              placeholder="First Question" />
              <input className={cx('input')}
              type="text"
              ref="question2"
              placeholder="2nd Question" />
              <div className={cx('hint')}>
              </div>
              <input className={cx('button')}
                type="submit"
                value={'Save'} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Create.propTypes = {
  user: PropTypes.object,
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps({user}) {
  return {
    user
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps, { createTopic })(Create);

