export default class ContactDetail {
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    StoreNumber: string    

    constructor(data: any) {
        this.FirstName = data.FirstName;
        this.LastName = data.LastName;
        this.PhoneNumber = data.PhoneNumber;
        this.StoreNumber = data.StoreNumber;
    }
}