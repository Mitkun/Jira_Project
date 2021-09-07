import { CHANGE_ASSIGNESS, CHANGE_TASK_MODAL, GET_TASK_DETAIL, REMOVE_ASSIGNESS } from "../constants/TaskConst"

const initialState = {
   taskDetailModal: {
      "priorityTask": {
         "priorityId": 2,
         "priority": "Medium"
      },
      "taskTypeDetail": {
         "id": 2,
         "taskType": "new task"
      },
      "assigness": [
         {
            "id": 6,
            "avatar": "https://ui-avatars.com/api/?name=khai truong",
            "name": "khai truong",
            "alias": "khai"
         },
         {
            "id": 116,
            "avatar": "https://ui-avatars.com/api/?name=Man ",
            "name": "Man ",
            "alias": "man-nguyen"
         }
      ],
      "lstComment": [],
      "taskId": 865,
      "taskName": "task-2",
      "alias": "task-2",
      "description": "<p>wwerawefwef</p>",
      "statusId": "1",
      "originalEstimate": 21,
      "timeTrackingSpent": 3,
      "timeTrackingRemaining": 4,
      "typeId": 2,
      "priorityId": 2,
      "projectId": 999

   },

}

export const TaskDetailModallReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_TASK_DETAIL: {
         return { ...state, taskDetailModal: action.taskDetailModal };
      };

      case CHANGE_TASK_MODAL: {
         const { name, value } = action;

         return { ...state, taskDetailModal: { ...state.taskDetailModal, [name]: value } };
      };

      case CHANGE_ASSIGNESS: {
         state.taskDetailModal.assigness = [...state.taskDetailModal.assigness, action.userSelected];
         return { ...state };
      };

      case REMOVE_ASSIGNESS: {
         state.taskDetailModal.assigness = [...state.taskDetailModal.assigness.filter((us) => us.id !== action.userId)]
         return { ...state };
      };

      default:
         return state;
   }
}

