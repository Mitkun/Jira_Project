import { USER_LOGIN } from "../../util/constants/settingSystem";
import { US_LOGIN } from "../constants/JiraConst";
import { GET_USER_BY_PROJECT_ID, GET_USER_SEARCH, SIGNUP_ERR } from "../constants/UserConst";

let usLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
   usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}



const stateDefault = {
   userLogin: usLogin,
   userSearch: [],
   arrUser: [], //Array user cho thẻ select create task
   SignupErr: ''
}

export const UserJiraReducer = (state = stateDefault, action) => {
   switch (action.type) {

      case US_LOGIN: {
         // state.userLogin = action.usLogin
         return { ...state, userLogin: action.usLogin }
      };


      case GET_USER_SEARCH: {
         // state.userSearch = action.listUserSearch;
         // console.log('stateUser', state);
         return { ...state, userSearch: action.listUserSearch }
      };

      case GET_USER_BY_PROJECT_ID: {
         return { ...state, arrUser: action.arrUser }
      };

      case SIGNUP_ERR: {
         return { ...state, SignupErr: action.SignupErr }
      }


      default: return { ...state }
   }
}