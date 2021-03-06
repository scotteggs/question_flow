import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from 'actions/users';

import classNames from 'classnames/bind';
import styles from 'css/components/navigation';

const cx = classNames.bind(styles);

const Navigation = ({ user, logOut }) => {
    return (
      <nav className={cx('navigation')} role="navigation">
        <Link className={cx('item', 'logo')} to="/" >Question Flow</Link>
        <Link className={cx('item')} to="/select">Submit</Link>
        <Link to="/create" className={cx('item')} activeClassName={cx('active')}>Create</Link>
        <Link to="/view" className={cx('item')} activeClassName={cx('active')}>View</Link>
        {user.authenticated ? (
          <Link onClick={logOut}
            className={cx('item')} to="/">Logout</Link>
        ) : (
          <Link className={cx('item')} to="/login">Log in</Link>
        )}
      </nav>
    );
};

Navigation.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { logOut })(Navigation);
