import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getProductsSaga(action) {

    try {
        console.log("getProductsSaga action.payload", action.payload)
        const response = yield axios.get(`/api/products/`);
        console.log("getProductsSaga respons.dat",response.data)
        yield put({ type: 'SET_ALL_PRODUCTS', payload: response })

    }
    catch (error) {
        console.log("error with getProductsSaga GET on client side", error)
    }
}

function* onboardingSaga() {
    yield takeLatest('FETCH_PRODUCTS', getProductsSaga)
}

export default onboardingSaga;