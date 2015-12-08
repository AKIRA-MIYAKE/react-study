import React, { Component } from 'react';
import { Link } from 'react-router';


export default class MemoListView extends Component {

  render() {
    const Node = this.props.memos.map((memo) => {
      return (
        <li key={memo.id}>
          <Link to={`/memos/${memo.id}`}>{memo.text}</Link>
        </li>
      );
    });

    return (
      <div className="memo-list-view">
        <ul>{Node}</ul>
      </div>
    );
  }

}
