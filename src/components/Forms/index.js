import React from 'react';
import { useState } from 'react';
import Proptypes from 'prop-types';
import AmountFields from './AmountField';
import TwoInputForm from './WithdrawalField';

const Form = ({ formCategory, ...props }) => {
  const forms = {
    transfer: [
      <div key={1}>
        <TwoInputForm {...props} />
      </div>,
    ],
    cashWithdrawal: [
      <div key={1}>
        <TwoInputForm {...props} />
      </div>,
    ],
  };
  return <div>{forms[formCategory]}</div>;
};

Form.propTypes = {
  formCategory: Proptypes.string.isRequired,
};

export default Form;
