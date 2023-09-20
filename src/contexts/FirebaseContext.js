import React, { useState, useEffect, useContext, createContext } from "react";
import { db } from "../firebase.config";
import { UserAuth } from "./AuthContext";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
  updateDoc,
  where,
  getDoc,
  increment
  
} from "firebase/firestore";


const FirebaseContext = createContext();

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const FirebaseProvider = ({ children }) => {
  const { currentUser } = UserAuth();

  const postArticle = async (data) => {
    const doc = collection(db, "articles");
    try {
      await addDoc(doc, data);
      console.log("Document successfully written!");
      // You can return a success message or any other relevant data here
    } catch (error) {
      console.error("Error writing document: ", error);
      // Handle the error here, you can throw or return an error message
    }
  };

  const getAllPublicArticles = async () => {
    try {
      const articlesCollection = collection(db, "articles");
      const q = query(
        articlesCollection,
        where("visibility", "==", "public"),
        orderBy("when", "desc")
      );
  
      const querySnapshot = await getDocs(q);
  
      const publicArticles = [];
      querySnapshot.forEach((doc) => {
        publicArticles.push({
          id: doc.id,
          data: doc.data(),
        });
      });
  
      return publicArticles;
    } catch (error) {
      console.error("Error fetching public articles:", error);
      throw error; // You can choose to re-throw the error or handle it as needed
    }
  };

  //Might need to use dtabase isnsted of firestore here keep that inmind future Max
  const getMyArticles = async () => {
    try {
      const articlesCollection = collection(db, "articles");
      const q = query(
        articlesCollection,
        where("authorID", "==", currentUser.uid),
        orderBy("when", "desc")
      );
  
      const querySnapshot = await getDocs(q);
  
      const myArticles = [];
      querySnapshot.forEach((doc) => {
        myArticles.push({
          id: doc.id,
          data: doc.data(),
        });
      });
  
      return myArticles;
    } catch (error) {
      console.error("Error fetching my articles:", error);
      throw error; // You can choose to re-throw the error or handle it as needed
    }
  };

  const getSpecificArticle = async (articleID) => {
    try {
      const articlesCollection = collection(db, "articles");
      const querySnapshot = await getDocs(
        where(articlesCollection, "articleID", "==", articleID)
      );
  
      const articles = [];
      querySnapshot.forEach((doc) => {
        articles.push({
          id: doc.id,
          data: doc.data(),
        });
      });
  
      return articles;
    } catch (error) {
      console.error("Error fetching specific article:", error);
      throw error; // You can choose to re-throw the error or handle it as needed
    }
  };

  const giveAStar = async (docID) => {
    try {
      const docRef = doc(db, "articles", docID);
  
      // Fetch the current document data
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        // Get the current value of the "stars" field
        const currentStars = docSnap.data().stars || 0; // Default to 0 if the field doesn't exist
  
        // Increment the value by one
        const newStars = currentStars + 1;
  
        // Update the document with the new value
        await updateDoc(docRef, { stars: increment(1) });
  
        console.log("Document updated successfully.");
      } else {
        // Handle the case where the document doesn't exist
        throw new Error("Document not found");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
      throw error; // You can choose to re-throw the error or handle it as needed
    }
  };
  

  const postComment = async (data) => {
    try {
      const commentsCollection = collection(db, "comments");
      const docRef = await addDoc(commentsCollection, data);
      console.log(`Comment added with ID: ${docRef.id}`);
      return docRef.id; // Return the ID of the newly added comment if needed
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error; // You can choose to re-throw the error or handle it as needed
    }
  };

  const getComments = async (articleID) => {
    try {
      const commentsCollection = collection(db, "comments");
      const commentsQuery = query(
        commentsCollection,
        where("articleID", "==", articleID),
        orderBy("when")
      );
      
      const querySnapshot = await getDocs(commentsQuery);
      
      const comments = [];
      querySnapshot.forEach((doc) => {
        comments.push({
          id: doc.id,
          data: doc.data(),
        });
      });
  
      return comments;
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw error; // You can choose to re-throw the error or handle it as needed
    }
  };

  const deleteArticle = async (docID) => {
    try {
      const articleRef = doc(db, 'articles', docID)
      await deleteDoc(articleRef);
      console.log(`Document with ID ${docID} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting document with ID ${docID}:`, error);
      throw error; // You can choose to re-throw the error or handle it as needed
    }
  };

  const editArticle = async (docID, data) => {
    try {
      const articleRef = doc(db, 'articles', docID)
      
      await updateDoc(articleRef, {
        "content.title": data.title,
        "content.subtitle": data.subtitle,
        "content.articleContent": data.articleContent,
        visibility: data.visibility,
      });
      console.log(`Document with ID ${docID} updated successfully.`);
    } catch (error) {
      console.error(`Error updating document with ID ${docID}:`, error);
      throw error; // You can choose to re-throw the error or handle it as needed
    }
  };

  const deleteComment = (docID) => {

    const docRef = doc(db, "comments", docID);

    return deleteDoc(docRef);
    
  };

  // const addToDatabase = (data) => {
  //   return database.collection("sample").add(data);
  // };

  // const readFromDatabase = () => {
  //   return database
  //     .collection("sample")
  //     .where("id", "==", currentUser.uid)
  //     .get();
  // };

  const value = {
    postArticle,
    getAllPublicArticles,
    getMyArticles,
    getSpecificArticle,
    giveAStar,
    postComment,
    getComments,
    deleteArticle,
    editArticle,
    deleteComment,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};