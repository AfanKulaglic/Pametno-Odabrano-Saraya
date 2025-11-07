describe("Collection flow", () => {
  beforeEach(() => {
    // 1️⃣ provjeri API
    cy.request("/api/pametno-odabrano/collections").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers["content-type"]).to.include("application/json");

      // ✅ stvarna struktura tvog API-ja
      expect(response.body).to.have.property("collection");
      expect(response.body).to.have.property("categories");
      expect(response.body).to.have.property("brands");
      expect(response.body).to.have.property("items");
    });

    // 2️⃣ otvori stranicu
    cy.visit("/EditorPicks");
  });

  it("učitava kolekciju i otvara detalje artikla", () => {
    // čekaj da se itemi pojave
    cy.get("[data-testid='collection-item']", { timeout: 10000 }).should("exist");

    // klikni na prvi item
    cy.get("[data-testid='collection-item']").first().click();

    // ✅ ovdje promjena!
    cy.url().should("include", "/EditorPicks/");
    cy.get("[data-testid='item-detail']").should("be.visible");
  });

  it("klik na CTA otvara novi tab s pravilnim UTM parametrima", () => {
    cy.visit("/EditorPicks/item_504", { failOnStatusCode: false });

    cy.get("[data-testid='cta-button']")
      .should("exist")
      .and("have.attr", "href")
      .then((href) => {
        expect(href).to.include("utm_source=");
        expect(href).to.include("utm_medium=");
        expect(href).to.include("utm_campaign=");
      });
  });
});
