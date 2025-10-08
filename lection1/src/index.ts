

const prompt = require("prompt-sync")();

type UserData = {
    userName: string;
    birthDate: Date;
    phoneNumber: number;
    bio: string | null;
    job: string | null;
    confirmed: string;
};

function getUserData(): UserData{
    let userName = "";
    do{
        userName = prompt("Enter your name: ").trim();
        if (userName === "") {
            console.log("Name can't be empty");
        }
    } while (!userName);

    let birthDate: Date;
    do {
        let dateInput = prompt("Enter your birth date (yyyy-mm-dd): ").trim();
        birthDate = new Date(dateInput);
        if (isNaN(birthDate.getTime())) {
            console.log("Incorrect date format");
        }
    } while (isNaN(birthDate.getTime()));

    let phoneNumber: number;
    let phoneInput: string;
    do {
        phoneInput = prompt("Enter your phone number (7 digits after +380): ").trim();
        phoneNumber = Number(phoneInput);
        if (phoneInput ==="" || phoneInput.length !== 7 || phoneNumber <= 0) {
            console.log("Wrong phone number");
        }
    } while (isNaN(phoneNumber) || phoneInput.length !== 7 || phoneNumber <= 0);

    let bio = prompt("Write a short bio about yourself: ") || null;
    let job = prompt("Where do you work?: ") || null;
    let confirmed = prompt("Are you sure? (y/n): ", "y").toLowerCase();

    return {userName, birthDate, phoneNumber, bio, job, confirmed};
}

function showGreetings(userData : UserData) {
    if (userData.confirmed.toLowerCase() === "y") {
            console.log(`Hello, ${userData.userName}!\n
                Birth Date - ${userData.birthDate};\n
                Phone number - +380 ${userData.phoneNumber};\n
                About you - ${userData.bio || "no information"};\n
                Job - ${userData.job || "no information"};\n
                Come back later!`);
        } else {
            console.log("Bye!");
        };
}


showGreetings(getUserData());
