import React, { Component } from 'react';


export default class MemoCreateView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      isVelify: false
    };
  }

  render() {
    const saveButtonDisabled = (this.state.isVelify) ? false : true;

    return (
      <div className="memo-create-view">
        <textarea className="u-full-width"
          ref={(ref) => {this.textarea = ref}}
          value={this.state.text}
          onChange={(event) => {this.handleTextareaValueChanged(event)}} />
        <button className="button-primary"
          disabled={saveButtonDisabled}
          onClick={(event) => {this.handleSaveButtonDidTap(event)}}>
          Save
        </button>
      </div>
    );
  }

  handleTextareaValueChanged(event) {
    const text = event.target.value;
    const isVelify = (text.length > 0) ? true : false;

    this.setState({
      text,
      isVelify
    });
  }

  handleSaveButtonDidTap(event) {
    this.props.saveButtonDidTap({
      text: this.textarea.value
    });

    this.state = {
      text: '',
      isVelify: false
    };
  }

}
