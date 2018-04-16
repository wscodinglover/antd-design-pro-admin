import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button, Input  } from 'antd';
import { routerRedux } from 'dva/router';
// import styles from './Users.css';
// import { PAGE_SIZE } from '../../constants';
import UserModal from './UserModal';

const Search = Input.Search;


@connect(({ table, loading }) => ({
    table,
    loading: loading.models.table,
}))

export default class Users extends Component{
    componentDidMount() {
        this.props.dispatch({
            type: 'table/fetch',
        });
        
    }
    

    deleteHandler = (id) => {
       this.props.dispatch({
          type: 'table/remove',
          payload: id,
        });
      }
    
    editHandler = (id, values) => {
        this.props.dispatch({
          type: 'table/patch',
          payload: { id, values },
        });
      }
    
    createHandler = (values) => {
        this.props.dispatch({
          type: 'table/create',
          payload: values,
        });
      }
    
    searchHandler = (id) => {
        this.props.dispatch({
          type: 'table/search',
          payload: id,
        });
      }
    
    reloadHandler = () => {
        console.log('点击了')
        this.props.dispatch({
          type: 'table/fetch',
        });
      }
    
    // pageChangeHandler = (page) => {
        // dispatch(
        //   routerRedux.push({
        //     pathname: '/table',
        //     query: { page },
        //   })
        // );
    // }

    render() {
        

        const { table: { list }, loading } = this.props

        const columns = [
            {
              title: 'Id',
              dataIndex: 'id',
              key: 'id',
            },
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              render: text => <a href="">{text}</a>,
            },
            {
              title: 'Email',
              dataIndex: 'email',
              key: 'email',
            },
            {
              title: 'Website',
              dataIndex: 'website',
              key: 'website',
            },
            {
              title: 'Operation',
              key: 'operation',
              render: (text, record) => (
                <span >
                  <UserModal record={record} onOk={this.editHandler(record.id)}>
                    <a>Edit</a>
                  </UserModal>
                  <Popconfirm title="Confirm to delete?" onConfirm={this.deleteHandler(record.id)}>
                    <a style={{ marginLeft: '10px' }} href="">Delete</a>
                  </Popconfirm>
                </span>
              ),
            },
          ];
        
              // 定义分页对象
          const pagination = {
        
            pageSize: 5,
            onChange (value) {console.log(value)},
          };


        return (
            <div>
              <div>
                <div style={{ margin: '20px' }}>
                  <UserModal record={{}} onOk={this.createHandler}>
                    <Button type="primary">Create User</Button>
                  </UserModal>
                  <span style={{ marginLeft: '20px',fontSize: '20px' }}>id :
                    <Search
                      placeholder="input search id"
                      onSearch={value => searchHandler(value)}
                      style={{ width: 200 }}
                    />
                  </span>
                  <Button style={{ marginLeft: '20px' }} type="primary" onClick={this.reloadHandler}>All</Button>
                </div>
                <Table
                  columns={columns}
                  dataSource={list}
                  loading={loading}
                  rowKey={record => record.id}
                  pagination={pagination}
                />
        
              </div>
            </div>
          );
    }
}
