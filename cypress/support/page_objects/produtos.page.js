class ProdutosPage {

visitarUrl() {
    cy.visit('produtos')
}

buscarProduto(nomeProduto){
    cy.get('.products > .row')
    .contains(nomeProduto)
    .click()
}

pesquisarProduto(nomeProduto){
    cy.get('[name="s"]').eq(1).type(nomeProduto)
    cy.get('.button-search').eq(1).click()    
    cy.get('#tab-title-description > a').should('contain', 'Descrição')
}

adicionarProdutoCarrinho() {
    cy.get('.button-variable-item-33').click()
    cy.get('.button-variable-item-Blue').click()
    cy.get('.input-text').clear().type(1)
    cy.get('.single_add_to_cart_button').click()
}

adicionarProdutoaoCarrinhoParametros(tamanho, cor, quantidade) {
    cy.get('.button-variable-item-' + tamanho).click()
    cy.get(`.button-variable-item-${cor}`).click()
    cy.get('.input-text').clear().type(quantidade)
    cy.get('.single_add_to_cart_button').click()
}


}

export default new ProdutosPage()