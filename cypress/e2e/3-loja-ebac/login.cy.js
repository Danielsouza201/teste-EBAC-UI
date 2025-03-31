///<reference types="cypress"/>

describe('funcionalidade: login',() => {

    it('deve fazer login com sucesso', () =>{
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
        cy.get('#username').type('Daniel2014.teste@gmail.com')
        cy.get('#password').type('Teste@123')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, daniel2014.teste (não é daniel2014.teste? Sair)')
    })
})