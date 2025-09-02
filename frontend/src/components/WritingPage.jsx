// src/App.jsx
import React, { useState } from 'react';
import WritingTask from './writings/WritingTask.jsx';
import TextInput from './writings/TextInput';
import './WritingPage.css';

function WritingPage() {
  // Đề bài mẫu - bạn có thể thay đổi hoặc lấy từ API sau này
  const [task, setTask] = useState(
    'Some people think that technology is making people more sociable. To what extent do you agree or disagree?'
  );

  return (
    <div className="app-container">
      <WritingTask task={task} />
      <TextInput />
    </div>
  );
}

export default WritingPage;