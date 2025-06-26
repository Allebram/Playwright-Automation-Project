import { test, expect } from "@playwright/test";
import { v4 as uuid } from "../../node_modules/uuid/dist/index.js"
import { ArtPage } from "../../page-objects/Final/ArtPage.js"
import { NavObjects } from "../../page-objects/Final/NavObjects.js"
import { CheckOutPage } from "../../page-objects/Final/CheckOutPage.js"
import { LoginPage } from "../../page-objects/Final/LoginPage.js"
import { SignUpPage } from "../../page-objects/Final/SignUpPage.js"
import { DeliveryDetails } from "../../page-objects/Final/DeliveryDetails.js"
import { deliveryDetails as fillinfo } from "../../page-objects/Final/Data/deliveryDetails.js"
import { PaymentPage } from "../../page-objects/Final/PaymentPage.js"
import {paymentPage as fillDetails} from "../../page-objects/Final/Data/paymentPage.js"

test('this is an end to end testing', async ({ page }) => {
    const artPage = new ArtPage(page)
    const navObjects = new NavObjects(page)
    const checkOutPage = new CheckOutPage(page)
    const loginPage = new LoginPage(page)
    const signUpPage = new SignUpPage(page)
    const deliveryDetails = new DeliveryDetails(page)
    const paymentPage = new PaymentPage(page)
    await artPage.Visit()
    await artPage.SortItems()
    await artPage.addToBasket(0)
    await artPage.addToBasket(1)
    await artPage.addToBasket(2)
    await navObjects.GotoCheckOutLink()
    await checkOutPage.RemoveFromBasket()
    await checkOutPage.ContinueToCheckOutPage()
    await loginPage.GoToSignUpPage()

    const newEmail = uuid()
    const email = newEmail + "@gmail.com"
    const password = uuid()
    await signUpPage.SignNewUser(email, password)

    await deliveryDetails.fillDetails(fillinfo)
    await deliveryDetails.savedDetails()
    await deliveryDetails.GotoPayment()

    await paymentPage.ActivateDiscount()
    await paymentPage.PaymentsDetails(fillDetails)
    await paymentPage.CompleteThePayment()
}
)