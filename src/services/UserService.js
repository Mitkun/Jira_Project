import { baseService } from "./baseService";


class UserService extends baseService {
   constructor() {
      super();
   }


   getUser = (keyword) => {
      return this.get(`Users/getUser?keyword=${keyword}`)
   };

   deleteUser = (userId) => {
      return this.delete(`Users/deleteUser?id=${userId}`)
   }

   editUser = (userEdit) => {
      return this.put(`Users/editUser`, userEdit)
   }

   assignUserProject = (userProject) => {
      return this.post(`Project/assignUserProject`, userProject)
   };

   removeUserFromProject = (userProject) => {
      return this.post(`Project/removeUserFromProject`, userProject)
   }

   getUserByProjectId = (idProject) => {
      return this.get(`Users/getUserByProjectId?idProject=${idProject}`)
   }

   signUpJira = (registrationInformation) => { //{email: "",passWord: "",name: "",phoneNumber: ""}
      return this.post(`Users/signup`, registrationInformation);
   };

}

export const userService = new UserService();