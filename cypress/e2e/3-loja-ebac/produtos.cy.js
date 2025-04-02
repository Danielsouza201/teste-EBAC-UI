///<reference types="cypress"/>

describe('funcionalidade - produtos', () => {

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/produtos/')
    });

    it('deve selecionar um prpduto da lista', () => {
        cy.get(' .product-block')
            //.first()
            //.last()
            //.eq(2)
            .contains('Argus All-Weather Tank')
            .click()

            cy.get('#tab-title-description > a').should('contain' , 'Descrição')
        
    });
});