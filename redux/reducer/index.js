import { FETCHING_DATA, ERROR_FETCHING_DATA } from "../actions"
const initialState = {
   message:'',
   data:{}

  }
function reducer  (state = initialState, action) {
    console.log('in treducer',action);
    switch(action.type){
        case FETCHING_DATA:
            return {
               message:action.message,
               data:action.data
            }
        case ERROR_FETCHING_DATA:
            return {
                message:action.message,
                data:{}
            }
        default:
            return state;
         
    }
  }

export default reducer;