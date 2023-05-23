describe('Note app', function () {
  //TODO: Test CRUD when logged in
  beforeEach(function () {
    cy.visit('http://localhost:3001')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2022'
    )
  })

  it('login form can be opened', function () {
    cy.contains('login').click()
  })

  it('user can log in', function () {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
    cy.contains('Matti Luukkainen')
  })

  it('user cant log in if wrong credentials are given', function () {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrongPass')
    cy.get('#login-button').click()
    cy.contains('Wrong credentials')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('login').click()
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.get('#login-button').click()
    })

    it('a new note can be created', function () {
      cy.get('.textInput').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })
  })
})
