/// <reference types="cypress" />

import { LoginRequest } from '../shared';

describe('POST /jwt', () => {
  it('should return a 400 if username or password are not provided', () => {
    const requriedKeys = ['username', 'password'];

    requriedKeys.forEach((key) => {
      const body = {
        username: 'invalid@earnbetter.com',
        password: 'invalid',
      };

      const bodyWithoutKey = { ...body, [key]: undefined };

      cy.request({
        failOnStatusCode: false,
        ...LoginRequest,
        body: bodyWithoutKey,
      }).then((response) => {
        expect(response.status).to.eq(400);
      });
    });
  });

  it('should return a 401 for invalid credentials', () => {
    const expectedStatusCode = 401;

    cy.request({
      failOnStatusCode: false,
      ...LoginRequest,
      body: {
        username: 'invalid@earnbetter.com',
        password: 'invalid',
      },
    }).then((response) => {
      expect(response.status).to.eq(expectedStatusCode);
    });
  });

  it('should return a 200 with access and refresh tokens for valid credentials', () => {
    const expectedStatusCode = 200;
    const expectedKeys = ['access', 'refresh'];

    cy.request({
      ...LoginRequest,
      body: {
        username: 'enrique@earnbetter.com',
        password: 'por!Qkikei7',
      },
    }).then((response) => {
      expect(response.status).to.eq(expectedStatusCode);
      expect(response.body).to.have.keys(expectedKeys);
    });
  });
});
