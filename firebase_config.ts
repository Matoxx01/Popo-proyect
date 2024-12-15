import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
    getAuth, 
    deleteUser as firebaseDeleteUser,
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile,
    sendPasswordResetEmail
} from "firebase/auth";
import firebase from 'firebase/app';
import { getDatabase } from "firebase/database";
import { ref, get } from "firebase/database";
import 'firebase/database';
const firebaseConfig = {
    apiKey: "AIzaSyAx00sUWD8bhkHC6jGCQqswlUkZ8mhoPMk",
    authDomain: "popo-proyect.firebaseapp.com",
    databaseURL:"https://popo-proyect-default-rtdb.firebaseio.com/",
    projectId: "popo-proyect",
    storageBucket: "popo-proyect.firebasestorage.app",
    messagingSenderId: "1057708059663",
    appId: "1:1057708059663:web:5c5137e14a5a535539c77a",
    measurementId: "G-ZCYG7Q6SK1"
  };

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const database = getDatabase(app);

const auth = getAuth(app);

export async function loginUser(mail: string, password: string) {
    try {
        const res = await signInWithEmailAndPassword(auth, mail, password);
        console.log("Inicio de sesión exitoso:", res);
        return { success: true };
    } catch (error: any) {
        console.error("Error durante el inicio de sesión:", error);
        
        let message = 'Hay un error con tu mail o contraseña.';
        if (error.code === 'auth/user-not-found') {
            message = 'Este mail no está registrado.';
        } else if (error.code === 'auth/wrong-password') {
            message = 'Contraseña incorrecta.';
        } else if (error.code === 'auth/invalid-email') {
            message = 'El correo electrónico es inválido.';
        }

        return { success: false, message };
    }
}

export async function getPoop() {
    const dbRef = ref(database, 'poop');
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {

        const data = snapshot.val();
        
        return data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
    } else {
        console.log("No hay popos disponibles");
        return [];
    }
}

export async function registerUser(mail: string, password: string, nick: string) {
    try {
        const res = await createUserWithEmailAndPassword(auth, mail, password);
        const user = res.user;

        await updateProfile(user, { displayName: nick });
        console.log("Usuario registrado y perfil actualizado:", res);
        return { success: true };
    } catch (error: any) {
        console.error("Error durante el registro:", error);
        if (error.code === 'auth/email-already-in-use') {
            return { success: false, message: 'Este mail ya está registrado' };
        }
        return { success: false, message: 'Error durante el registro' };
    }
}

interface ResetPasswordResult {
    success: boolean;
    message?: string;
}

export async function resetPassword(mail: string): Promise<ResetPasswordResult> {
    try {
        await sendPasswordResetEmail(auth, mail);
        return { success: true };
    } catch (error: any) {
        if (error.code === 'auth/user-not-found') {
            return { success: false, message: 'Este mail no está registrado.' };
        }
        return { success: false, message: 'Hay un error con el Mail ingresado.' };
    }
}

export async function deleteUserAccount(user: any) {
    try {
        await firebaseDeleteUser(user);
        return { success: true };
    } catch (error: any) {
        console.error("Error al eliminar la cuenta:", error);
        return { success: false, message: 'No se pudo eliminar la cuenta.' };
    }
}


export { database, auth };