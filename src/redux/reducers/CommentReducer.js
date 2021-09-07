import { GET_ALL_COMMENT, PUT_ID_VISIBLE } from "../constants/CommentConst"

const initialState = {
   commentDetail: [],
   idVisible: '' // idVisible = idComment để xác định Editor comment nào dc hiển thị

}

export const CommentReducer = (state = initialState, action) => {
   switch (action.type) {

      case GET_ALL_COMMENT:
         return { ...state, commentDetail: action.commentDetail };

      case PUT_ID_VISIBLE: {
         // dispast đưa id của comment lên reducer
         state.idVisible = action.idVisible
         return { ...state }
      }

      default:
         return state
   }
}
