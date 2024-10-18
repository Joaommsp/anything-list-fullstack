import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBgN0nVefUp5SKTsi8bpdqg2yJ5zNCtISY",
  authDomain: "crud-nest-produtos.firebaseapp.com",
  databaseURL: "https://crud-nest-produtos-default-rtdb.firebaseio.com",
  projectId: "crud-nest-produtos",
  storageBucket: "crud-nest-produtos.appspot.com",
  messagingSenderId: "802647567077",
  appId: "1:802647567077:web:c1d217a800566101ca820c",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
