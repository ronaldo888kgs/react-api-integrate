import React, { useEffect, useReducer} from 'react';
import axios from 'axios';

function reducer(state, action){
    switch(action.type)
    {
        case 'LOADING':
            return{
                loading: true,
                data: null,
                error: null
            };
        case 'SUCCESS':
            return {
                loading: false,
                data: action.data,
                error: null
            };
        case 'ERROR':
            return {
                loading: false,
                data: null,
                error: action.error
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

function Users() {

    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        data: null,
        error: null
    });
    

    const fetchUsers = async () => {
        try{
            dispatch({type: 'LOADING'});
            const response = await axios.get(
                'https://jsonplaceholder.typicode.com/users'
            );
            dispatch({ type: 'SUCCESS', data:response.data});
        }catch(e){
            dispatch({type: 'ERROR', error: e });
        }
    }
    useEffect(() => {
        fetchUsers();
    }, []);

    const {loading, data: users, error} = state;
    if(loading) return <div>Loading</div>;
    if(error) return <div>Errors</div>;
    if(!users) return null;

    return(
        <>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={fetchUsers}>Recall</button>
        </>
        
    );

}

export default Users;