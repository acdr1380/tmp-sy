import { connect } from "@sy/framework";
import { EditableTable } from '@sy/framework/lib/widget';
import { WFOperateColumn } from "@sy/platform/lib/components";
import { PopupAuditOpinion, PopupWfChartAndTaskDetail, PopupWorkflowForm } from '@sy/platform/lib/extensions';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import common from '@/project/common/common';

const { align, colWidth } = common;

const list = (props) => {

    const { tableList, dispatch, tableParams, tableTotal } = props;

    const tableInstance = useRef(null);
    const popupAuditOpinion = useRef(null);
    const popupWfChartAndTaskDetail = useRef(null);
    const popupWorkflowForm = useRef(null);

    // 表格页码
    const [current, setCurrent] = useState(1);
    // 表格分页大小
    const [pageSize, setPageSize] = useState(10);

    /**
     * 执行tableparams副作用
     */
    useEffect(() => {
        loadTableData({ current, pageSize });
    }, [current, pageSize])

    /**
     * 设置表格实例
     */
    useEffect(() => {
        dispatch({
            type: 'current/setDate',
            params: {
                tableInstance: tableInstance.current
            }
        })
    }, [tableInstance])

    // 表格列
    const columns = [
        {
            title: '单据名称',
            dataIndex: 'BillName',
            align: align.wordAlign,
            width: colWidth.name_s,
        },
        {
            title: '项目名称',
            dataIndex: 'ProjectName',
            align: align.wordAlign,
            width: colWidth.name_s,
        },
        {
            title: '状态',
            dataIndex: 'DataStatus',
            align: align.wordAlign,
            width: colWidth.cmp,
        },
        {
            title: '编制人',
            dataIndex: 'Creator',
            align: align.wordAlign,
            width: colWidth.normal,
        },
        {
            title: '编制机构',
            dataIndex: 'OrgName',
            align: align.wordAlign,
            width: colWidth.name_s,
        },
        {
            title: '制单日期',
            dataIndex: 'MakerTime',
            align: align.dateAlign,
            width: colWidth.date,
            render: text => {
                return text ? moment(text).format('YYYY-MM-DD') : ''
            },
        },
        {
            title: '经办人',
            dataIndex: 'Operator',
            align: align.wordAlign,
            width: colWidth.name_s,
        },
        {
            title: '备注',
            dataIndex: 'Remark',
            align: align.wordAlign,
        },
        {
            title: '操作',
            dataIndex: 'operation',
            align: align.cmpAlign,
            width: colWidth.large,
            render: (text, record) => {
                return (
                    <WFOperateColumn
                        deleteEvent={() => deleteEvent(record)}
                        record={record}
                        fieldMap={{
                            createUserId: 'CreatorId',
                            wfInstanceId: 'WFInstanceId',
                            wfTemplateId: 'WFTemplateId',
                            dataStatus: 'DataStatus',
                        }}
                        extraFormParams={record}
                        wfDeleteCallback={(e) => { console.log('删除', e); }}
                        popupAuditOpinion={popupAuditOpinion.current}
                        popupWfChartAndTaskDetail={popupWfChartAndTaskDetail.current}
                        popupFormInstance={popupWorkflowForm.current}
                        showButtons={[
                            "edit",
                            "view",
                            "auditOpinion",
                            "wfChart",
                            "delete",
                            "wfDelete",
                        ]}
                    />
                );
            },
        },
    ];

    /**
     * 获取表格数据
     */
    const loadTableData = (params = {}) => {
        // 请求台账数据
        dispatch({
            type: 'current/getList',
            params: { ...tableParams, ...params }
        })
    }

    /**
     * 删除事件
     */
    const deleteEvent = (row) => {

    }
    return (
        <>
            <EditableTable
                columns={columns}
                rowKey='JobNumberId'
                dataSource={tableList}
                editTools={null}
                ref={tableInstance}
                pagination={{
                    //当前页
                    current,
                    //每页显示条数
                    pageSize,
                    //总条数
                    total: tableTotal,
                    //翻页事件事件
                    onChange: (current, pageSize) => { setCurrent(current) },
                    //切换每页显示条数事件
                    onShowSizeChange: (current, pageSize) => { setPageSize(pageSize) },
                }}
            />

            <PopupWorkflowForm ref={popupWorkflowForm} />
            <PopupAuditOpinion ref={popupAuditOpinion} />
            <PopupWfChartAndTaskDetail ref={popupWfChartAndTaskDetail} />
        </>
    )
}

export default connect(({ current, loading }) => ({ ...current, loading }))(list);
