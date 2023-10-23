import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// get all Client's info from user table, client table, status, services, products
function* getClient(action) {
  try {
    const clientId = action.payload;
    // console.log('clientId is:', clientId)
    const response = yield axios.get(`/api/onboarding/client/${clientId}`);
    const clientInfo = response.data[0];
    // console.log("client's info in saga:", clientInfo)
    yield put({ type: 'SET_SINGLE_CLIENT', payload: clientInfo })
  }
  catch (error) {
    console.log("error with GET on client side", error)
  }
}

function* getAllClients(action) {
  try {
    const response = yield axios.get('/api/admin');
    const allClients = response.data;

    // **here in case we split up onboarding and completed with onboarding**
    // const allClientsOnboarding = [];
    // const allClientsComplete = [];

    // mapping over allClients to format last_active for each client
    const formattedClients = allClients.map(client => {
      const editedDate = client.last_active;
      const formattedEditedDate = new Date(editedDate).toLocaleDateString("en-us", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
      return { ...client, last_active: formattedEditedDate };
    });

    yield put({ type: 'SET_ALL_CLIENTS', payload: formattedClients });
  } catch (error) {
    console.log("error with GET on client side", error);
  }
}

function* updateClient(action) {
  try {
    const clientEdit = action.payload;
    yield axios.put(`/api/admin/${clientEdit.id}`, clientEdit);
    yield put({ type: "FETCH_ALL_CLIENTS" });
  } catch (error) {
    console.log("error sending put", error);
  }
}

function* deleteClient(action) {
  try {
    const clientDelete = action.payload;
    yield axios.delete(`/api/admin/${clientDelete.id}`, clientDelete);
    yield put({ type: "FETCH_ALL_CLIENTS" });
  } catch (error) {
    console.log("error sending put", error);
  }
}



function* clientSaga() {
  yield takeLatest('FETCH_CLIENT', getClient)
  yield takeLatest('FETCH_ALL_CLIENTS', getAllClients)
  yield takeLatest('UPDATE_CLIENT', updateClient)
  yield takeLatest('DELETE_CLIENT', deleteClient)


}

export default clientSaga;