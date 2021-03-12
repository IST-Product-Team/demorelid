import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Layout, Row, Col, Button, Modal, Spin } from "antd";

import { initialValues, validationSchema } from '../../helpers/Formik';
import Container from '../../components/Container';
import Form from "../../components/Forms";
import pathname from '../../pathnameCONFIG';
import requestApi from "../../services/index";
import secureStorage from "../../helpers/SecureStorage";
import localIpUrl from 'local-ip-url';
import { osName, browserName } from 'react-device-detect';
import { geolocated } from "react-geolocated";

const { Footer } = Layout;

const TransferScreen = (props) => {
    const formik = useFormik({
        initialValues: initialValues.transfer,
        validationSchema: validationSchema.transfer,
    });
    React.useEffect(() => {
        console.log('formik', formik);
    }, [formik]);

    const [counterStatus, setCounterStatus] = useState(false);
    const [notifUuid, setNotifUuid] = useState(null);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(null);
    const [deviceInfo, setDeviceInfo] = useState({});

    useEffect(() => {
        
        // const urlFetch = fetch('alamaturl')
        // urlFetch.then( res => {
        //     if(res.status === 200)
        //         return res.json()   
        // }).then( resJson => {
        //     this.setState({
        //         data: resJson
        //     })
        // })



        fetch("https://api.ipify.org/?format=json")
        .then(response => {
            return response.json();
        }, "jsonp")
        .then(res => {
            console.log(res.ip)
            setDeviceInfo({
                ip: res.ip,
                osName: osName,
                browserName: browserName,
                status: 'Login'
            })
        })
        .catch(err => {
            console.log(err)
            setDeviceInfo({
                ip: localIpUrl('public', 'ipv4'),
                osName: osName,
                browserName: browserName,
                status: 'Login'
            })
        })
    }, []);

    useEffect(() => {
        if (counterStatus === true) {
            handleGetStatus(notifUuid)
            setTimer(setInterval(function () {
                handleGetStatus(notifUuid)
            }, 5000));
        } else {
            clearInterval(timer);
        }
    }, [counterStatus]);

    const handleLogin = (value) => {
        setLoading(true);
        requestApi
            .generateRVN(secureStorage.getItem("userId"), deviceInfo, props.coords)
            .then((res) => {
                console.log('nyoo cek response', res)
                if (res.response_code !== 0) {
                    Modal.error({
                        title: res.error_msg,
                        onOk: () => window.location.replace(pathname.login)
                    });
                } else {
                    setNotifUuid(res.notification_uuid);
                    setCounterStatus(true);
                }
            }).catch((err) => {
                console.log('nyoo cek error', err)
                setLoading(false);
                Modal.error({
                    title: err.data.error_msg,
                    onOk: () => window.location.replace(pathname.login)
                });
            });
    };

    const handleGetStatus = (value) => {
        requestApi
            .getRVNStatus(value)
            .then((res) => {
                if (res.status === "UPDATED" && res.action_response === "Approved") {
                    window.location.replace(pathname.receipt);
                } else if (res.status === "UPDATED" && res.action_response === "Disapproved") {
                    setLoading(false);
                    setCounterStatus(false);
                    Modal.error({
                        title: res.action_response,
                        onOk: () => window.location.replace(pathname.login)
                    });
                } else if (res.status === "ACTIVE" && res.action_response === "NONE") {
                    console.log('nyoo cek waiting', res);
                } else {
                    setLoading(false);
                    setCounterStatus(false);
                    Modal.error({
                        title: res.status,
                        onOk: () => window.location.replace(pathname.login)
                    });
                }
            }).catch((err) => {
                console.log('nyoo cek error', err);
            });
    };

    return (
        <Spin tip="Loading..." spinning={loading}>
            <Container title="Transfer" subtitle="Transfer to another Bank/Account">
                <Form formCategory="transfer" {...formik} />
            </Container>
            <Footer
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 255,
                    right: 0,
                    backgroundColor: '#ffffff',
                    height: 64,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Row>
                    <Col span={12} />
                    <Col
                        span={12}
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Button
                            className="submit-button"
                            type="primary"
                            style={{
                                height: 50,
                                width: 100,
                            }}
                            onClick={() => {
                                handleLogin();
                                // window.location.assign(pathname.receipt);
                            }}
                            disabled={formik.values.amount === '' || Object.values(formik.errors).length > 0}
                            size="large"
                        >
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Footer>
        </Spin>
    );
};

// export default TransferScreen;

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(TransferScreen);
