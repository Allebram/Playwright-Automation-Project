export class LoginPage{
    constructor(page){
        this.page = page
        this.RegisterButton = page.getByRole('button', { name: 'Register' })
        
    }
    GoToSignUpPage = async() => {
        await this.RegisterButton.waitFor()
        await this.RegisterButton.click()
        await this.page.waitForURL(/\/signup/)
    }

}