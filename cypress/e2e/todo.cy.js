describe('template spec', () => {

  beforeEach(() => {
    cy.visit('https://todomvc.com/examples/react/dist/')
  })

  it('agregar tarea', () => {
    cy.get('[data-testid="text-input"]').type("sacar al perro{enter}")
    cy.get('[data-testid="todo-item-label"]').contains("sacar al perro")

  })

  it('marcar una tarea como completada', () => {
    cy.get('[data-testid="text-input"]').type("sacar al perro{enter}")
    cy.get('[data-testid="todo-item-toggle"]').click()
    cy.get('[data-testid="todo-item-toggle"]').should('be.checked')

  })

  it('desmarcar una tarea', () => {
    cy.get('[data-testid="text-input"]').type("sacar al perro{enter}")
    cy.get('[data-testid="todo-item-toggle"]').click()
    cy.get('[data-testid="todo-item-toggle"]').click()
    cy.get('[data-testid="todo-item-toggle"]').should('not.be.checked')


  })

  it('modificar nombre tarea', () => {
    cy.get('[data-testid="text-input"]').type("sacar al perro{enter}")
    cy.get('[data-testid="todo-item-label"]').dblclick()
    cy.get('.view > .input-container > [data-testid="text-input"]').clear()
    cy.get('.view > .input-container > [data-testid="text-input"]').type("sacar el perro a las 12{enter}")
    cy.get('[data-testid="todo-item-label"]').contains('sacar el perro a las 12')

  })

  it('borrar una tarea', () => {
    cy.get('[data-testid="text-input"]').type("sacar al perro{enter}")
    cy.get('[data-testid="todo-item-button"]').click({ force: true })

  })

  it('Filtrar tareas', () => {
    cy.get('[data-testid="text-input"]').type('sacar al perro{enter}')
    cy.get('[data-testid="text-input"]').type('dar de comer al gato{enter}')
    cy.get('[data-testid="text-input"]').type('estudiar qa{enter}')
    cy.get(':nth-child(2) > .view > [data-testid="todo-item-toggle"]').click()

    // Filtrar por completadas
    cy.get('[data-testid="footer-navigation"] > :nth-child(3) > a').click()
    cy.get('[data-testid="todo-item-label"]').should('have.length', 1)
    cy.get('[data-testid="todo-item-label"]').should('contain', 'dar de comer al gato')

    // Filtrar por no completadas
    cy.get('[data-testid="footer-navigation"] > :nth-child(2) > a').click()
    cy.get('[data-testid="todo-item-label"]').should('have.length', 2)
    cy.get('[data-testid="todo-item-label"]').each(($el) => {
      cy.wrap($el).should('not.contain', 'dar de comer al gato')
    })

    // 5. Mostrar todas
    cy.get('[data-testid="footer-navigation"] > :nth-child(1) > a').click()
    cy.get('[data-testid="todo-item-label"]').should('have.length', 3)


  })

})