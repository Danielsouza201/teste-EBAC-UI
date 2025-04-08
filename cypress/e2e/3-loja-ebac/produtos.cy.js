///<reference types="cypress"/>
import produtosPage from "../../support/page-objects/produtos.page";

describe('funcionalidade - produtos', () => {

    beforeEach(() => {
       produtosPage.visitarUrl()
    });

    it('deve selecionar um prpduto da lista', () => {
        produtosPage.buscarProdutosLista('Aether Gym Pant')
        cy.get('#tab-title-description > a').should('contain' , 'Descrição')       
    });

    it.only('deve buscar um produto com sucesso', () => {
        let produto = 'Aero Daily Fitness Tee'
        produtosPage.buscarProdutos(produto)
        cy.get('.product_title').should('contain', produto)
    });

    it('deve visitar a pagina de um produto', () => {
        
    });

    it('deve adicionar um produto ao carrinho', () => {
        
    });
});