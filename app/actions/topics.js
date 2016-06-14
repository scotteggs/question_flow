/* eslint consistent-return: 0, no-else-return: 0*/
import { polyfill } from 'es6-promise';
import request from 'axios';
import md5 from 'spark-md5';
import * as types from 'types';
import { push } from 'react-router-redux';

polyfill();

/*
 * Utility function to make AJAX requests using isomorphic fetch.
 * You can also use jquery's $.ajax({}) if you do not want to use the
 * /fetch API.
 * Note: this function relies on an external variable `API_ENDPOINT`
 *        and isn't a pure function
 * @param Object Data you wish to pass to the server
 * @param String HTTP method, e.g. post, get, put, delete
 * @param String endpoint
 * @return Promise
 */
export function makeTopicRequest(method, id, data, api = '/questionnaire') {
  // console.log('method', method);
  // console.log('id', id);
  return request[method](api + (id && method !== 'post' ? ('/' + id) : ''), data);
}

export function typing(text) {
  return {
    type: types.TYPING,
    newTopic: text
  };
}

/*
 * @param data
 * @return a simple JS object
 */
export function createTopicRequest(data) {
  return {
    type: types.CREATE_TOPIC_REQUEST,
    id: data.id,
    title: data.title,
    description: data.description,
    questionnaireType: data.questionnaireType
  };
}

export function createTopicSuccess() {
  return {
    type: types.CREATE_TOPIC_SUCCESS
  };
}

export function createTopicFailure(data) {
  return {
    type: types.CREATE_TOPIC_FAILURE,
    id: data.id,
    error: data.error
  };
}

export function createTopicDuplicate() {
  return {
    type: types.CREATE_TOPIC_DUPLICATE
  };
}

// This action creator returns a function,
// which will get executed by Redux-Thunk middleware
// This function does not need to be pure, and thus allowed
// to have side effects, including executing asynchronous API calls.
export function createTopic(formObj) {
  const title = formObj.title;
  const description = formObj.description;
  let questionnaireType = '';
  const questions = formObj.questions;

  if (formObj.type === 'submission') {
    questionnaireType = 'submission';
  } else {
    questionnaireType = 'master';
  }

  return (dispatch, getState) => {
    // If the text box is empty
    if (title.trim().length <= 0) return;

    const id = md5.hash(title);
    // Redux thunk's middleware receives the store methods `dispatch`
    // and `getState` as parameters
    const { topic } = getState();

    const data = {
      id,
      title,
      description,
      questionnaireType,
      questions
    };

    // First dispatch an optimistic update
    dispatch(createTopicRequest(data));

    return makeTopicRequest('post', id, data)
      .then(res => {
        if (res.status === 200) {
          // We can actually dispatch a CREATE_TOPIC_SUCCESS
          // on success, but I've opted to leave that out
          // since we already did an optimistic update
          // We could return res.json();
          dispatch(push('/'));
          return dispatch(createTopicSuccess());
        }
      })
      .catch(() => {
        return dispatch(createTopicFailure({ id, error: 'Oops! Something went wrong and we couldn\'t create your topic'}));
      });
  };
}

// Fetch posts logic
export function fetchTopics() {
  return {
    type: types.GET_TOPICS,
    promise: makeTopicRequest('get')
  };
}


export function destroyTopic(id, index) {
  return dispatch => {
    return makeTopicRequest('delete', id)
      .then(() => dispatch(destroy(index)))
      .catch(() => dispatch(createTopicFailure({id,
        error: 'Oops! Something went wrong and we couldn\'t add your vote'})));
  };
}

export function destroy(index) {
  return { type: types.DESTROY_TOPIC, index };
}

export function selectTopic(id) {
  return { type: types.SELECT, id};
}
