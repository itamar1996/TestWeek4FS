import { getFilleData, saveFilleData } from "../config/filleDataLayer"
import Person from "../models/person";
export class personService{

    public static async createNewPerson(personName: string): Promise<boolean>{
        if(!personName)
        {
                return false;
        }        
        const beefer: Person = new Person(personName)        
        let persons:Person[]= await getFilleData<Person>('persons') as Person[];
        if (!persons) persons  = []
        beefer.id = persons.length + 1;
        persons.push(beefer);
        saveFilleData<Person>('persons',persons)
        return true;
    }


    public static async updatePerson(personId: number,beeferId:number): Promise<boolean>{
        let persons:Person[]= await getFilleData<Person>('persons') as Person[];        
        const person:Person | undefined = persons.find(p=>p.id == personId)
        if (!person)
        {
            return false
        }
        person.beeferId = beeferId;
        saveFilleData('persons',persons)
        return true;
    }

}