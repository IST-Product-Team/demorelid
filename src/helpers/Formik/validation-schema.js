// import * as Yup from 'yup';

// const ValidationSchema = {
//   transfer: Yup.object({
//     amount: Yup.number().min(100000, `Mininum Limit is 100,000`),
//   }),
//   purchase: Yup.object({
//     amount: Yup.number().min(100000, `Mininum Limit is 100,000`),
//   }),
//   payment: Yup.object({
//     amount: Yup.number().min(100000, `Mininum Limit is 100,000`),
//   }),
// };

// export default ValidationSchema;

import * as Yup from 'yup';
import { useState, useEffect } from 'react';

const getValidationSchema = (minLimit) => ({
  transfer: Yup.object({
    amount: Yup.number().min(minLimit, `Minimum Limit is ${minLimit}`),
  }),
  purchase: Yup.object({
    amount: Yup.number().min(minLimit, `Minimum Limit is ${minLimit}`),
  }),
  payment: Yup.object({
    amount: Yup.number().min(minLimit, `Minimum Limit is ${minLimit}`),
  }),
});

const useFormValidation = () => {
  const [validationSchema, setValidationSchema] = useState(
    getValidationSchema(100000)
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'http://localhost:3000/api/v1/transfer/datalimit'
      );
      const data = await response.json();
      setValidationSchema(getValidationSchema(data.minLimit));
    };

    fetchData();
  }, []);

  return validationSchema;
};

export default useFormValidation;
