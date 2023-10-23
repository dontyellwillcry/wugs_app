const allInterested = (state = [], action) => {
    if (action.type === 'SET_ALL_INTERESTED') {
        return action.payload;
    }
    return state;
}

export default allInterested;