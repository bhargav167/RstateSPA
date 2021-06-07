import { IBasicdetail } from "./IBasicdetail";
import { ILocation } from "./ILocation";  

export interface ISave {
    id:number; 
    basicDetailId: IBasicdetail;
    locationId:ILocation; 
    userId:string; 
    uniqueID:number;
    price:string;
    isConfirmed:boolean;
    isDecline:boolean;
}


