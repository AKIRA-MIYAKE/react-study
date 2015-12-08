import React, { Component } from 'react';
import moment from 'moment';


export default class MemoCreateView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      isVerify: false
    };
  }

  componentWillMount() {
    const text = this.props.memo.text;
    this.setState({
      text,
      isVerify: (text.length > 0) ? true : false
    });
  }

  componentWillReceiveProps(nextProps) {
    const text = nextProps.memo.text;
    this.setState({
      text,
      isVerify: (text.length > 0) ? true : false
    });
  }

  render() {
    const saveButtonDisabled = (this.state.isVerify) ? false : true;

    return (
      <div className="memo-create-view">
        <textarea className="u-full-width"
          value={this.state.text}
          onChange={(event) => {this.handleTextareaValueChanged(event)}}
          ref={(ref) => {this.textarea = ref}} />
        <p>{moment(this.props.memo.date, 'X').format('YYYY.MM.DD. hh:mm:ss')}</p>
        <button className="button-primary"
          disabled={saveButtonDisabled}
          onClick={(event) => {this.handleSaveButtonDidTap(event)}}>
          Save
        </button>
        <button className="button" onClick={this.handleDeleteButtonDidTap.bind(this)}>
          Delete
        </button>
      </div>
    );
  }

  handleTextareaValueChanged(event) {
    const text = event.target.value;
    this.setState({
      text,
      isVerify: (text.length > 0) ? true : false
    });
  }

  handleSaveButtonDidTap(event) {
    this.props.saveButtonDidTap({
      id: this.props.memo.id,
      text: this.textarea.value
    });
  }

  handleDeleteButtonDidTap(event) {
    this.props.deleteButtonDidTap({
      id: this.props.memo.id
    });
  }

}
