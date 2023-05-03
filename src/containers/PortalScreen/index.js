import React, { useState, useEffect } from 'react';
import EmailField from '../../components/InputField/EmailField';
import { Col, Row, Button } from 'antd';
import './portal.css';
import swal from 'sweetalert';
const PortalScreen = () => {
  const [buttonDisable, setButtonDisable] = useState(true);
  const [errorMfaValue, setErrorMfaValue] = useState(false);
  const [helperTextMfaValue, setHelperTextMfaValue] = useState(null);
  const [minimumLimit, setMinimumLimit] = useState('');

  // Define your handleUpdateLimit function
  const handleUpdateLimit = async (minimumLimit) => {
    try {
      // Make the API call with fetch()
      const response = await fetch(
        'http://localhost:3000/api/v1/transfer/updatelimit',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ minimum_limit: minimumLimit }),
        }
      );

      // Check if the response is successful
      if (response.ok) {
        // Handle the success response
        const data = await response.json();
        console.log('API response:', data);
        // Show a success message using swal
        swal('Success', 'Limit updated successfully', 'success');
      } else {
        // Handle the error response
        console.error('API error:', response.status);
        // Show an error message using swal
        swal('Error', 'Failed to update limit', 'error');
      }
    } catch (error) {
      // Handle any errors that may occur during the API call
      console.error('API error:', error);
      // Show an error message using swal
      swal('Error', 'Failed to update limit', 'error');
    }
  };

  const updateLimit = () => {
    // Call handleUpdateLimit with the minimumLimit state value
    handleUpdateLimit(minimumLimit);
  };

  return (
    <div>
      <Row>
        <Col className="login-layout">
          <div>
            <div className="login-title">MFA Setting</div>
            <div className="login-subtitle">
              Please login to your account to continue
            </div>
            <div style={{ marginTop: '15px' }}>
              <div className="input-title">MFA Value</div>
              <br />
              <EmailField
                id={'minimumLimit'}
                className="input-field"
                placeholder="Enter MFA Limit"
                value={minimumLimit}
                helperText={
                  helperTextMfaValue !== null ? helperTextMfaValue : null
                }
                error={errorMfaValue}
                onChange={(e) => setMinimumLimit(e.target.value)}
              />

              <Button
                className="login-button"
                onClick={() => {
                  updateLimit();
                }}
                // disabled={buttonDisable}
              >
                Set the minimum MFA Limit
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PortalScreen;
