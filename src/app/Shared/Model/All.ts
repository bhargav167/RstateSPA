import { ISave } from "./ISave";
import { Images } from "./Images";

export interface All { 
    all: ISave[];
    updateall: ISave;
    imgs: Images[]; 
}