import { baseService } from "./baseService";

class PriorityService extends baseService {

   constructor() {
      super();
   }

   getAllPriority = () => {
      return this.get('Priority/getAll');
   }

}


export const priorityService = new PriorityService();