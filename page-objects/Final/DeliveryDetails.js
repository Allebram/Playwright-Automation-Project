import { expect } from "@playwright/test"

export class DeliveryDetails {
    constructor(page) {
        this.page = page
        this.FirstName = page.getByRole('textbox', { name: 'First name' })
        this.LastName = page.getByRole('textbox', { name: 'Last name' })
        this.Street = page.getByRole('textbox', { name: 'Street' })
        this.PostCode = page.getByRole('textbox', { name: 'Post Code' })
        this.City = page.getByRole('textbox', { name: 'City' })
        this.Country = page.getByRole('combobox')
        this.SaveAddressButton = page.getByRole('button', { name: 'Save address for next time' })
        this.SavedAddressContainer = page.locator('[data-qa="saved-address-container"]')

        this.SaveAddressFname = page.locator('[data-qa="saved-address-firstName"]')
        this.SaveAddressLname = page.locator('[data-qa="saved-address-lastName"]')
        this.SaveAddressStreet = page.locator('[data-qa="saved-address-street"]')
        this.SaveAddressPcode = page.locator('[data-qa="saved-address-postcode"]')
        this.SaveAddressCity = page.locator('[data-qa="saved-address-city"]')
        this.SaveAddressCountry = page.locator('[data-qa="saved-address-country"]')

        this.ContinueToPayment = page.getByRole('button', { name: 'Continue to payment' })
    }
    fillDetails = async (fillinfo) => {
        await this.FirstName.waitFor()
        await this.LastName.waitFor()
        await this.Street.waitFor()
        await this.PostCode.waitFor()
        await this.City.waitFor()
        await this.Country.waitFor()

        await this.FirstName.fill(fillinfo.fname)
        await this.LastName.fill(fillinfo.lname)
        await this.Street.fill(fillinfo.street)
        await this.PostCode.fill(fillinfo.pcode)
        await this.City.fill(fillinfo.city)
        await this.Country.selectOption(fillinfo.country)
    }
    savedDetails = async () => {
        await this.SaveAddressButton.waitFor()
        const SavedAddressContainerBefore = await this.SavedAddressContainer.count()
        await this.SaveAddressButton.click()
        expect(this.SavedAddressContainer).toHaveCount(SavedAddressContainerBefore + 1)

        await this.SaveAddressFname.waitFor()
        expect(await this.SaveAddressFname.first().innerText()).toBe(await this.FirstName.inputValue())

        await this.SaveAddressLname.waitFor()
        expect(await this.SaveAddressLname.first().innerText()).toBe(await this.LastName.inputValue())

        await this.SaveAddressStreet.waitFor()
        expect(await this.SaveAddressStreet.first().innerText()).toBe(await this.Street.inputValue())

        await this.SaveAddressPcode.waitFor()
        expect(await this.SaveAddressPcode.first().innerText()).toBe(await this.PostCode.inputValue())

        await this.SaveAddressCity.waitFor()
        expect(await this.SaveAddressCity.first().innerText()).toBe(await this.City.inputValue())

        await this.SaveAddressCountry.waitFor()
        expect(await this.SaveAddressCountry.first().innerText()).toBe(await this.Country.inputValue())
    }
    GotoPayment = async () => {
        await this.ContinueToPayment.waitFor()
        await this.ContinueToPayment.click()
        await this.page.waitForURL('/payment')
    }
}