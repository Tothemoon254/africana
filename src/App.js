import logo from './logo.svg';
import { AuthContextProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/Protectedroute';
import './App.css';
import Dashboard from "./components/home/Dashboard";
import WriteArticle from "./components/home/WriteArticle";
import MyArticles from "./components/home/MyArticles";
import ViewArticle from "./components/home/ViewArticle";
import EditArticle from "./components/home/EditArticle";

function App() {
  return (
    <div className="App">
     <div>
      <AuthContextProvider>

        
       
          
        <Routes>
          
          
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='/writeArticles'
            element={
              <ProtectedRoute>
                <WriteArticle />
              </ProtectedRoute>
            }
          />
          <Route
            path='/myarticles'
            element={
              <ProtectedRoute>
                <MyArticles/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/viewArticle'
            element={
              <ProtectedRoute>
                <ViewArticle/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/editArticle'
            element={
              <ProtectedRoute>
                <EditArticle/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/editArticle'
            element={
              <ProtectedRoute>
                <EditArticle/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/editArticle'
            element={
              <ProtectedRoute>
                <EditArticle/>
              </ProtectedRoute>
            }
          />
           
        </Routes>
        
      </AuthContextProvider>
      
    </div>

    </div>
  );
}

export default App;
