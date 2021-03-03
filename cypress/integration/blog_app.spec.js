describe("Blog App", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Test User",
      username: "testuser",
      password: "secret",
    };
    cy.request("POST", "http://localhost:3001/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("testuser");
      cy.get("#password").type("secret");
      cy.get("#login-button").click();

      cy.contains("logout");
    });
    it("fails with wrong credentials", function () {
      cy.get("#username").type("testuser");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.contains("Wrong Credentials");
    });
  });

  describe("When Logged in", function () {
    beforeEach(function () {
      cy.login({ username: "testuser", password: "secret" });
    });

    it("a blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("#title").type("a blog created by cypress");
      cy.get("#author").type("author");
      cy.get("#url").type("http://url.url");
      cy.contains("Submit").click();

      cy.contains("a blog created by cypress");
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "an existing blog",
          author: "author",
          url: "http://example.com",
        });
      });
      it("can be liked", function () {
        cy.contains("an existing blog").contains("view").click();
        cy.contains("like").click();

        cy.contains("likes: 1");
      });

      it("can be deleted by owner", function () {
        cy.contains("an existing blog").contains("view").click();
        cy.contains("remove").click();

        cy.get("#blog-list").children().should("have.length", 0);
      });
    });
  });
});
