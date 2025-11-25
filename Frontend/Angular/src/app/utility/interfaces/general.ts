export interface UserRegister {
	fName: string;
	lName: string;
	dob: string;
	email: string;
	mobile: string | number;
	password: string;
}


export interface UserInfoStructure {
	qualification: string;
	role: string;
	experience: string;
	skills: string;
	address: Address
}

interface Address {
	street: string;
	city: string;
	state: string;
	country: string;
	pincode: string | number;
}