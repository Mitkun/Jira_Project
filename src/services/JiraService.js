import { baseService } from "./baseService";


class JiraService extends baseService {
   constructor() {
      super();
   }
   signinJira = (userLogin) => {
      return this.post(`users/signin`, userLogin);
   };

   getAllProjectCategory = () => {
      return this.get(`ProjectCategory`);
   };

   createProject = (newProject) => {
      return this.post(`Project/createProject`, newProject);
   };

   createProjectAuthorization = (newProject) => {
      return this.post('Project/createProjectAuthorize', newProject);
   };

   getlistProject = () => {
      return this.get(`Project/getAllProject`);
   };

   getAllProject = () => {
      return this.get(`Project/getAllProject`);
   }

   updateProject = (projectUpdate) => {
      return this.put(`Project/updateProject?projectId=${projectUpdate.id}`, projectUpdate);
   };

   deleteProject = (id) => {
      return this.delete(`Project/deleteProject?projectId=${id}`);
   };

   getProjectDetail = (projectId) => {
      return this.get(`Project/getProjectDetail?id=${projectId}`);
   };
}

export const jiraService = new JiraService();