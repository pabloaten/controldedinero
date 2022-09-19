import { collection, getDocs, query, doc, getDoc, addDoc, deleteDoc, updateDoc, setDoc, where } from "firebase/firestore";
import { db } from './firebase';

// CREATE
export const createItem = async(obj,obj2) => {
   addDoc(collection(db, 'persons'), {obj,obj2});
   
}

export const getItems = async() =>{
    const result = await getDocs(query(collection(db, 'persons')));
    return result;
}

const getArrayFromCollection = (collection) => {
    return collection.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
    });
}