import { connect, withProvider } from '@sy/framework';
import { model } from '@sy/platform/lib/common/utils';
import { formModel, FormWrapper, ToolBar, WFFormPageDefault } from '@sy/platform/lib/components';
import React from 'react';
import currentModel from '../model';
import WfForm from './form';

const { ToolbarItem } = ToolBar;

/**
 * 业务入口
 * @param {*} props 
 * @returns 
 */
class Index extends React.PureComponent {

    componentDidMount() {
        this.inirWf();
    }

    inirWf = () => {
        const { dispatch, workflowProps, dynamicFormProps } = this.props;
        const wfID = workflowProps && workflowProps.wfInstanceId;
        const wfTemplateID = workflowProps && workflowProps.wfTemplateId;
        const formEditable = dynamicFormProps && dynamicFormProps.formEditable;
        const formId = workflowProps && workflowProps.formId;
        dispatch({
            type: 'current/get',
            params: {
                wfInstanceID: wfID,
                formId,
            }
        }).then(({ state, main, dtl }) => {

            if (!state) {
                return;
            }

            // 设置表单
            if (!main.JobNumberId) {
                main.WFInstanceID = wfID;
                main.WFTemplateID = wfTemplateID;
            }
            model.setFormConfig(dispatch, {
                namespace: 'formConfig',
                data: {
                    ...main,
                    formEditable,
                    formId,
                },
                isDisabledFormItem: !formEditable,
            });

            // 设置明细
            dispatch({
                type: 'current/setData',
                params: {
                    detailList: dtl,
                }
            })
        });
    }

    // 标题栏旁边的按钮
    toolBar = (
        <ToolBar
            boxStyle={{
                top: 15,
                right: 10
            }}
        >
            <ToolbarItem
                title="帮助"
                icon="question-circle"
                onClick={() => { }}
            />

            <ToolbarItem
                title="打印"
                onClick={() => { }}
            />

            <ToolbarItem
                title="导出"
                icon="export"
                onClick={() => { }}
            />

            <ToolbarItem
                text="业务流程"
                onClick={() => { }}
            />
        </ToolBar>
    );

    /**
     * 整个业务的提交以及暂存事件
     * @param {*} callBack 
     * @param {*} param1 
     */
    formSubmit = (callBack, { buttonKey }) => {
        const { formConfig: { data: formData } } = this.props;
        console.log(formData);
    }

    render() {
        const { workflowProps, scrollContainerId, dynamicFormProps } = this.props;
        return (
            <div
                className="divPage ContentWrapper"
            >
                <WFFormPageDefault
                    // formPageId={pageId}
                    workflowProps={workflowProps}
                    formScrollContainerId={scrollContainerId}
                    dynamicFormProps={dynamicFormProps}
                    formTitle="公共业务模板"
                    formToolBar={this.toolBar}
                >
                    <WfForm {...this.props} />
                </WFFormPageDefault>
            </div>
        )
    }
}

export default withProvider(
    connect(({ current, formConfig, loading }) => {
        return {
            ...current,
            formConfig,
            loading,
            formInstance: formConfig.formInstance,
        };
    })(FormWrapper(Index)),
    [
        { namespace: 'formConfig', model: formModel },
        { namespace: 'current', model: currentModel },
    ]
);