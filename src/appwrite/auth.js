import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client=new Client();
    account;
    
    constructor(){
        this.client
          .setEndpoint(conf.appwrite_URL)
          .setProject(conf.appwrite_PROJECT_ID);
        this.account=new Account(this.client)
    }
    
    async accountCreate({email, password, name}){
      try{
        const userAccount=await this.account.create(ID.unique(), email, password, name);
        if(userAccount){
          //SUCCESSFULL LOGIN
          return this.login(email,password);
        }
        else{
          return userAccount;
        }
      }
      catch(error){
        throw error;
      }
    }

    async login({email, password}){
      try{
      return await this.account.createEmailPasswordSession(email, password);
      }
      catch(error){
        throw error;
      }
      
    }

    async getCurrentUser(){
      try{
        return await this.account.get();
      }
      catch(error){
        console.log("Appwrite service::getUser",error);
      }
      return null;
    }

    async logout(){
      try{
        return await this.account.deleteSessions();
      }
      catch(error){
        console.log("Appwrite service::Logout error",error);
        throw error;
      }
    }

}

const authService=new AuthService()

export default authService;