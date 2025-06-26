import * as dotenv from "dotenv"
dotenv.config()
import { test } from "@playwright/test"
import { MyAccountPage } from "../../page-objects/myAccount/MyAccountPage"
import { getLoginToken } from "../../page-objects/myAccount/getLoginToken"
import { adminDetails } from "../../page-objects/myAccount/userDetails"

test('this is an API test', async({page}) => {
    const loginToken = await getLoginToken(adminDetails.username, adminDetails.password)
    console.warn({loginToken})

    const myAccountPage = new MyAccountPage(page)
    await myAccountPage.visit()
    await page.evaluate(([loginTokenIndisdeBrowserCode]) => {
        document.cookie = "token=" + loginTokenIndisdeBrowserCode
    }, [loginToken])
    await myAccountPage.visit()
    await myAccountPage.waitForPageHeading()
})