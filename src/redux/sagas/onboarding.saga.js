import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* updateServices(action) {
    // new client info here - sending PUT, no reducer needed
    try {
        const servicesObj = action.payload;
        const client_id = servicesObj.client_id;
        console.log("client_id:", servicesObj.client_id);
        console.log("service_id array:", servicesObj.service_id);
        const response = yield axios.put(`/api/onboarding/servicechoice/${client_id}`, servicesObj);
        console.log(response.data);
        yield put({ type: "FETCH_USER" });
    }
    catch (error) {
        console.log("error with PUT on client side", error);
    }
}

function* updateClientLocationInfo(action) {

    try {
        const locationObj = action.payload;
        const client_id = locationObj.client_id;
        console.log("client location object:", locationObj);
        console.log("client_id", client_id);
        const response = yield axios.put(`/api/onboarding/clientlocationinfo/${client_id}`, locationObj)
        console.log(response.data)
        yield put({ type: "FETCH_USER" })
    }
    catch (error) {
        console.log("error with updateClientLocation PUT on client side", error)
    }
}

function* updateDemographics(action) {

    try {
        const demographicsObj = action.payload;
        console.log("client_id:", demographicsObj.client_id)
        console.log("demographics object:", demographicsObj)
        const response = yield axios.put(`/api/onboarding/demographics/${demographicsObj.client_id}`, demographicsObj)
        console.log(response.data)
        yield put({ type: "FETCH_USER" });

    }
    catch (error) {
        console.log("error with Demographic PUT on client side", error)
    }
}

function* updateAdditionalInfo(action) {

    try {
        const additionalInfoObj = action.payload;
        console.log("client_id:", additionalInfoObj.client_id)
        console.log("Additonal Info object:", additionalInfoObj)
        const response = yield axios.put(`/api/onboarding/additionalinfo/${additionalInfoObj.client_id}`, additionalInfoObj)
        console.log(response.data)
        yield put({ type: "FETCH_USER" });
    }
    catch (error) {
        console.log("error with Additional info PUT on client side", error)
    }
}

function* updateContactInfoInStatus(action) {
    try {
        const contactInfoObj = action.payload;
        const client_id = contactInfoObj.client_id;
        console.log("client_id:", contactInfoObj.client_id);
        console.log("contactInfoObj:", contactInfoObj)
        const response = yield axios.put(`/api/onboarding/changecontact/${client_id}`, contactInfoObj);
        console.log(response.data);
        yield put({ type: "FETCH_USER" });
    }
    catch (error) {
        console.log("error with PUT on client side", error);
    }
}

function* updateFoodPreferences(action) {

    try {
        const foodPreferencesObj = action.payload;
        const id = foodPreferencesObj.client_id
        console.log("FoodPreferences object:", foodPreferencesObj)
        console.log("ID", id)
        const response = yield axios.post(`/api/onboarding/foodpreferences/`, foodPreferencesObj)
        console.log("Respomnse",response.data)
    }
    catch (error) {
        console.log("error with updateFoodPreferences PUT on client side", error)
    }
}

function* onboardingSaga() {
    yield takeLatest('UPDATE_SERVICES', updateServices)
    yield takeLatest('UPDATE_CLIENT_LOCATION', updateClientLocationInfo)
    yield takeLatest('UPDATE_DEMOGRAPHICS', updateDemographics)
    yield takeLatest('UPDATE_ADDINFO', updateAdditionalInfo)
    yield takeLatest('UPDATE_FOOD_PREFERENCES', updateFoodPreferences)
    yield takeLatest('UPDATE_CONTACT_INFO', updateContactInfoInStatus)
}

export default onboardingSaga;