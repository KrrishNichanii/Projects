const conf = {
        appwriteURL : String(import.meta.env.VITE_URL) , 
        databaseID : String(import.meta.env.VITE_DATABASE_ID) ,
        CollectionID : String(import.meta.env.VITE_COLLECTION_ID) ,
        bucketID : String(import.meta.env.VITE_BUCKET_ID) ,
        projectID : String(import.meta.env.VITE_PROJECT_ID) ,
        apiKey : String(import.meta.env.VITE_API_KEY) ,
}


export default conf