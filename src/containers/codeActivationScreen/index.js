import React, { useState, useEffect } from 'react';
import EmailField from '../../components/InputField/EmailField';
import { Col, Row, Button } from 'antd';
import './code.css';
import swal from 'sweetalert';
import { Table } from 'antd';
const CodeScreen = () => {
  const dataSource = [
    {
      key: '1',
      firstname: 'John Doe',
      username: 'john',
      mobile: '085213456201',
      email: 'john@gmail.com',
      code: 'KHRCB',
    },
    {
      key: '2',
      firstname: 'Jane Smith',
      username: 'smith',
      mobile: '021365489632',
      email: 'smith@email.com',
      code: 'VHJDKI',
    },
    {
      key: '2',
      firstname: 'Jane Smith',
      username: 'smith',
      mobile: '021365489632',
      email: 'smith@email.com',
      code: 'VHJDKI',
    },
    {
      key: '2',
      firstname: 'Jane Smith',
      username: 'smith',
      mobile: '021365489632',
      email: 'smith@email.com',
      code: 'VHJDKI',
    },
    {
      key: '2',
      firstname: 'Jane Smith',
      username: 'smith',
      mobile: '021365489632',
      email: 'smith@email.com',
      code: 'VHJDKI',
    },
    {
      key: '2',
      firstname: 'Jane Smith',
      username: 'smith',
      mobile: '021365489632',
      email: 'smith@email.com',
      code: 'VHJDKI',
    },
    {
      key: '2',
      firstname: 'Jane Smith',
      username: 'smith',
      mobile: '021365489632',
      email: 'smith@email.com',
      code: 'VHJDKI',
    },
    // ... more rows ...
  ];

  const columns = [
    { title: 'firstname', dataIndex: 'firstname', key: 'firstname' },
    { title: 'username', dataIndex: 'username', key: 'age' },

    { title: 'email', dataIndex: 'email', key: 'email' },
    { title: 'code', dataIndex: 'code', key: 'code' },
    // ... more columns ...
  ];

  return (
    <div>
      <Row>
        <Col span={-6} className="login-layout">
          <Row>
            <Col>
              <Col>
                <div>
                  <div className="login-title">Code Activation Data</div>
                  <div className="login-subtitle">Member</div>
                  <div style={{ marginTop: '15px' }}>
                    <br />
                    <Table dataSource={dataSource} columns={columns} />
                  </div>
                </div>
              </Col>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default CodeScreen;
