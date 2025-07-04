import {isDesktopViewport} from "../../page-objects/Final/Utils/isDesktopViewport"

export class NavObjects {
    constructor(page) {
        this.page = page
        this.BasketCount = page.locator('[data-qa="header-basket-count"]')
        this.CheckOutButton = page.getByRole('link', { name: 'Checkout' })
        this.MobileBurgerButton = page.locator('[data-qa="burger-button"]')
    }
    BasketCounter = async () => {
        await this.BasketCount.waitFor()
        const text1 = await this.BasketCount.innerText()
        return parseInt(text1, 10)
    }
    GotoCheckOutLink = async () => {
        if (!isDesktopViewport(this.page)) {
        await this.MobileBurgerButton.waitFor()
        await this.MobileBurgerButton.click()
        }
        await this.CheckOutButton.waitFor()
        await this.CheckOutButton.click()
        await this.page.waitForURL(/\/basket/)
    }
}