import { message } from '@sy/framework/lib/widget';
import services from './service';

export default {
    state: {
        listPageId: `divInventorySplitListPage_${new Date().getTime()}`,
        // 台账数据源
        tableList: [],
        // 导出按钮获取的表格实例
        tableInstance: null,
        // 表格total
        tableTotal: 0,
        // 表格查询请求参数，这个参数主要是用于list更searchBar之间的参数通信
        tableParams: null,
        // detail明细数据源
        detailList: [{ BillName: '1233', JobNumberId: '11111' }],
    },
    reducers: {
        //更新state
        setData: (state, { params }) => {
            return { ...state, ...params };
        },
    },
    effects: {
        /**
         * 获获取台账界面
         */
        *getList({ params }, { call, put }) {
            const { state, data: _data } = yield call(services.getList, params);
            // 更新state
            yield put({
                type: 'setData',
                params: {
                    tableParams: params,
                    tableTotal: _data?.TotalCount || 0,
                    tableList: _data?.Data || [],
                },
            });
        },

        /**
         * 获取业务信息
         */
        *get({ params }, { call, put }) {
            const { state, data } = yield call(services.get, params);
            return {
                state,
                main: data || {},
                dtl: (data && data.Dtl) || [],
            };
        },
    },
};
