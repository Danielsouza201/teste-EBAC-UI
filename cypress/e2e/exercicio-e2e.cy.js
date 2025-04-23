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
  });

  it('inserir nome e adicionar produto ao carrinho usando parametros', () =>{
    produtosPage.pesquisarProduto('Teton Pullover Hoodie')
    produtosPage.adicionarProdutoaoCarrinhoParametros('L', 'Black', 1)
    cy.get('.woocommerce-message').should('contain', 'foi adicionado no seu carrinho.')
  });

  it('deve adicionar o produto ao carrinho usando massa de dados', () =>{
    cy.fixture('produtos').then(dados => {
      produtosPage.buscarProduto(dados[0].nomeProduto)
      produtosPage.adicionarProdutoaoCarrinhoParametros(
      dados[0].tamanho,
      dados[0].cor,
      dados[0].quantidade)
      cy.get('.woocommerce-message').should('contain', dados[0].nomeProduto)
    });
    
  });

  it('adicionar produto ao carrinho', () => {
    cy.fixture('produtos').then(dados => {
      produtosPage.buscarProduto(dados[1].nomeProduto)
      produtosPage.adicionarProdutoaoCarrinhoParametros(
      dados[1].tamanho,
      dados[1].cor,
      dados[1].quantidade)
      cy.get('.woocommerce-message').should('contain', dados[1].nomeProduto)
    }); 
  });

  it.only('deve preencher os dados de checkout e concluir a compra ', () => {
    const cep=faker.location.zipCode();
    const telefone=faker.phone.number();
    console.log(cep);
    console.log(telefone);

    produtosPage.pesquisarProduto('Teton Pullover Hoodie')
    produtosPage.adicionarProdutoaoCarrinhoParametros('L', 'Black', 1)
    cy.get('.woocommerce-message > .button').click()
    cy.get('.checkout-button').click()
    cy.get('#billing_first_name').type(faker.person.firstName('male'))
    cy.get('#billing_last_name').type(faker.person.lastName('male'))
    cy.get('#billing_address_1').type(faker.location.streetAddress())
    cy.get('#billing_city').type(faker.location.city())
    cy.get('#billing_postcode').type(faker.location.zipCode('35200-000'))
    cy.get('#billing_phone').type(faker.phone.number('5533998217377'))
    cy.get('#billing_email').type(faker.internet.email())
    cy.get('#terms').click()
    cy.get('#place_order').click()
    cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
  });




})