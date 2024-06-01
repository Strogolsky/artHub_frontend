import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CreateFolder from './components/Folder/CreateFolder';
import EditFolder from './components/Folder/EditFolder';
import EditPost from './components/Post/EditPost';
import CreatePost from './components/Post/CreatePost';
import MainPage from "./components/Main/MainPage";
import EditAccount from './components/Account/EditAccount';
import NotFound from "./components/Statuses/NotFound";
import ViewFolder from "./components/Folder/ViewFolder";
import ViewPost from "./components/Post/ViewPost";
import ViewAccount from "./components/Account/ViewAccount";
import ScrollToTop from "./components/Helpers/ScrollToTop";
import SearchPage from "./components/Search/SearchPage";
import PreferredTags from "./components/Account/PreferredTags";
import ViewCreatedPosts from './components/Folder/ViewCreatedPosts';

function App() {
  return (
    <Router>
      <div>
        <ScrollToTop />
        <Routes>
          <Route path="/">
            <Route index element={<MainPage />} />
            <Route path="account" element={<ViewAccount />} />
            <Route path="account/edit" element={<EditAccount />} />
            <Route path="account/edit/tags" element={<PreferredTags />} />
            <Route path="post/create" element={<CreatePost />} />
            <Route path="post/:postId" element={<ViewPost />} />
            <Route path="post/:postId/edit" element={<EditPost />} />
            <Route path="folder/:folderId" element={<ViewFolder />} />
            <Route path="post/created" element={<ViewCreatedPosts />} />
            <Route path="folder/:folderId/edit" element={<EditFolder />} />
            <Route path="folder/create" element={<CreateFolder />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
