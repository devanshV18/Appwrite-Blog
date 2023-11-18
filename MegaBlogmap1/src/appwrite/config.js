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

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("appwrite error", error);
            return false
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service BT", error);
            return false
        }

    }

    async deletePost (slug) {
        try {
            await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )

            return true

        } catch (error) {
            console.log("appwrite error",error);

            return false
        }

    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite error",error);
            return false
        }

    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                // [Query.equal("status", "active")]
                // or
                queries,
                )
        } catch (error) {
            console.log("appwrite error", error);
            return false
        }
    }

    //file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("appwrite error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId,
            )
        } catch (error) {
            console.log("appwrite error", error);
            return false
        }
    }
}

const service = new DbService()
export default service 