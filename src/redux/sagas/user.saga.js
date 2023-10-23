import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    console.log('response.data is:', response.data);
    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });

    console.log("response.data.id", response.data.id)
    // once user signed in, if admin it'll fetch data for all clients, if client it'll fetch only its client info
    if (response.data.admin) {
      yield put({ type: 'FETCH_ALL_CLIENTS' });
      yield put({ type: 'ALL_INTERESTED' });
    } else {
      yield put({ type: 'FETCH_CLIENT', payload: response.data.id });
    }
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
}

export default userSaga;