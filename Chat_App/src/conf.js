const conf = {
   appwriteURL : String(import.meta.env.VITE_APPWRITE_URL) ,
   projectID : String(import.meta.env.VITE_PROJECT_ID),
   collectionID : String(import.meta.env.VITE_COLLECTION_ID) ,
   databaseID : String(import.meta.env.VITE_DATABASE_ID) ,
}

export default conf ;