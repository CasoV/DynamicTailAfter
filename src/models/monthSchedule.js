export default {
  namespace: 'monthSchedule',

  state: {
    years:[],
    tableData:[
      {
        key: '0',
        month: '2018.1',
        status: '已上报',
        date: '2018年1月13号',
      },
      {
        key: '1',
        month: '2018.2',
        status: '已上报',
        date: '2018年1月13号',
      },
      {
        key: '2',
        month: '2018.3',
        status: '已上报',
        date: '2018年1月13号',
      },
      {
        key: '3',
        month: '2018.4',
        status: '已上报',
        date: '2018年1月13号',
      },
    ]
  },

  effects: {
    *addYear({ payload }, { call, put }){
      let curYear = payload.curYear
      const years = []
      for (var i = 0; i < 5; i++){
        years.push(--curYear)
      }

      if (years.length > 0) {
        yield put({
          type: 'upYear',
          payload: {
            years:years
          },
        });
      }
    }
  },

  reducers: {
    upYear(state, { payload }) {
      return {
        ...state,
        years: payload.years,
      };
    }
  },
}
