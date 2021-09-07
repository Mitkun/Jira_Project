import React from 'react';
import { CLOSE_DRAWER, OPEN_DRAWER } from '../constants/DrawerConst';
import { OPEN_FORM_CREATE_TASK, OPEN_FORM_EDIT_PROJECT, OPEN_FORM_EDIT_USER } from '../constants/FormConst';
import { SET_SUBMIT_CRATE_TASK, SET_SUBMIT_EDIT_PROJECT, SET_SUBMIT_EDIT_USER } from '../constants/SubmitConst';


const initialState = {
   visible: false,
   title: '',
   ComponentContentDrawer: <p>Default content</p>,
   callBackSubmit: (propsValue) => { alert('Click demo!') }
}

export const DrawerReducer = (state = initialState, action) => {
   switch (action.type) {

      case OPEN_DRAWER:
         return { ...state, visible: true };

      case CLOSE_DRAWER:
         return { ...state, visible: false };

      case OPEN_FORM_EDIT_PROJECT: {
         state.visible = true;
         state.ComponentContentDrawer = action.Component;
         state.title = action.title;
         return { ...state };
      };

      case SET_SUBMIT_EDIT_PROJECT: {
         // state.callBackSubmit = action.submitFunction;
         return { ...state, callBackSubmit: action.submitFunction };
      };

      case SET_SUBMIT_CRATE_TASK: {
         return { ...state, callBackSubmit: action.submitFunction };
      }

      case SET_SUBMIT_EDIT_USER: {
         return { ...state, callBackSubmit: action.submitFunction };
      }

      case OPEN_FORM_CREATE_TASK: {
         state.visible = true;
         state.ComponentContentDrawer = action.Component;
         state.title = action.title;
         return { ...state };
      };
      case OPEN_FORM_EDIT_USER: {
         state.visible = true;
         state.ComponentContentDrawer = action.Component;
         state.title = action.title;
         return { ...state };
      };
      default:
         return state
   }
}
