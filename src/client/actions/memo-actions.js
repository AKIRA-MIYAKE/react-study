import constants from '../constants/memo-constants';


export default {

  create: (text) => {
    return {
      type: constants.MEMO_CREATE,
      text
    };
  },

  update: (id, text) => {
    return {
      type: constants.MEMO_UPDATE,
      id,
      text
    };
  },

  delete: (id) => {
    return {
      type: constants.MEMO_DELETE,
      id
    };
  }

}
