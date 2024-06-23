describe('form tests', () => {
    beforeEach(() => {
        cy.visit('/forms')
    })
    it('Test subscribe form', () => {
        // Valid subscribe
        cy.contains(/testing forms/i)
        cy.getDataTest('subscribe-form').find('input').as('subscribe-input') // Allias
        cy.get('@subscribe-input').type('test@test.com')
        cy.contains(/Successfully subbed: test@test.com!/i).should('not.exist')
        cy.getDataTest('subscribe-button').click()
        cy.contains(/Successfully subbed: test@test.com!/i).should('exist')
        cy.wait(3000)
        cy.contains(/Successfully subbed: test@test.com!/i).should('not.exist')

        // Subscribe with invalid data
        cy.get('@subscribe-input').type('test@test')
        cy.contains(/Invalid email: test@test!/i).should('not.exist')
        cy.getDataTest('subscribe-button').click()
        cy.contains(/Invalid email: test@test!/i).should('exist')
        cy.wait(3000)
        cy.contains(/Invalid email: test@test!/i).should('not.exist')

        // Empty input subscribe
        cy.get('@subscribe-input').type('test@test')
        cy.contains(/fail!/i).should('not.exist')
        cy.getDataTest('subscribe-button').click()
        cy.contains(/fail!/i).should('exist')

    })
})