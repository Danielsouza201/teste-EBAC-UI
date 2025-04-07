///<reference types="cypress"/>
const perfil = require ('../../fixtures/perfil.json')

describe('funcionalidade: login',() => {

    beforeEach(() => {
        cy.visit('minha-conta')
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('deve fazer login com sucesso', () =>{       
        cy.get('#username').type('Daniel2014.teste@gmail.com')
        cy.get('#password').type('Teste@123')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, daniel2014.teste (não é daniel2014.teste? Sair)')          
    });

    it('deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
        cy.get('#username').type('Daniel2222.teste@gmail.com')
        cy.get('#password').type('Teste@123')
        cy.get('.woocommerce-form > .button').click()       
        cy.get('.woocommerce-error').should('exist')
    });

    it('deve exibir uma mensagem de erro ao inserir senha inválida', () => {
        cy.get('#username').type('Daniel2014.teste@gmail.com')
        cy.get('#password').type('Teste@000')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain', 'Erro: A senha fornecida para o e-mail Daniel2014.teste@gmail.com está incorreta. Perdeu a senha?')
        cy.get('.woocommerce-error').should('exist')
    });

    it('deve fazer login com sucesso - usando massa de dados', () => {
        cy.get('#username').type(perfil.usuario)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, daniel2014.teste (não é daniel2014.teste? Sair)')                     
    });

    it.only('deve fazer login com sucesso - usando fixture', () => {
        cy.fixture('perfil').then(dados=>{
            cy.get('#username').type(dados.usuario ,{log: false})
            cy.get('#password').type(dados.senha ,{log: false})
            cy.get('.woocommerce-form > .button').click()
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, daniel2014.teste (não é daniel2014.teste? Sair)')                     
      
        })
                       
    });
})