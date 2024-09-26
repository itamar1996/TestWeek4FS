import Status from "./statusEnum";


class Beefer {
   public id:number = 0
   public status :string  = Status[0]
   public created_at :Date
   public detonated_at:Date | null = null;
   public longitude : Number  = 0
   public latitude : Number =  0
    constructor(
       public name:string
    ) {
        this.created_at = new Date
    }
}

export default Beefer