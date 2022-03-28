import { connect, withProvider } from "@sy/framework";
import { Layout, Spin } from "@sy/framework/lib/widget";
import React from 'react';
import List from './components/list';
import TableSearchBar from './components/tableSearchBar';
import currentModel from "./model";

const { Content, Header } = Layout;

const Index = (props) => {

    const { loading, listPageId } = props;
    return (
        <div
            className="divPage ContentWrapper"
            id={listPageId}
        >
            <Spin
                loading={loading && loading['current/getList']}
            >
                <div
                    className="ContentInner"
                >
                    <Layout>
                        <Header>
                            <TableSearchBar />
                        </Header>
                        <Content>
                            <List />
                        </Content>
                    </Layout>
                </div>
            </Spin>
        </div>
    )
}

export default withProvider(connect(({ current, loading }) => {
    return {
        ...current,
        loading
    };
})(Index), [
    { namespace: "current", model: currentModel }
]);
