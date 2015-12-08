import constants from '../constants/memo-constants';
import uuid from 'node-uuid';
import moment from 'moment';


const initialState = [];

export default function memosReducer(state = initialState, action) {

  switch (action.type) {
  case constants.MEMO_CREATE:
    var memo = {
      id: uuid.v4(),
      text: action.text,
      date: parseInt(moment().format('X'))
    };
    return [
      memo,
      ...state
    ];
    break;
  case constants.MEMO_UPDATE:
    return state.map((memo) => {
      if (memo.id === action.id) {
        return Object.assign({}, memo, {
          text: action.text,
          date: parseInt(moment().format('X'))
        });
      } else {
        return memo;
      }
    });
    break;
  case constants.MEMO_DELETE:
    return state.filter((memo) => {
      return (memo.id !== action.id) ? true : false;
    });
    break;
  default:
    return state;
    break;
  }

}
