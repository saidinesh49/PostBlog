import conf from "../conf/conf";
import { Client, Databases, Storage, ID, Query} from "appwrite";

export class Service{
    client=new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwrite_URL)
            .setProject(conf.appwrite_PROJECT_ID);

        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
          return await this.databases.createDocument(
                '669942e6001175c2ebf7',
                conf.appwrite_COLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        }
        catch(error){
            console.log("Appwrite service:: createPost error ::",error);
        }     
    }

    async updatePost(slug,{title, content, featuredImage, status}){
        try{
         return await this.databases.updateDocument(
                    '669942e6001175c2ebf7',
                    conf.appwrite_COLLECTION_ID,
                    slug,
                    {
                        title,
                        content,
                        featuredImage,
                        status
                    }
                );
        }
        catch(error){
            console.log("Appwrite service::updating Post ::",error);
        }
    }

    async deletePost(slug){
        try{
            return await this.databases.deleteDocument(
                '669942e6001175c2ebf7',
                conf.appwrite_COLLECTION_ID,
                slug
            );
            return true;
        }
        catch(error){
            console.log("Appwrite service::Deleting::",error);
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                '669942e6001175c2ebf7',
                conf.appwrite_COLLECTION_ID,
                slug
            );
        }
        catch(error){
            console.log("Appwrite service:: getting post::",error);
            return false
        }
    }

    async getPosts(queries=[Query.equal("status","active")]){
        try{
            return await this.databases.listDocuments(
                '669942e6001175c2ebf7',
                conf.appwrite_COLLECTION_ID,
                queries
            );
        }
        catch(error){
            console.log("Appwrite service::Posts::",error);
        }
    }

    async uploadFile(file){
        const idunique=ID.unique();
        try{
            await this.bucket.createFile(
                conf.appwrite_BUCKET_ID,
                idunique,
                file
            );
            return idunique;
        }
        catch(error){
            console.log("Appwrite service::while uploading::",error);
            return false
        }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwrite_BUCKET_ID,
                fileId
            );
            return true
        }
        catch(error){
            console.log("Appwrite service::while deleting::",error);
            return false
        }
    }

    getFilePreview(fileId){
        try {
           return this.bucket.getFilePreview(
            conf.appwrite_BUCKET_ID,
            fileId
            );
        }
        catch(error){
            console.log("Appwrite service::while getting file preview::",error);
            return false
        }
    }
}

const service=new Service();

export default service