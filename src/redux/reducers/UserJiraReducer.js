import { USER_LOGIN } from "../../util/constants/settingSystem";
import { US_LOGIN } from "../constants/JiraConst";

let usLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
   usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}



const stateDefault = {
   userLogin: usLogin
}

export const UserLoginJiraReducer = (state = stateDefault, action) => {
   switch (action.type) {

      case US_LOGIN: {
         state.userLogin = action.usLogin
         return { ...state }
      }

      default: return { ...state }
   }
}