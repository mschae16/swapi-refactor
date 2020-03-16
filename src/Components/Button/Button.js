import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const Button = ({ subject, getSubjectData, currentSubject }) => {
  const currentlyActive =
    currentSubject === subject ? "subject-btn active-btn" : "subject-btn";

  return (
    <button className={currentlyActive} onClick={() => getSubjectData(subject)}>
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
