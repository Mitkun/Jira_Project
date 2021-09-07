import { baseService } from "./baseService";

class CommentService extends baseService {
   constructor() {
      super();
   }

   getAllComment = (taskId) => {
      return this.get(`Comment/getAll?taskId=${taskId}`)
   }

   insertComment = (commentObject) => {
      return this.post(`Comment/insertComment`, commentObject)
   }

   updateComment = (idComment, contentComment) => {
      return this.put(`Comment/updateComment?id=${idComment}&contentComment=${contentComment}`)
   }

   deleteComment = (idComment) => {
      return this.delete(`Comment/deleteComment?idComment=${idComment}`)
   }


}



export const commentService = new CommentService