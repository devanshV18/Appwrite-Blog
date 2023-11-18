import conf from "../conf.js";
import {Client , ID , Databases , Storage , Query, Account} from "appwrite";

export class DbService{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appWriteProjectId);
        this.databases = new Databases(this.client); 
        this.bucket = new Storage(this.client);
    }
}

const service = new DbService()
export default service