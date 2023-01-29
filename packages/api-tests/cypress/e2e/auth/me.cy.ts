/// <reference types="cypress" />

import { LoginRequest, MeRequest } from '../shared';

describe('GET /me', () => {
  it('should return a 401 when request is missing JWT', () => {
    const expectedStatusCode = 401;

    cy.request({
      failOnStatusCode: false,
      ...MeRequest,
    }).then((response) => {
      expect(response.status).to.eq(expectedStatusCode);
    });
  });

  it('should return a 200 with expected keys when request has valid JWT', () => {
    const expectedStatusCode = 200;
    const expectedKeys = ['id', 'first_name', 'last_name', 'email', 'is_coach'];

    // GET JWT by logging in
    let jwt: string | undefined = undefined;
    cy.request({
      ...LoginRequest,
      body: {
        username: 'enrique@earnbetter.com',
        password: 'por!Qkikei7',
      },
    })
      .then((response) => {
        expect(response.status).to.eq(expectedStatusCode);
        jwt = response.body['access'];
      })
      .then(() => {
        expect(jwt).to.not.be.undefined;
      })
      .then(() => {
        cy.request({
          ...MeRequest,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }).then((response) => {
          expect(response.status).to.eq(expectedStatusCode);
          expect(response.body).to.have.keys(expectedKeys);
        });
      });
  });
});
