import { globalVersion } from './app'


function getData() {
    const authors = JSON.stringify([
        { name: "Paulo Coelho", countryOfBirth: "Brazil", yearOfBirth: 1947 },
        { name: "Kahlil Gibran", countryOfBirth: "Lebanon", yearOfBirth: 1883 }
    ]);

    console.log(authors);
    globalVersion++;
}