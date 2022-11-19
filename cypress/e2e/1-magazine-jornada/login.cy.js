/// <reference types="cypress" />


describe('Login', () => {
  it('deve fazer login com sucesso', () =>{
    cy.visit('https://magazine-jornada.vercel.app/login')
    cy.get('[name=email]').click()
    .type('name4@gmail.com')

    cy.get('[name=password]').click()
    .type('123456')

    cy.get('.MuiButtonBase-root').click()
  })
})
