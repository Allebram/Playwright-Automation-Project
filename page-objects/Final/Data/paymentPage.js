import {faker} from "@faker-js/faker"
const futureDate = faker.date.future()
const mm = String(futureDate.getMonth() + 1).padStart(2, "0") // Month
const yy = String(futureDate.getFullYear()).slice(-2)         // Year

export const paymentPage = {
  owner: faker.person.fullName(),
  number: "0987654321654321",
  validity: `${mm}${yy}`, // e.g., "0827"
  cvc: faker.finance.creditCardCVV(),
}