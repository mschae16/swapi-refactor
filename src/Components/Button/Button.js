import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const Button = ({ subject, getSubjectData, currentSubject }) => {
  return (
    <button
      className={`subject-btn ${
        currentSubject === subject ? "active-btn" : ""
      }`}
      onClick={() => getSubjectData(subject)}
    >
      {subject}
    </button>
  );
};

Button.propTypes = {
  subject: PropTypes.string,
  getSubjectData: PropTypes.func,
  currentSubject: PropTypes.string
};

export default Button;
