import assert from "assert";
class RegisterForm {
  elements = {
    titleInput: () => cy.get("#title"),
    titleFeedback: () => cy.get("#titleFeedback"),
    imageUrlInput: () => cy.get("#imageUrl"),
    urlFeedback: () => cy.get("#urlFeedback"),
    submitBtn: () => cy.get("#btnSubmit"),
  };
  typeTitle(text) {
    if (!text) return;
    this.elements.titleInput().type(text);
  }
  typeUrl(text) {
    if (!text) return;
    this.elements.imageUrlInput().type(text);
  }
  clickSubmit() {
    this.elements.submitBtn().click();
  }
}
const registerForm = new RegisterForm();
const colors = {
  errors: "rgb(220, 53, 69)",
  success: "",
};
describe("template spec", () => {
  describe("Submiting an image with invalid inputs", () => {
    after(() => {
      {
        cy.clearAllLocalStorage();
      }
    });
    const input = {
      title: "",
      url: "",
    };
    it("Given i am on the image registration page", () => {
      cy.visit("/");
    });
    it(`When i enter ${input.title} in the title field`, () => {
      registerForm.typeTitle(input.title);
    });
    it(`Then i enter ${input.url} in the URL field`, () => {
      registerForm.typeUrl(input.url);
    });
    it(`Then i click the submit button`, () => {
      registerForm.clickSubmit();
    });
    it(`Then i should see "Please type a title for the image" message above the title field`, () => {
      registerForm.elements
        .titleFeedback()
        .should("contain.text", "Please type a title for the image");
    });
    it(`And i should see "Please type a valid URL" message above the imageUrl field`, () => {
      registerForm.elements
        .urlFeedback()
        .should("contain.text", "Please type a valid URL");
    });
    it(`And i should see an exclamation icon in the title and URL fields`, () => {
      registerForm.elements.titleInput().should(([element]) => {
        const styles = window.getComputedStyle(element);
        const border = styles.getPropertyValue("border-right-color");
        assert.strictEqual(border, colors.errors);
      });
    });
  });
});
