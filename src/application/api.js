import {
  collection,
  getDocs,
  query,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import axios from "axios";

// CREATE
export const createItem = async (obj, obj2, obj3, imagen) => {
  if (imagen === undefined) {
    addDoc(collection(db, "persons"), { obj, obj2, obj3 });
  } else {
    addDoc(collection(db, "persons"), { obj, obj2, obj3, imagen });
  }
};

export const getItems = async () => {
  const result = await getDocs(query(collection(db, "persons")));
  return result;
};
export const deleteItem = (id) => {
  const docRef = doc(db, "persons", id);
  deleteDoc(docRef)
    .then(() => {
      console.log("Entire Document has been deleted successfully.");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getFoto = async (palabra) => {
  await axios
    .get(
      "https://api.giphy.com/v1/gifs/search?api_key=7gM6DDxpzNDtKV1TFv9yVaJuloTe5HDG&q=" +
        palabra
    )
    .then((response) => {
      console.log(response.data.data[0].images.downsized.url);
      let b = response.data.data[0].images.downsized.url;
      return b;
    });
  /* 
    fetch("https://api.giphy.com/v1/gifs/search?api_key=7gM6DDxpzNDtKV1TFv9yVaJuloTe5HDG&q="+palabra)
  .then(function(response) {
    return response.json();
    
  }).then((data) => {
   console.log(data.data[0].images.hd.mp4)
   let b = data.data[0].images.hd.mp4;
   let c = "'"+b+"'";
   return c;
  })
  .catch(function() {
    // handle the error
  }); */
};

export const updateItem = async (id,obj) =>
{
    await updateDoc(doc(db,"persons",id),{obj})
};
export const updateItemMoney = async (id,obj2) =>
{
    await updateDoc(doc(db,"persons",id),{obj2})
};
export const updateItemDate = async (id,obj3) =>
{
    await updateDoc(doc(db,"persons",id),{obj3})
};
const getArrayFromCollection = (collection) => {
  return collection.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
};
