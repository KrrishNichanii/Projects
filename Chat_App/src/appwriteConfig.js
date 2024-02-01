import { Client ,Databases ,Account } from 'appwrite'; 
import conf from './conf';

export const project_ID = '65ae39fcc91d9ac50d3b' ;
export const database_ID = '65ae3cc9efd2fdfd3102' ;
export const collection_ID = '65ae3d1c922ec2c697bb' ;
const client = new Client() ; 
console.log('This is project ID' , conf.projectID);
client
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject('65ae39fcc91d9ac50d3b') ; 

export const databases = new Databases(client);
export const account = new Account(client) ; 
export default client ;
