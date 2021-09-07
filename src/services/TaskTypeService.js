import { baseService } from "./baseService";

class TaskTypeService extends baseService {

   constructor() {
      super();
   }

   getAllTaskType = () => {
      return this.get('TaskType/getAll');
   }

}


export const taskTypeService = new TaskTypeService();