import firebase from "./FirebaseConfig";

const auth = firebase.auth();

const registerUser = (email: string, password: string) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

const loginUser = (email: string, password: string) => {
  return auth.signInWithEmailAndPassword(email, password);
};

const logoutUser = () => {
  return auth.signOut();
};

const sendPasswordResetEmail = (email: string) => {
  return auth.sendPasswordResetEmail(email);
};

const loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  return auth.signInWithPopup(provider);
};

const subscribeToAuthChanges = (
  handleAuthChange: (user: firebase.User | null) => void
) => {
  auth.onAuthStateChanged((user: firebase.User | null) => {
    handleAuthChange(user);
  });
};

const FirebaseAuthService = {
  registerUser,
  loginUser,
  logoutUser,
  sendPasswordResetEmail,
  loginWithGoogle,
  subscribeToAuthChanges,
};

export default FirebaseAuthService;
