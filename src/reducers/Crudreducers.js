const initialrecord = {
    users : localStorage.getItem('crud') ? JSON.parse(localStorage.getItem('crud')) : [] ,
    user : []
}

const Crud = (state = initialrecord ,action) => {
    switch(action.type){
        case "ADD_RECORD" :
            let insertrecord = action.payload;
            let data = [...state.users, insertrecord];
            localStorage.setItem('crud',JSON.stringify(data));
            return {
                ...state,
                users : data
            }
            break;

        case "DELETE_RECORD" :
            let deleterecord = state.users.filter( (val) =>{
                return val.id !== action.payload
            })
            localStorage.setItem('crud',JSON.stringify(deleterecord));
            return{
                ...state,
                users : deleterecord
            }
            break;

        case "EDIT_RECORD" :
            let editrecord = state.users.find( (val) => {
                return val.id === action.payload
            })
            return{
                ...state,
                user : editrecord
            }
            break;

        case "UPDATE_RECORD" :
            let updaterecord = state.users.map( (val) => {
                if(val.id === action.payload.id){
                    return{
                        ...val,
                        firstname : action.payload.firstname,
                        lastname : action.payload.lastname,
                        email : action.payload.email 
                    }
                }
                return val;
            })
            localStorage.setItem('crud',JSON.stringify(updaterecord));
            return{
                ...state,
                users : updaterecord
            }
            break;
        
        default :
            return state;
    }
}

export default Crud;