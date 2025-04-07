///<reference types="cypress"/>

describe('funcionalidade: comprar item do carrinho', () => {

    beforeEach(() => {
        cy.visit('produtos')
    });

    it('deve selecionar um item da lista', () => {
        cy.get('#content')
          .contains('Abominable Hoodie')
          .click()
          cy.get('.button-variable-item-M')
          .click()
          cy.get('.button-variable-item-Green')
          .click()
          cy.get('.single_add_to_cart_button')
          .click()
          cy.get('.woocommerce-message > .button')
          .click()
          cy.get('.wc-proceed-to-checkout')
          .click()
    });  
});