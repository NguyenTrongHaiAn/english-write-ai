// src/components/WritingTask.jsx
import React from 'react';

const WritingTask = ({ task }) => {
  return (
    <div className="writing-task">
      <h2>Writing Task</h2>
      <p>{task}</p>
    </div>
  );
};

export default WritingTask;