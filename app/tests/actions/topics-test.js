/* eslint no-unused-vars: 0 */ // since fetch is needed but not used
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import md5 from 'spark-md5';
import { polyfill } from 'es6-promise';
import axios from 'axios';
import expect from 'expect';
import * as actions from 'actions/topics';
import * as types from 'types';

polyfill();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Topic Actions', () => {
  describe('Asynchronous actions', () => {
    let sandbox;

    const index = 0;
    const topic = 'A time machine';
    const id = md5.hash(topic);
    const data = {
      id,
      topic
    };

    const initialState = {
      topic: {
        topics: [],
        newtopic: ''
      }
    };

    beforeEach(() => {
      sandbox = sinon.sandbox.create(); // eslint-disable-line
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('dispatches request and success actions when status is 200', done => {
      const expectedActions = [
        {
          type: types.CREATE_TOPIC_REQUEST,
          id: data.id,
          title: data.title
        }, {
          type: types.CREATE_TOPIC_SUCCESS
        }
      ];

      sandbox.stub(axios, 'post').returns(Promise.resolve({ status: 200 }));

      const store = mockStore(initialState);
      store.dispatch(actions.createTopic(topic))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done).catch(done);
    });

    it('dispatches request and failed actions when status is NOT 200', done => {
      const expectedActions = [
        {
          type: types.CREATE_TOPIC_REQUEST,
          id,
          count: 1,
          text: data.text
        }, {
          type: types.CREATE_TOPIC_FAILURE,
          id,
          error: 'Oops! Something went wrong and we couldn\'t create your topic'
        }
      ];
      sandbox.stub(axios, 'post').returns(Promise.reject({status: 404, data: 'Oops! Something went wrong and we couldn\'t create your topic'}));
      const store = mockStore(initialState);
      store.dispatch(actions.createTopic(topic))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done).catch(done);
    });

    it('destroyTopic dispatches a decrement count action on success', done => {
      const expectedActions = [
      {
        type: types.DESTROY_TOPIC,
        index
      }];
      sandbox.stub(axios, 'delete').returns(Promise.resolve({ status: 200 }));
      const store = mockStore();
      store.dispatch(actions.destroyTopic(data.id, index))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done).catch(done);
    });

    it('destroyTopic should not dispatch an decrement count action on failure', done => {
      const expectedActions = [
      {
        type: types.CREATE_TOPIC_FAILURE,
        id: data.id,
        error: 'Oops! Something went wrong and we couldn\'t add your vote'
      }];
      sandbox.stub(axios, 'delete').returns(Promise.reject({ status: 400 }));
      const store = mockStore();
      store.dispatch(actions.destroyTopic(data.id, index))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        }).then(done).catch(done);
    });
  });
  describe('Action creator unit tests', () => {
    const index = 0;
    const topic = 'A time machine';
    const id = md5.hash(topic);
    const data = {
      id,
      count: 1,
      text: topic
    };
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.sandbox.create(); // eslint-disable-line
    });

    afterEach(() => {
      sandbox.restore();
    });


    it('should create an action object to destroy a topic', () => {
      const expectedAction = {
        type: types.DESTROY_TOPIC,
        index
      };
      expect(actions.destroy(index)).toEqual(expectedAction);
    });

    it('should create an action object with a new topic', () => {
      const expectedAction = {
        type: types.TYPING,
        newTopic: data.text
      };
      expect(actions.typing(data.text)).toEqual(expectedAction);
    });

    it('should create an action object with a new topic request', () => {
      const expectedAction = {
        type: types.CREATE_TOPIC_REQUEST,
        id: data.id,
        count: data.count,
        text: data.text
      };
      expect(actions.createTopicRequest(data)).toEqual(expectedAction);
    });

    it('should create an action object on a new topic success', () => {
      const expectedAction = {
        type: types.CREATE_TOPIC_SUCCESS
      };
      expect(actions.createTopicSuccess()).toEqual(expectedAction);
    });

    it('should create an action object on a new topic failure', () => {
      const dataFail = Object.assign({}, {
        error: 'Oops! Something went wrong and we couldn\'t create your topic',
        id: data.id
      });
      const expectedAction = {
        type: types.CREATE_TOPIC_FAILURE,
        id: dataFail.id,
        error: dataFail.error
      };
      expect(actions.createTopicFailure(dataFail)).toEqual(expectedAction);
    });

    it('should create an action on a topic duplicate', () => {
      const expectedAction = {
        type: types.CREATE_TOPIC_DUPLICATE
      };
      expect(actions.createTopicDuplicate()).toEqual(expectedAction);
    });

    it('should create an action when fetching topics', () => {
      sandbox.stub(axios, 'get').returns('hello');
      const expectedAction = {
        type: types.GET_TOPICS,
        promise: 'hello'
      };
      expect(actions.fetchTopics()).toEqual(expectedAction);
    });
  });
});
