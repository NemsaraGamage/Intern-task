import {initializeApp} from "firebase/app"
import {getDatabase} from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyDa_eR_aTMBQ8XgAxzCzk6I95HqT_ahKZg",
    authDomain: "licence-plates.firebaseapp.com",
    databaseURL: "https://licence-plates-default-rtdb.firebaseio.com",
    projectId: "licence-plates",
    storageBucket: "licence-plates.appspot.com",
    messagingSenderId: "143783489161",
    appId: "1:143783489161:web:9347422bc894eff3e6e058"
  };
  

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)