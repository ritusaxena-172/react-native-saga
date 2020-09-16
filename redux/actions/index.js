export const FETCHING_DATA='FETCHING_DATA';
export const ERROR_FETCHING_DATA='ERROR_FETCHING_DATA';

export function fetchData(data){
    console.log('fetchuing',data);
    return{
        type:FETCHING_DATA,
        data:data,
    }
    
}

export function errorData(error){
    return{
        type:ERROR_FETCHING_DATA,
        message:error,
    }
    
}