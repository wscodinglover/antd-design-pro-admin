import * as usersService from '../services/table';

export default {
  namespace: 'table',
  state: {
    list: [],
    total: null,
    page:null,
  },
  reducers: {
    save(state, { payload: { list, total } }) {
        debugger
      return { ...state, list, total};
    },
    queryList(state, action) {
        console.log('action',action.payload)
        return {
          ...state,
          list: action.payload,
        };
    },
  },
  effects: {
    *fetch({ payload:  page   },{ call, put }) {
      
        const data = yield call(usersService.fetch,  page );

      console.log('serverdata',data)
      yield put({
        type: 'save',
        payload: {
          list: data ,
          total: parseInt(data.length, 10),
          page: parseInt(page, 10),
        },
      });
    },
    // *fetch({ payload = 1 }, { call, put }) {
    //     const response = yield call(usersService.fetch, payload);
    //     console.log('serverdata',response)
    //     yield put({
    //       type: 'queryList',
    //       payload: Array.isArray(response) ? response : [],
    //     });
    //   },
    // *search({ payload: id }, { call, put }){
    //   const { data, headers } = yield call(usersService.search, id );
    //   yield put({
    //     type: 'save',
    //     payload: {
    //       list:data,
    //     },
    //   });
    // },
    // *remove({ payload: id }, { call, put }) {
    //   yield call(usersService.remove, id);
    //   yield put({ type: 'reload' });
    // },
    // *patch({ payload: { id, values } }, { call, put }) {
    //   yield call(usersService.patch, id, values);
    //   yield put({ type: 'reload' });
    // },
    // *create({ payload: values }, { call, put, select }) {
    //   yield call(usersService.create, values);
    //   yield put({ type: 'reload' });
    // },
    // *reload(action, { put, select }) {
    //   const page = yield select(state => state.users.page);
    //   yield put({ type: 'fetch', payload: { page } });
    // },
  },
  subscriptions: {
    // setup({ dispatch, history }) {
    //   return history.listen(({ pathname, query }) => {
    //     if (pathname === '/table') {
    //       dispatch({ type: 'fetch', payload: query });
    //     }
    //   });
    // },
  },
};
