export class SignUpPage{
    constructor(page){
        this.page = page
        this.EmailField = page.getByRole('textbox', { name: 'E-Mail' })
        this.PasswordField = page.getByRole('textbox', { name: 'Password' })
        this.RegisterButton = page.getByRole('button', { name: 'Register' })
    }
    SignNewUser = async(email, password) => {
        await this.EmailField.waitFor()
        await this.PasswordField.waitFor()
        await this.RegisterButton.waitFor()
        await this.EmailField.fill(email)
        await this.PasswordField.fill(password)
        await this.RegisterButton.click()
        await this.page.waitForURL(/\/delivery-details/)        
    }
}