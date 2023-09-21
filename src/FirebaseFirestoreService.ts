import firebase from "./FirebaseConfig";
import { WhereFilterOp } from "@firebase/firestore-types";
const firestore = firebase.firestore();

const createDocument = (
  collection: string,
  document: firebase.firestore.DocumentData
) => {
  return firestore.collection(collection).add(document);
};

const readDocuments = ({
  collection,
  queries,
}: {
  collection: string;
  queries: { field: string; condition: WhereFilterOp; value: boolean }[];
}) => {
  let collectionRef: firebase.firestore.Query<firebase.firestore.DocumentData> =
    firestore.collection(collection);
  if (queries && queries.length > 0) {
    for (const query of queries) {
      collectionRef = collectionRef.where(
        query.field,
        query.condition,
        query.value
      );
    }
  }
  return collectionRef.get();
};

const FirebaseFirestoreService = {
  createDocument,
  readDocuments,
};

export default FirebaseFirestoreService;
