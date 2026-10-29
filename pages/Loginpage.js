
class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(
      'https://practicetestautomation.com/practice-test-login/'
    );
  }

  async login(username, password) {
    await this.page.getByLabel('Username').fill(username);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }

  async submit() {
  await this.page.getByRole('button', { name: 'Submit' }).click();
  }

  async logout() {
  await this.page.getByRole('link', { name: 'Log out' }).click();
}
}

module.exports = { LoginPage };