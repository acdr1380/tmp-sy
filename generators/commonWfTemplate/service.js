import { request, utils } from '@sy/platform/lib/common/utils';
const { hostApi } = utils.getConfigs('apiConfig');
const controller = 'ProcessManagement';

const services = {
    /**
     * 获取数据
     */
    getList: params => {
        return request.cloudApi.post(`${hostApi}/${controller}/GetList`, params);
    },

    /**
     * 获取业务信息
     */
    get: params => {
        return request.cloudApi.get(`${hostApi}/${controller}/Get`, params);
    },
};

export default services;
