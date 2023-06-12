import firebase from "./FirebaseConfig";
const firestore = firebase.firestore();

const createDocument = (
  collection: string,
  document?: firebase.firestore.DocumentData
) => {
  if (document) {
    return firestore.collection(collection).add(document);
  }
  return firestore.collection(collection);
};

const FirebaseFirestoreService = {
  createDocument,
};

export default FirebaseFirestoreService;
