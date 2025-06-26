import { faker } from "@faker-js/faker"

export const deliveryDetails = {
    fname: faker.person.firstName(),
    lname: faker.person.lastName(),
    street: faker.location.streetAddress(),
    pcode: faker.location.zipCode(),
    city: faker.location.city(),
    country: "Philippines"
}