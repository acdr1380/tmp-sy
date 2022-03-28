import common from '@/project/common/common';
import Func from "@/project/common/func";
import { connect } from "@sy/framework";
import { EditableTable, Input } from '@sy/framework/lib/widget';
import React from 'react';

const { getConfig } = Func;
const { align, colWidth, tableEditButtonConfig } = common;

const detail = (props) => {
    const { detailList } = props;

    // 表格列
    const columns = [
        {
            title: '单据名称',
            dataIndex: 'BillName',
            align: align.wordAlign,
            width: colWidth.name_s,
            validator: (value, row) => {
                if (value == null || value.toString().trim() === '') {
                    return { valid: false, message: '请输入单据名称' };
                }
                return { valid: true, message: '' }
            },
            editor: (value, row, index, onchange, ref) => {
                return (
                    <Input
                        defaultValue={value}
                        onChange={e => onchange({ 'BillName': e.target.value }, row, index)}
                    />
                )
            }
        },
        {
            title: '编制人',
            dataIndex: 'Creator',
            align: align.wordAlign,
            width: colWidth.normal,
            validator: (value, row) => {
                return { valid: true, message: '' }
            },
            editor: (value, row, index, onchange, ref) => {
                return (
                    <Input
                        defaultValue={value}
                        onChange={e => onchange({ 'BillName': e.target.value }, row, index)}
                    />
                )
            }
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
    ];

    /**
     * 更新表格数据源
     */
    const onEditSave = (changeData, newDateSource) => {
        const { dispatch } = props;
        dispatch({
            type: 'current/setData',
            params: {
                detailList: newDateSource
            }
        })
    }

    return (
        <>
            <EditableTable
                columns={columns}
                dataSource={detailList}
                rowKey='JobNumberId'
                editTools={['add', 'edit', 'delete']}
                editToolsConfig={tableEditButtonConfig}
                onEditSave={onEditSave}
                {...getConfig('DetailTable') || {}}
            />
        </>
    );
};

export default connect(({ current, formConfig, loading }) => {
    return {
        ...current,
        formConfig,
        loading,
    };
})(detail);
