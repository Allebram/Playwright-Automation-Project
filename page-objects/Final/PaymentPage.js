import { expect } from "@playwright/test"

export class PaymentPage {
    constructor(page) {
        this.page = page
        this.Total = page.locator('[data-qa="total-value"]')
        this.DiscountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
        this.DiscountCodeField = page.getByRole('textbox', { name: 'Discount code' })
        this.SubmitButton = page.getByRole('button', { name: 'Submit discount' })
        this.TotalIncludingDiscount = page.locator('[data-qa="total-with-discount-value"]')
        this.DiscountActivated = page.locator('[data-qa="discount-active-message"]')

        this.CreditCardOwner = page.getByRole('textbox', { name: 'Credit card owner' })
        this.CreditCardNumber = page.getByRole('textbox', { name: 'Credit card number' })
        this.ValidUntil = page.getByRole('textbox', { name: 'Valid until' })
        this.CreditCardCVC = page.getByRole('textbox', { name: 'Credit card CVC' })
        this.PayButton = page.getByRole('button', { name: 'Pay' })
    }
    ActivateDiscount = async () => {
        await this.Total.waitFor()
        await this.DiscountCode.waitFor()
        await this.DiscountCodeField.waitFor()
        await this.SubmitButton.waitFor()
        const code = await this.DiscountCode.innerText()
        await this.DiscountCodeField.fill(code)
        // await this.DiscountCodeField.focus()
        // await this.page.keyboard.type(code,{delay:1000})
        await expect(this.DiscountCodeField).toHaveValue(code)

        await this.SubmitButton.click()
        await this.TotalIncludingDiscount.waitFor()
        await this.DiscountActivated.waitFor()
        expect(this.DiscountActivated).toHaveText('Discount activated!')

        const DiscountedText = await this.TotalIncludingDiscount.innerText()
        const DiscountedInt = parseInt(DiscountedText.replace("$", ""), 10)

        const TotalText = await this.Total.innerText()
        const TotalInt = parseInt(TotalText.replace("$", ""), 10)

        expect(TotalInt).toBeGreaterThan(DiscountedInt)
    }

    PaymentsDetails = async (fillDetails) => {
        await this.CreditCardOwner.waitFor()
        await this.CreditCardNumber.waitFor()
        await this.ValidUntil.waitFor()
        await this.CreditCardCVC.waitFor()
        await this.PayButton.waitFor()

        await this.CreditCardOwner.fill(fillDetails.owner)
        await this.CreditCardNumber.fill(fillDetails.number)
        await this.ValidUntil.fill(fillDetails.validity)
        await this.CreditCardCVC.fill(fillDetails.cvc)

    }

    CompleteThePayment = async () => {
        await this.PayButton.waitFor()
        await this.PayButton.click()
        await this.page.waitForURL(/\/thank-you/)


    }
}