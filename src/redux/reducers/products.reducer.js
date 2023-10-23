const allProducts = (state = {}, action) => {
    if (action.type === 'SET_ALL_PRODUCTS') {
        return action.payload;
    }
    return state;
}

export default allProducts;