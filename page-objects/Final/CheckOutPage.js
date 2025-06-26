import { NavObjects } from "../../page-objects/Final/NavObjects"
import { expect } from "@playwright/test"
import {isDesktopViewport} from "../../page-objects/Final/Utils/isDesktopViewport"

export class CheckOutPage {
    constructor(page) {
        this.page = page
        this.BasketCard = page.locator('[data-qa="basket-card"]')
        this.ItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.RemoveFromBasketButton = page.locator('[data-qa="basket-card-remove-item"]')
        this.ContinuetoCheckoutButton = page.getByRole('button', { name: 'Continue to Checkout' })

    }
    RemoveFromBasket = async () => {
        const navObjects = new NavObjects(this.page)
        let Basketbefore
        if(isDesktopViewport(this.page)){
            Basketbefore = await navObjects.BasketCounter()    
        }
        
        for (let i = 0; i < 3; i++) {
            await this.BasketCard.nth(i).waitFor()
            await this.ItemPrice.nth(i).waitFor()
            await this.RemoveFromBasketButton.nth(i).waitFor()
        }
        const text = await this.ItemPrice.allInnerTexts()
        const JustNumber = text.map((element) => {
            const withoutDollar = element.replace("$", "")
            return parseInt(withoutDollar, 10)
        })
        const lowestNum = Math.min(...JustNumber)
        const lowestLocation = JustNumber.indexOf(lowestNum)
        const removeButton = this.RemoveFromBasketButton.nth(lowestLocation)
        await removeButton.click()
        await this.page.waitForTimeout(500)
        if (isDesktopViewport(this.page)){
            const Basketafter = await navObjects.BasketCounter()
            await expect(Basketafter).toBeLessThan(Basketbefore)
        }
        

    }
    ContinueToCheckOutPage = async () => {
        await this.ContinuetoCheckoutButton.waitFor()
        await this.ContinuetoCheckoutButton.click()
        await this.page.waitForURL(/\/login/)
    }
}