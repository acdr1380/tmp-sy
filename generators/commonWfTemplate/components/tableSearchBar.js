import { connect } from "@sy/framework";
import { Search } from '@sy/framework/lib/widget';
import { SearchBarPF } from "@sy/platform/lib/components";
import { Export, PublishButton, WFStateSelect } from '@sy/platform/lib/extensions';
import React from 'react';
import common from '@/project/common/common';

const { buttonText } = common;

const TableSearchBar = (props) => {

    const { loading, tableInstance, listPageId } = props;

    /**
     * 收缩条的搜索项
     */
    const searchItems = [
        {
            editor: (
                <WFStateSelect />
            ),
            key: "dataStatus",
            searchEvent: props.IsBtnSearch ? "CustomEvent" : "onChange"
        },
        {
            editor: (
                <Search
                    allowClear={true}
                    placeholder="请输入单据名称查询"
                />
            ),
            key: "keywords",
            label: "单据名称",
            searchEvent: props.IsBtnSearch ? "CustomEvent" : "onSearch",
            width: 300
        },
    ]

    /**
     * 整个搜索条 右边的按钮
     */
    const searchBarOperate = () => {
        return (
            <div>
                <Export
                    table={tableInstance}
                    fileName="清单分解"
                />

                <PublishButton
                    // closePopupCallback={doReload}
                    formTemplateCode="F1_Data_ProcessManagement_template"
                    loading={loading.global}
                    popupContainerId={listPageId}
                    text={buttonText.addWF}
                />
            </div>
        )
    }

    /**
     * 查询
     * @param {*} param 返回的查询条件
     */
    const onSearch = (param) => {
        const { dispatch, tableParams } = props;
        dispatch({
            type: 'current/getList',
            params: { ...tableParams, ...param }
        })
    }

    return (
        <SearchBarPF
            onSearch={onSearch}
            searchBarOperate={searchBarOperate()}
            searchItems={searchItems}
        />
    )
}

export default connect(({ current, loading }) => ({ ...current, loading }))(TableSearchBar);
