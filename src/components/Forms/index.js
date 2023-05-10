import React from 'react';
import Proptypes from 'prop-types';
import AmountField from './AmountField';
import TwoInputForm from './WithdrawalField';

const Form = ({ formCategory, ...props }) => {
  const forms = {
    transfer: [
      <div key={1}>
        <AmountField {...props} />
      </div>,
    ],
    purchase: [
      <div key={1}>
        <AmountField {...props} />
      </div>,
    ],
    payment: [
      <div key={1}>
        <AmountField {...props} />
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
