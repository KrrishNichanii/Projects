import { Client, Databases ,ID ,Query } from "appwrite";
import conf from '../conf'
import storage from "./Storage";


class Database{
    client = new Client();
    databases ; 
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL) 
        .setProject(conf.projectID)
        this.databases = new Databases(this.client) ;
    }

    async createPost({title , content , featuredImage , status , userId ,slug}){
        try {
            return await this.databases.createDocument(conf.databaseID , conf.CollectionID , slug ,
            {
                Title : title ,
                Content: content ,
                featuredImage ,
                status , 
                userId ,
            }
            )
        } catch (error) {
            console.log("Database :: createPost :: ",error);
            return false ; 
        }
    }

    async deletePost(slug){
        try {
            const post =await  this.databases.getDocument(conf.databaseID , conf.CollectionID ,slug) ;
             console.log('While deleting',post);
             await this.databases.deleteDocument(conf.databaseID , conf.CollectionID , slug) ;
             return true ; 
        } catch (error) {
            console.log("Database :: deletePost :: ",error);
        }
    }

    async updatePost(slug , {title  , content , featuredImage , status}){
        try {
           const post = await this.databases.updateDocument(conf.databaseID , conf.CollectionID , slug ,
                {
                    Title : title,
                    Content : content,
                    featuredImage ,
                    status ,
                } )

                return true ; 
        } catch (error) {
            console.log("Database :: updatePost :: ",error);
            return false ;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(conf.databaseID , conf.CollectionID , slug );
        } catch (error) {
            console.log("Database :: getPost :: ",error);
            return false ; 
        }
    }

   

    async getPosts(queries){
        try {
            return await this.databases.listDocuments(
                conf.databaseID ,
                conf.CollectionID,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false
        }
    }
}

const database = new Database();
export default database ; 
