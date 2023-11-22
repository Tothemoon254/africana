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
import Gallery from './components/Gallery';
import Nav from './components/layout/Nav';
import { Analytics } from '@vercel/analytics/react';
import AudioRecorder from './components/AudioRecorder';
import Account from './components/authentication/Account';
import VoiceNotePage from './components/VoiceNotePage';
import Browse from './components/Browse/Browse';


function App() {

  return (
    <div className="bg-[#FD8D14]">
     <div>
      <Analytics/>
      <AuthContextProvider>
      <FirebaseProvider>
        <Nav/>
        
       
          
        <Routes>
          
          
          <Route
            path='/'
            element={
              
                <Dashboard />
            
            }
          />


          <Route path="/signup" element={ <Signup/> } />
          <Route path="/login" element={ <Login/> } />
          <Route path="/record" element={ <AudioRecorder/> } />
          <Route path="/browse" element={ <Browse/> } />
          
          <Route
            path='/gallery'
            element={
              <ProtectedRoute>
                <Gallery />
              </ProtectedRoute>
            }
          />



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
              
                <ViewArticle/>
              
            }
          />
          <Route
            path='/edit-Article/:articleID'
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
            path='/audio/:VoiceNoteID'
            element={
              
                <VoiceNotePage/>
              
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
