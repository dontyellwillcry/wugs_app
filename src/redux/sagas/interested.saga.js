import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* interestedInWugs(action) {
    try {
        const getMoreInfoObject = action.payload;
        // console.log("getMoreInfoObject:", getMoreInfoObject)
        const response = yield axios.post("/api/interested", getMoreInfoObject)
        console.log("success with interested party POST:", response.data)
    }
    catch (error) {
        console.log("error with PUT on client side", error)
    }
}

function* getAllInterested(action) {
    try {
      const response = yield axios.get('/api/interested');
      const allInterested = response.data;
    //   console.log("all interested' info in saga:", allInterested)
      yield put({ type: 'SET_ALL_INTERESTED', payload: allInterested })
    }
    catch (error) {
      console.log("error with GET on client side", error)
    }
  }

  function* deleteInterested(action) {
    try {
      const interestedDelete = action.payload; 
      yield axios.delete(`/api/interested/${interestedDelete.id}`, interestedDelete);
      yield put({ type: "ALL_INTERESTED" });
    } catch (error) {
      console.log("error sending put", error);
    }
  }

function* interestedSaga() {
    yield takeLatest('NEW_INTERESTED', interestedInWugs);
    yield takeLatest('ALL_INTERESTED', getAllInterested);
    yield takeLatest('DELETE_INTERESTED', deleteInterested);


}

export default interestedSaga;