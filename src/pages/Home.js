import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

class Home extends PureComponent {
  render () {
    return (
      <div className={'container'}>
        <div className={'row'}>
          <div className={'col-xs-12'}>
            <p>home</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {user} = state;
  return {user};
};

export default connect(mapStateToProps)(Home);