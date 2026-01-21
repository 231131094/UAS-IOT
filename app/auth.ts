
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export async function register(email:string, password : string) {
    try{
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        return userCredential.user
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any){
        throw new Error(error.message)
    }
    
}
export async function login(email:string, password : string) {
    try{
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        return userCredential.user
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any){
        throw new Error(error.message)
    }
    
}