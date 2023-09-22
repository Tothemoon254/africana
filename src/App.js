import { AuthContextProvider } from './contexts/AuthContext';
import { FirebaseProvider } from "./contexts/FirebaseContext";
import ProtectedRoute from './components/Protectedroute';
import {Routes, Route } from 'react-router-dom';
import Dashboard from "./components/home/Dashboard";
import WriteArticle from "./components/home/WriteArticle";
import MyArticles from "./components/home/MyArticles";
import ViewArticle from "./components/home/ViewArticle";
import EditArticle from "./components/home/EditArticle";
import Signup from './components/authentication/Signup'
import Login from "./components/authentication/Login";

function App() {
  return (
    <div className="bg-[#FD8D14]">
     <div>
     
      <AuthContextProvider>
      <FirebaseProvider>
        
       
          
        <Routes>
          
          
          <Route
            path='/'
            element={
              
                <Dashboard />
            
            }
          />


          <Route path="/signup" element={ <Signup/> } />
          <Route path="/login" element={ <Login/> } />


          <Route
            path='/write'
            element={
              <ProtectedRoute>
                <WriteArticle />
              </ProtectedRoute>
            }
          />
          <Route
            path='/my-articles'
            element={
              <ProtectedRoute>
                <MyArticles/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/article/:articleID'
            element={
              <ProtectedRoute>
                <ViewArticle/>
              </ProtectedRoute>
            }
          />
          <Route
            path='/editArticle/:articleID'
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
        </FirebaseProvider>
      </AuthContextProvider>
  
      
    </div>

    </div>
  );
}

export default App;
