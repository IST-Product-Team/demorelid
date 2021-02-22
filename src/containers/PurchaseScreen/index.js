import React from 'react';
import { useFormik } from 'formik';
import { Layout, Row, Col, Button } from 'antd';

import { initialValues, validationSchema } from '../../helpers/Formik';
import Container from '../../components/Container';
import Form from '../../components/Forms';
import pathname from '../../pathnameCONFIG';

const { Footer } = Layout;

const PurchaseScreen = () => {
    const formik = useFormik({
        initialValues: initialValues.purchase,
        validationSchema: validationSchema.purchase,
    });
    React.useEffect(() => {
        console.log('formik', formik);
    }, [formik]);

    return (
        <>
            <Container title="Purchase" subtitle="Purchase X product">
                <Form formCategory="purchase" {...formik} />
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
                                window.location.assign(pathname.receipt);
                            }}
                            disabled={
                                formik.values.amount === '' ||
                  Object.values(formik.errors).length > 0
                            }
                            size="large"
                        >
                Submit
                        </Button>
                    </Col>
                </Row>
            </Footer>
        </>
    );
};

export default PurchaseScreen;
