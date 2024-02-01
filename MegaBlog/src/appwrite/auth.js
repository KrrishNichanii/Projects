import conf from '../conf'
import { Client, Account , ID } from "appwrite";

class AuthService{
    client = new Client() ;
    account ; 
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.projectID);
        this.account = new Account(this.client) ;  
    }

    async createAccount({email , password , username}){
        try {
             const user =  await this.account.create(ID.unique() , email , password , username) ; 
             if(user){
                this.login({email , password}) ;
             }
             else return user 

        } catch (error) {
            console.log("AuthService :: createAccount :: " + error);
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get() ; 
        } catch (error) {
            console.log("AuthService :: getCurrentUser :: ",error);
        }

        return null ; 
    }

    async login({email , password}){
        try {
            return await this.account.createEmailSession(email , password) ; 
        } catch (error) {
            console.log("AuthService :: login :: ",error);
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions() ;  
        } catch (error) {
            console.log("AuthService :: logout :: ",error);
            return false  ;
        }
    }


     
}
const authService = new AuthService() ;
export default authService ; 

