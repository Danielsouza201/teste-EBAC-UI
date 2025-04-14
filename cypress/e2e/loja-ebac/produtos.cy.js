///<reference types="cypress"/>
import produtosPage from "../../support/page-objects/produtos.page";

describe('funcionalidade - produtos', () => {

    beforeEach(() => {
       produtosPage.visitarUrl()
    });

    it('deve selecionar um produto da lista', () => {
        produtosPage.buscarProdutosLista('Aether Gym Pant')
        cy.get('#tab-title-description > a').should('contain' , 'Descrição')       
    });

    it('deve buscar um produto com sucesso', () => {
        let produto = 'Aero Daily Fitness Tee'
        produtosPage.buscarProdutos(produto)
        cy.get('.product_title').should('contain', produto)
    });

    it('deve visitar a pagina de um produto', () => {
        produtosPage.visitarProdutos('Aether Gym Pant')
        cy.get('.product_title').should('contain', 'Aether Gym Pant')        
    });

    it('deve adicionar um produto ao carrinho', () => {
        let qtd = 5
        produtosPage.buscarProdutos('Abominable Hoodie')
        produtosPage.addProdutosCarrinho('M', 'Green', qtd)
        cy.get('.woocommerce-message').should('contain', qtd + ' × “Abominable Hoodie” foram adicionados no seu carrinho.')
    });

    it.only('deve adicionar um produto ao carrinho buscando da massa de dados', () => {
        cy.fixture('produtos').then(dados => {
            produtosPage.buscarProdutos(dados[2].nomeProduto)
            produtosPage.addProdutosCarrinho(
                dados[2].tamanho, 
                dados[2].cor, 
                dados[2].quantidade)    
            cy.get('.woocommerce-message').should('contain', dados[2].nomeProduto)
        })
        
});
});