import React from 'react';
import Proptypes from 'prop-types';
import AmountFields from './AmountField';
import TwoInputForm from './WithdrawalField';

const Form = ({ formCategory, nominal, ...props }) => {
  const forms = {
    transfer: [
      <div key={1}>
        <AmountFields nominal={nominal} {...props} />
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
