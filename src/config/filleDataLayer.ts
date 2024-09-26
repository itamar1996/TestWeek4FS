import fs from 'fs/promises'

export const getFilleData= async<T> (resource :string):Promise<T[] | void>=>{
    try {
        const data: string = await fs.readFile(`${__dirname}/../../data/${resource}.json`, 
            "utf-8");
            console.log(data);
            
        const parsedata:T[] = JSON.parse(data);
        return parsedata;
    } catch (error) {
      console.log(error);
    }
}
export const saveFilleData= async<T> (resource :string,data:T[]):Promise<boolean>=>{
    try {
        const stringdata:string = JSON.stringify(data);
        await fs.writeFile(`${__dirname}/../../data/${resource}.json`,stringdata,{
            encoding:'utf-8'
        })
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}