/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import produtosPage from "../support/page_objects/produtos.page";

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
      produtosPage.visitarUrl()
  });

  it('selecionar o produto da lista', () => {
      produtosPage.buscarProduto('Arcadio Gym Short')
      produtosPage.adicionarProdutoCarrinho()
      cy.get('.woocommerce-message').should('contain', 'foi adicionado no seu carrinho.')

      produtosPage.pesquisarProduto('Teton Pullover Hoodie')
      produtosPage.adicionarProdutoaoCarrinhoParametros('L', 'Black', 1)
      cy.get('.woocommerce-message').should('contain', 'foi adicionado no seu carrinho.')

      cy.get('.logo-in-theme > .logo > a > .logo-img').click()
      cy.fixture('produtos').then(dados => {
      produtosPage.buscarProduto(dados[0].nomeProduto)
      produtosPage.adicionarProdutoaoCarrinhoParametros(
      dados[0].tamanho,
      dados[0].cor,
      dados[0].quantidade)
      cy.get('.woocommerce-message').should('contain', dados[0].nomeProduto)

      cy.get('#primary-menu > .menu-item-629 > a').click()
      cy.fixture('produtos').then(dados => {
      produtosPage.buscarProduto(dados[1].nomeProduto)
      produtosPage.adicionarProdutoaoCarrinhoParametros(
      dados[1].tamanho,
      dados[1].cor,
      dados[1].quantidade)
      cy.get('.woocommerce-message').should('contain', dados[1].nomeProduto)

      produtosPage.pesquisarProduto('Teton Pullover Hoodie')
      produtosPage.adicionarProdutoaoCarrinhoParametros('L', 'Black', 1)
      cy.get('.woocommerce-message > .button').click()
      cy.get('.checkout-button').click()
      cy.get('#billing_first_name').type(faker.person.firstName('male'))
      cy.get('#billing_last_name').type(faker.person.lastName('male'))
      cy.get('#billing_address_1').type(faker.location.streetAddress())
      cy.get('#billing_city').type(faker.location.city())
      cy.get('#billing_postcode').type(faker.location.zipCode('#####-###'))
      cy.get('#billing_phone').type(faker.phone.number('+55(##)####-####'))
      cy.get('#billing_email').type(faker.internet.email())
      cy.get('#terms').click()
      cy.get('#place_order').click()
      cy.wait(5000)
      cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    }); 
  });
 });
})