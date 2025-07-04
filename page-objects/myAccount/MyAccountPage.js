export class MyAccountPage{
    constructor(page){
        this.page = page
        this.PageHeading = page.getByRole('heading', { name: 'My Account' })
    }
    visit = async() => {
        await this.page.goto('http://localhost:2221/my-account')
    }
    waitForPageHeading = async () => {
        await this.PageHeading.waitFor()
    }
}