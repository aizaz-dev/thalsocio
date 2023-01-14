const request = require("supertest");
const app = 'http://localhost:3001'
require("dotenv").config();

//Declaring sample Values
const authtoken='bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2I2NTVmNWEwNzhjMTAwNDhjMjRkNWMiLCJpYXQiOjE2NzMyNTAzNDd9.10XuggdgbWKfa4mERT98SCEWlYy6xiBKqiiJcJrntU8'
const storyExist='63b9388227e1c8b580213524'
const userExist='63b655f5a078c10048c24d5c'

describe("PUT [New Vote] /api/vote/create/:userId", () => {
    it("should be signedIn", async () => {
      const res = await request(app).put(
        `/api/vote`
      ).send({
        'userId':userExist,
        'storyId':storyExist,
        'value':1
      })
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("error");
    });
    //Create Vote
      it("should caste vote", async () => {
        const res = await request(app)
        .put(`/api/vote`)
        .send({
            'userId':userExist,
            'storyId':storyExist,
            'value':1
          })
        .set('Authorization',authtoken)
      expect(res.statusCode).toBe(200);
    });
  });