import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import CreateFolder from './components/Folder/CreateFolder';
import EditFolder from './components/Folder/EditFolder';
import EditPost from './components/Post/EditPost';
import CreatePost from './components/Post/CreatePost';
import MainPage from "./components/Main/MainPage";
import EditAccount from './components/User/EditAccount';
import NotFound from "./components/NotFound";
import ViewFolder from "./components/Folder/ViewFolder";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/">
            <Route index element={<MainPage />} />
            <Route path="user/:userId/edit" element={<EditAccount />} />
            <Route path="post/create" element={<CreatePost />} />
            <Route path="post/:postId/edit" element={<EditPost />} />
            <Route path="folder/:folderId" element={<ViewFolder />} />
            <Route path="folder/:folderId/edit" element={<EditFolder />} />
            <Route path="folder/create" element={<CreateFolder />} />
            <Route path="*" element={<NotFound />}/>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
