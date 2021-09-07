import { EDIT_USER } from "../constants/UserConst"

const initialState = {
   userEdit:
   {
      "id": "347",
      "passWord": "123456",
      "email": "thien34@gmail.com",
      "name": "Thien Truong",
      "phoneNumber": "909090909090"
   }

}

export const UserEditReducer = (state = initialState, action) => {
   switch (action.type) {

      case EDIT_USER: {
         return { ...state, userEdit: action.userEdit }
      }

      default:
         return state
   }
}
