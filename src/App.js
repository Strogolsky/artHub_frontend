import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CreateFolder from './components/Folder/CreateFolder';
import EditFolder from './components/Folder/EditFolder';
import EditPost from './components/Post/EditPost';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/post/create" element={<EditPost />} />
          <Route path="/folder/create" element={<CreateFolder />} />
          <Route path="/folder/:folderId/edit" element={<EditFolder />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
