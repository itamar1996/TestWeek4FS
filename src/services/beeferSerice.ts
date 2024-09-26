import Beefer from "../models/beefer"
import statusenum from "../models/statusEnum"
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
    public static async updateBeeferStatus(beeferId: number, status: string): Promise<boolean> { 
            let beefers: Beefer[] = await getFilleData<Beefer>('beefers') as Beefer[];
            const beefer: Beefer | undefined = beefers.find(b => b.id == beeferId);
            if (!beefer) {
                return false;
            }        
            beefer.status = status
            saveFilleData('beefers',beefers)
            return true;
    }
    
    public static async explosionBeeferUpdate(beeferId: number,lon:number,lat:number): Promise<boolean> { 
        let beefers: Beefer[] = await getFilleData<Beefer>('beefers') as Beefer[];
        const beefer: Beefer | undefined = beefers.find(b => b.id == beeferId);
        if (!beefer) {
            return false;
        }
        beefer.latitude = lat;
        beefer.longitude = lon;
        return new Promise((resolve) => {
            setTimeout(() => {
                beefer.status = statusenum.detonated;
                resolve(true);
                beefer.detonated_at = new Date
                saveFilleData('beefers',beefers)          
            }, 5000);
        });
    }
    public static async explosionBeefer(beeferId: number): Promise<boolean|void> { 
        let beefers: Beefer[] = await getFilleData<Beefer>('beefers') as Beefer[];
        const beefer: Beefer | undefined = beefers.find(b => b.id == beeferId);
        if (!beefer) {
            return false;
        }    
        console.log("bummmmm");
        
        return new Promise((resolve) => {
            setTimeout(() => {
                beefer.status = statusenum.detonated;
                console.log("fewd",beefer.status);
                
                resolve(true);
                beefer.detonated_at = new Date
                saveFilleData('beefers',beefers)          
            }, 5000);
        });
    }
    
    
}