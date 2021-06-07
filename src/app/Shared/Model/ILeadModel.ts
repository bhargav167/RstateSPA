import { ISave } from "./ISave";
import { Images } from "./Images";
import { IUserContact } from "../Model/UserContact/IUserContact";
export interface ILeadModel { 
    all: ISave[];
    updateall: ISave;
    imgs: Images[];
    usercontact:IUserContact[]
}