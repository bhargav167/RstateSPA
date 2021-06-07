export interface IUpdateProfile {
    id:number; 
    userName:string;
    email:string;
    mobileNo:string;
    confirmEmail:boolean;
    confirmMobile: boolean;
    claims: Array<String>;
    roles:Array<String>; 
    brokerFirm: string;
    firmAddress: string;
    firmAddress1: string;
    gstNo: string;
    reraNo: string;
    landlineNo: string;
    mobNo1: string;
    mobNo2: string;
    mobNo3: string;
    mobNo4: string;
    locations: string;
}
