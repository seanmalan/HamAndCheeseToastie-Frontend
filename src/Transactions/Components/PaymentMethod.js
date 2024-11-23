import React from "react";
import PropTypes from "prop-types";

const PaymentMethod = ({ paymentMethod }) => {
  const getPaymentMethodName = (method) => {
    switch (method) {
      case 0:
        return "Cash";
      case 1:
        return "Credit Card";
      case 2:
        return "Debit Card";
      case 3:
        return "Mobile Payment";
      case 4:
        return "Gift Card";
      case 5:
        return "Bank Transfer";
      default:
        return "Unknown";
    }
  };

  return <span>{getPaymentMethodName(paymentMethod)}</span>;
};

PaymentMethod.propTypes = {
  paymentMethod: PropTypes.number.isRequired, // Expecting a number for paymentMethod
};

export default PaymentMethod;
