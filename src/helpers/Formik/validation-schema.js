import * as Yup from "yup";

const ValidationSchema = {
    transfer: Yup.object({
        amount: Yup.number().min(100000, `Mininum Limit is 100,000`),
    }),
    purchase: Yup.object({
        amount: Yup.number().min(100000, `Mininum Limit is 100,000`),
    }),
    payment: Yup.object({
        amount: Yup.number().min(100000, `Mininum Limit is 100,000`),
    }),
};

export default ValidationSchema;
