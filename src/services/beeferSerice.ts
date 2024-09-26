import Beefer from "../models/beefer"
import { getFilleData, saveFilleData } from "../config/filleDataLayer"
export class BefferService{
    public static async createNewBeefer(beeferName: string): Promise<boolean>{
        if(!beeferName)
        {
                return false;
        }        
        const beefer: Beefer = new Beefer(beeferName)
        let beefers:Beefer[]= await getFilleData<Beefer>('beefers') as Beefer[];
        if (!beefers) beefers  = []
        beefer.id = beefers.length + 1;
        beefers.push(beefer);
        saveFilleData<Beefer>('beefers',beefers)
        return true;
    }
    public static async getAllBeefers(): Promise<Beefer[]>{    
        let beefers:Beefer[]= await getFilleData<Beefer>('beefers') as Beefer[];
        if (!beefers) beefers  = []
        return beefers;
    }
    public static async getBeeferById(beeferId :number): Promise<Beefer | boolean>{    
        let beefers:Beefer[]= await getFilleData<Beefer>('beefers') as Beefer[];
        const beefer:Beefer | undefined = beefers.find(b=>b.id == beeferId)
        
        if (!beefer)
        {
            return false
        }
        return beefer;
    }
    public static async getBeeferByStatus(status :string): Promise<Beefer[]>{    
        let beefers:Beefer[]= await getFilleData<Beefer>('beefers') as Beefer[];
        beefers = beefers.filter(b => b.status == status)
        return beefers;
    }
    public static async deleteBeefer(beeferId :number): Promise<boolean>{  
        let beefers:Beefer[]= await getFilleData<Beefer>('beefers') as Beefer[];
        const beeferindex:number = beefers.findIndex(b=>b.id == beeferId)
        console.log(beeferindex);
        if(beeferindex == -1)
        {
            return false;
        }
        beefers.splice(beeferindex,1)
        saveFilleData<Beefer>('beefers',beefers)
        return true;
    }
    public static async updateBeeferStatus(beeferId :number,status :Status): Promise<boolean>{  
        let beefers:Beefer[]= await getFilleData<Beefer>('beefers') as Beefer[];
        const beeferindex:number = beefers.findIndex(b=>b.id == beeferId)
        console.log(beeferindex);
        if(beeferindex == -1)
        {
            return false;
        }
        beefers.splice(beeferindex,1)
        saveFilleData<Beefer>('beefers',beefers)
        return true;
    }
    // public static async findUser(userId: string): Promise<User | undefined>{
    //     let users:User[]= await getFilleData<User>('users') as User[];
    //     let user : User | undefined = users.find(u=>u.id==userId)
    //     console.log(userId);
        
    //     if(user){
    //         return user;
    //     }
    //     return user;
        
    // }
    // public static async folow(followerId: string,followingId:string): Promise<boolean>{
    //     let users:User[]= await getFilleData<User>('users') as User[];
    //     let follower : User | undefined = users.find(u=>u.id==followerId)
    //     const following : User | undefined = users.find(u=>u.id==followingId)
    //     if(!follower||!following){
    //         return false;
    //     }
    //     if(follower.folowing.includes(followingId)){
    //         console.log("כבר עוקב");
            
    //         return false;
    //     }
    //     following.folowers.push(followerId)
    //     follower.folowing.push(followingId)
    //     saveFilleData("users",users)
    //     return true;
        
    // }
}