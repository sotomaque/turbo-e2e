/// <reference types="cypress" />

import { LoginRequest, ResumeListRequest } from '../shared';

describe('GET /resume/', () => {
  it('should return a 200 with array of resumes', () => {
    const expectedStatusCode = 200;
    const expectedLoginKeys = ['access', 'refresh'];
    const expectedResumesKeys = ['count', 'next', 'previous', 'results'];
    const expectedResumeKeys = [
      'coach',
      'created',
      'file',
      'id',
      'label',
      'original',
      'owner',
      'parse_error',
      'resume_data',
      'thumbnail',
      'updated',
      'rewrites_used',
    ];

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
        expect(response.body).to.have.keys(expectedLoginKeys);
        jwt = response.body['access'];
      })
      .then(() => {
        expect(jwt).to.not.be.undefined;
      })
      .then(() => {
        cy.request({
          ...ResumeListRequest,
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }).then((response) => {
          expect(response.status).to.eq(expectedStatusCode);
          console.log('body', response.body);
          expect(response.body).to.have.keys(expectedResumesKeys);
          if (response.body.results) {
            expect(response.body.results).to.be.an('array');
            if (response.body.results.length > 0) {
              expect(response.body.results[0]).to.have.keys(expectedResumeKeys);
            }
          }
        });
      });
  });
});
