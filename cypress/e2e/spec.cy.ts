describe('anon calculator', () => {
  it('can calculate', () => {
    cy.visit('/');
    cy.findByText(/toggle/i)
      .click()
      .findByText(/toggle/i)
      .click()
      .findByText(/toggle/i)
      .click();

    cy.findByText('Hey').should('include.text', 'Bro');
  });
});
