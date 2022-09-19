import { collection, getDocs, query, doc, getDoc, addDoc, deleteDoc, updateDoc, setDoc, where } from "firebase/firestore";
import { db } from './firebase';

// CREATE
export const createItem = async(obj,obj2,obj3) => {
   addDoc(collection(db, 'persons'), {obj,obj2,obj3});
   
}

export const getItems = async() =>{
    const result = await getDocs(query(collection(db, 'persons')));
    return result;
}
export const deleteItem = (id) =>{
  
const docRef = doc(db, "persons", id);
deleteDoc(docRef)
.then(() => {
    console.log("Entire Document has been deleted successfully.")
})
.catch(error => {
    console.log(error);
})
    
}

const getArrayFromCollection = (collection) => {
    return collection.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
    });
}