class ProdutosPage {

    visitarUrl() {
        cy.visit('produtos')
    }

    buscarProdutos(nomeProduto) {
        cy.get('[name="s"]').eq(1).type(nomeProduto)
        cy.get('.button-search').eq(1).click()
    }

    buscarProdutosLista(nomeProduto) {
        cy.get('.product-block')
        .contains(nomeProduto)
        .click()

    }

    visitarProdutos() {

    }

    addProdutosCarrinho() {

    }


}

export default new ProdutosPage()