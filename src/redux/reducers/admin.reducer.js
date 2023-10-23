const allClients = (state = [], action) => {
    if (action.type === 'SET_ALL_CLIENTS') {
        return action.payload;
    }
    return state;
}

export default allClients;