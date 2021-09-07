import { GET_ALL_PROJECT, GET_LIST_PROJECT } from "../constants/ProjectJiraConst"


const stateDefault = {
   projectList: [],
   arrProject: []  //Get all project cho dropdown
}



export const ProjectJiraReducer = (state = stateDefault, action) => {
   switch (action.type) {
      case GET_LIST_PROJECT: {
         state.projectList = action.projectList
         return { ...state }
      };

      case GET_ALL_PROJECT: {
         // state.arrProject = action.arrProject;
         return { ...state, arrProject: action.arrProject }
      };


      default: return { ...state }
   }
}
