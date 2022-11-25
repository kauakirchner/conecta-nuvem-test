import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config';
import { getAnalytics } from "firebase/analytics";

export const registerFirebase = () => {
    const firebaseApp = initializeApp(firebaseConfig);
    const analytics = getAnalytics(firebaseApp);
    return analytics
}