import conf from '../conf'
import { Client , ID , Storage , Query } from 'appwrite'


export class MyStorage {
    client = new Client() ;
    storage;

    constructor() {
        this.client
        .setEndpoint(conf.appwriteURL) 
        .setProject(conf.projectID)
            
            this.storage = new Storage(this.client)
    }

     async uploadFile(file){
        try {
            //console.log(file);
           
            return await this.storage.createFile(
                conf.bucketID,
                ID.unique(),
                file
            )
            
        } catch (error) {
            console.log("Appwrite service :: uploadFile() " ,error);
            return false ; 
        }
     }

    

     async deleteFile(fileId){
             try {
                await this.storage.deleteFile(conf.bucketID,
                    fileId ,
                    )
                  return true ;   
             } catch (error) {
                console.log("Appwrite service :: deleteFile() " ,error);
            return false ; 
             }
     }

     getFilePreview(fileId){
        return  this.storage.getFilePreview(conf.bucketID, fileId).href;
     }
}

const storage = new MyStorage()
export default storage



