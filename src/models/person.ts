
class Person {
   public id:number = 0
   public status :boolean = true
   public detonated_at:Date | null = null
   public beeferId : number = 0
    constructor(
       public name:string
    ) {
        
    }
}

export default Person