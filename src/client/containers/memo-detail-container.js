import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import memoActions from '../actions/memo-actions';

import MemoEditView from '../components/memos/memo-edit-view';
import MemoCreateView from '../components/memos/memo-create-view';


class MemoDetailContainer extends Component {

  componentWillMount() {
    const id = this.props.params.id;
    const memo = this.getSelectedMemo(this.props);

    if (!memo && id !== 'new') {
      this.props.history.push({ pathname: '/memos/new' });
    }
  }

  componentWillReceiveProps(newProps) {
    const id = newProps.params.id;
    const memo = this.getSelectedMemo(newProps);

    if (!memo && id !== 'new') {
      this.props.history.push({ pathname: '/memos/new' });
    }
  }

  render() {
    const memo = this.getSelectedMemo(this.props);

    let Node;
    if (memo) {
      Node = (
        <MemoEditView
          memo={memo}
          saveButtonDidTap={(params) => {this.handleEditViewSaveButtonDidTap(params)}}
          deleteButtonDidTap={(params) => {this.handleEditViewDeleteButtonDidTap(params)}} />
      );
    } else {
      Node = (
        <MemoCreateView
          saveButtonDidTap={(params) => {this.handleCreateViewSaveButtonDidTap(params)}} />
      )
    }

    return (
      <div className="memo-detail-container">
        {Node}
      </div>
    );
  }

  getSelectedMemo(props) {
    var id = props.params.id;

    if (id === 'new') {
      return null;
    } else {
      let arr = props.memos.filter((memo) => {
        return (memo.id === id) ? true : false;
      });

      if (arr.length > 0) {
        return arr[0];
      } else {
        return null;
      }
    }
  }

  handleEditViewSaveButtonDidTap(params) {
    this.props.memoActions.update(params.id, params.text);
  }

  handleEditViewDeleteButtonDidTap(params) {
    this.props.memoActions.delete(params.id);
  }

  handleCreateViewSaveButtonDidTap(params) {
    this.props.memoActions.create(params.text);
    this.props.history.push({
      pathname: '/memos/new'
    })
  }

}


export default connect(
  (state) => {
    return {
      memos: state.memos
    };
  },
  (dispatch) => {
    return {
      memoActions: bindActionCreators(memoActions, dispatch)
    };
  }
)(MemoDetailContainer);
