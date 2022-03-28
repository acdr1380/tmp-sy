import common from '@/project/common/common';
import { connect } from '@sy/framework';
import { Collapse, DatePicker, Input } from '@sy/framework/lib/widget';
import { FormJsx } from '@sy/platform/lib/components';
import React from 'react';
import Detail from './detail';

const {
    FormAuditOpinion,
    FormAttachmentItem,
    FormRow,
    FormRowItem,
    FormTableItem,
    TabsPF,
    FormWfChartAndTaskDetail
} = FormJsx;
const { TabPane } = TabsPF;
const { labelWidth } = common;
const { Panel } = Collapse;
const { TextArea } = Input;

const from = (props) => {
    const {
        workflowProps,
        scrollContainerId,
        formConfig: { validates, data },
        workflowProps: { auditInfo, isShowComment, taskId } = {}
    } = props;

    return (
        <FormJsx
            modelProps={{
                isTabsForm: true,
                // isDisabledFormItem: true,//this.props.formConfig.isDisabledFormItem,
                scrollContainerId: scrollContainerId,
                isSubmitValidateTable: false,
            }}
            workflowProps={workflowProps || {}}
        >
            <TabsPF validates={validates}>
                <TabPane header="基本信息">
                    <FormRow>
                        <FormRowItem
                            field="BillNumber"
                            label="单据编号"
                            labelWidth={labelWidth}
                        >
                            <Input disabled={true} placeholder="保存后自动生成" />
                        </FormRowItem>
                        <FormRowItem
                            field="BillName"
                            label="单据名称"
                            labelWidth={labelWidth}
                            allowClear={false}
                            options={{
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入单据名称',
                                    },
                                    {
                                        max: 50,
                                        message: '最多只能输入50个字符',
                                    },
                                ],
                                validateTrigger: ['onChange'],
                            }}
                        >
                            <Input />
                        </FormRowItem>
                        <FormRowItem field="MakerTime" label="制单日期" labelWidth={labelWidth}>
                            <DatePicker />
                        </FormRowItem>
                    </FormRow>
                    <FormRow>

                        <FormRowItem field="Operator" label="经办人" labelWidth={labelWidth}>
                            <Input />
                        </FormRowItem>
                        <FormRowItem isEmpty />
                        <FormRowItem isEmpty />
                    </FormRow>
                    <Collapse
                        className="CollapsePanel"
                        bordered={false}
                        defaultActiveKey={['1']}
                    >
                        <Panel header="备注" key="1">
                            <FormRow>
                                <FormRowItem
                                    field="Remark"
                                    label="备注"
                                    labelWidth={labelWidth}
                                    options={{
                                        rules: [
                                            {
                                                max: 500,
                                                message: '请输入1-500个字符',
                                            },
                                        ],
                                    }}
                                >
                                    <TextArea placeholder="请输入备注" rows={4} />
                                </FormRowItem>
                            </FormRow>
                        </Panel>
                    </Collapse>
                </TabPane>
                <TabPane header="明细">
                    <FormTableItem
                        tableProps={{
                            tableKey: 'detail',
                            tableName: '明细',
                        }}
                    >
                        <Detail />
                    </FormTableItem>
                </TabPane>
                <TabPane
                    header="审批意见"
                    isRender={auditInfo || isShowComment}
                    isWFAuditOpinion={true}
                >
                    <FormAuditOpinion />
                </TabPane>
                <TabPane header="附件" isWFAttachment={true}>
                    <FormAttachmentItem
                        showType="grid"
                        uploadAttachmentProps={{
                            primaryKey: (data && data.WFInstanceID) || '',
                            seedId: taskId,
                        }}
                    />
                </TabPane>
                <TabPane header="流程示意图">
                    <FormWfChartAndTaskDetail />
                </TabPane>
            </TabsPF>
        </FormJsx>
    )
}

export default connect(({ current, formConfig, loading }) => {
    return {
        ...current,
        formConfig,
        loading,
    };
})(from)
