import { expect } from "@playwright/test"
import {NavObjects} from "../../page-objects/Final/NavObjects"
import {isDesktopViewport} from "../../page-objects/Final/Utils/isDesktopViewport"

export class ArtPage {
    constructor(page) {
        this.page = page
        this.SortDirection = page.getByRole('combobox')
        this.ProductPrice = page.locator('[datatype="product-price"]')
        this.AddtoBasketButton = page.locator('[data-qa="product-button"]')
    }
    Visit = async () => {
        await this.page.goto('http://localhost:2221')
    }
    SortItems = async () => {
        await this.SortDirection.waitFor()
        await this.SortDirection.selectOption('Price ascending')
        const allText = await this.ProductPrice.allInnerTexts()
        const justNumbers = allText.map((text) =>
            parseFloat(text.replace('$', ''))
        )
        // Check if ascending
        const isAscending = justNumbers.every((val, i, arr) => !i || arr[i - 1] <= val)
        expect(isAscending).toBe(true)
    }

    addToBasket = async (index) => {
        const navObjects = new NavObjects(this.page)
        await this.AddtoBasketButton.nth(index).waitFor()
        await expect(this.AddtoBasketButton.nth(index)).toHaveText('Add to Basket')
        let BasketCounterBefore
        if (isDesktopViewport(this.page)) {
            BasketCounterBefore = await navObjects.BasketCounter()
        }
        await this.AddtoBasketButton.nth(index).click()
        await expect(this.AddtoBasketButton.nth(index)).toHaveText('Remove from Basket')
        if (isDesktopViewport(this.page)) {
            const BasketCounterAfter = await navObjects.BasketCounter()   
            expect(BasketCounterAfter).toBeGreaterThan(BasketCounterBefore)     
        }
        
    }
}