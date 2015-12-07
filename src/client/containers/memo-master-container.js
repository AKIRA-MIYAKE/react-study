import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import MemoListView from '../components/memos/memo-list-view';


class MemoMasterContainer extends Component {

  render() {
    return (
      <div className="memo-master-container">
        <div className="container">
          <div className="row">
            <h1><Link to="/memos">Memos</Link></h1>
          </div>

          <div className="row">
            <div className="four columns">
              <div>
                <Link to="/memos/new">Add new memo</Link>
              </div>

              <hr />

              <div>
                <MemoListView memos={this.props.memos} />
              </div>
            </div>
            <div className="eight columns">{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }

}


export default connect(
  (state) => {
    return {
      memos: state.memos
    };
  }
)(MemoMasterContainer);
