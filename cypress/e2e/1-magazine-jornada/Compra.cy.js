/// <reference types="cypress" />

describe('Compra de produto', () => {
    it('deve entrar no site e um produto ao carrinho', () =>{
      cy.visit('https://magazine-jornada.vercel.app/home')
      cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardActions-root > .MuiButtonBase-root').click()

      cy.get('.MuiBadge-badge').should('be.visible')
      .and('contain',1)
    })  
  })
  