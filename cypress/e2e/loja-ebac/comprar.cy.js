///<reference types="cypress"/>
import produtosPage from "../../support/page-objects/produtos.page";

describe('funcionalidade: comprar item do carrinho', () => {

    beforeEach(() => {
       produtosPage.visitarUrl()
    });

    it.only('deve selecionar um item da lista', () => {
        produtosPage.visitarProdutos('Circe Hooded Ice Fleece')
        produtosPage.addProdutosCarrinho('M', 'Green', 5)      
        cy.get('.woocommerce-message').should('contain', 'foram adicionados no seu carrinho.')
    });  
});