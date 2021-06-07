export interface IBasicdetail {
    Id:number;
    wantTo:string;
    propertadyAge:string;
    AreaUnit:string;
    AvalableFrom:string;
    CarpetArea:number;
    ConstructionType:string;
    length:string;
    Maintainescharge:string;
    plotPrice:number;
    FloorRange:string;
    PossesionType:string;
    SecurityDeposite:string;
    SecurityDepositeAmt:number;
    TransactionType:string;
    Wfr:string;
    Width:string;
    Balconey:string;
    Bathroom:string;
    Bhk:string;
    Brockage:string;
    BrockageAmt:number;
    BuildUpArea:number;
    coverParking:string;
    furnishedTyppe:string;
    MonthlyRent:number;
    openParking:string;
    teneandType:string;
    propertyType:string;
    PloatArea:number;

    // PG DETAILS
    PgName: string;
    ToatalBed:number;
    PgFor: string;
    PgSuitedFor: string;
    MealAvalable: string;
    NoticePeriod: number;
    LockPeriod:number
    CommonArea: string[];
    PropertyManageBy: string;
    PropertyManageStay: string;
    NonVegAllowed: string;
    OppositeSex: string;
    AnyTimeAllowed: string;
    VisitorAllowed: string;
    GardianAllowed: string;
    DrinkingAllowed: string;
    SmokingAllowed: string;
    
    RoomType:string;
    PGRent:number;
    BedInRoom:number;
    PgSecurityDeposite:number;
    FacilitiesOffered:string; 
    securityAmenities:string;
    AllowedTime:string
}