const request = require("supertest");
const app = 'http://localhost:3001'
require("dotenv").config();

//Declaring sample Values
const authtoken='bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2I2NTVmNWEwNzhjMTAwNDhjMjRkNWMiLCJpYXQiOjE2NzMyNTAzNDd9.10XuggdgbWKfa4mERT98SCEWlYy6xiBKqiiJcJrntU8'
const storyExist='63b9388227e1c8b580213524'
const userExist='63b655f5a078c10048c24d5c'
const storyForDelete='63c0e972a5a8a85c898de705'//need to update every time
const authorForDelete='63b655f5a078c10048c24d5c'//need to update every time
const tokenForDelete='bearer ' +'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2I2NTVmNWEwNzhjMTAwNDhjMjRkNWMiLCJpYXQiOjE2NzM1ODY2Nzl9.-JtrJt4zBlsKraZmuMsJw_oHss9MfoG8Rt5iVyoW-k0'

describe("GET [By story] /api/story/:storyId/:loggedInUserId", () => {

  it("should be signedIn", async () => {
    const res = await request(app).get(
      `/api/story/${storyExist}/${userExist}`
    );
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
  });
  it("should return a single story whose id is in params", async () => {
    const res = await request(app).get(
      `/api/story/${storyExist}/${userExist}`
    ).set('Authorization',authtoken);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0]._id).toBe(storyExist);
  });
});

describe("GET [All Stories] /api/story/:loggedInUserId", () => {

  it("should be signedIn", async () => {
    const res = await request(app).get(
      `/api/story/${userExist}`
    );
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
  });
  it("should return all stories", async () => {
    const res = await request(app).get(
      `/api/story/${userExist}`
    ).set('Authorization',authtoken);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
   
  });
});

describe("GET [Stories by Creator] /api/story/u/:userId/:loggedInUserId", () => {

  it("should be signedIn", async () => {
    const res = await request(app).get(
      `/api/story/u/${userExist}/${userExist}`
    );
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
  });
  it("should return all stories authored by userId in Params", async () => {
    const res = await request(app).get(
      `/api/story/u/${userExist}/${userExist}`
    ).set('Authorization',authtoken);
    expect(res.statusCode).toBe(200);
    //expect(res.body.length).toBeGreaterThan(0);
   
  });
  //wrong user
  //wrong story
  //time
  //upvote
  //downvote

});

/*
describe("DELETE /api/story/:storyId/:userId", () => {
  it("should be signedIn", async () => {
    const res = await request(app).delete(
      `/api/story/${storyForDelete}/${authorForDelete}`
    );
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
  });
  //should be authorised 
  it("should be authorised", async () => {
    const res = await request(app).delete(
      `/api/story/${storyForDelete}/${userExist}`
    ).set('Authorization',authtoken);
    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe("Access Denied");
  });
  //delete
  it("should be delete the story", async () => {
    const res = await request(app).delete(
      `/api/story/${storyForDelete}/${authorForDelete}`
    ).set('Authorization',tokenForDelete);
    expect(res.statusCode).toBe(200);
  });
});
*/

describe("POST [Create New] /api/story/create/:userId", () => {
  it("should be signedIn", async () => {
    const res = await request(app).post(
      `/api/story/create/${userExist}`
    );
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
  });
  //Create
    it("should create a story", async () => {
      const res = await request(app)
      .post(`/api/story/create/${userExist}`)
      .type('form')
      .field('message','Testing through Jest')
      .field('tags','#post#toodler#premature#bonenza')
      .set('Authorization',authtoken)
      //.attach('content')
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Testing through Jest");
  });
});


describe("PATCH [Update] /api/story/:storyId", () => {
  it("should be signedIn", async () => {
    const res = await request(app).patch(
      `/api/story/${storyExist}`
    );
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
  });
  //Update
    it("should update the story with Id in param", async () => {
      const res = await request(app)
      .patch(`/api/story/${storyExist}`)
      .type('form')
      .field('message','Updating Test through Jest')
      .field('tags','#update#toodler#premature#bonenza')
      .set('Authorization',authtoken)
      //.attach('content')
    /expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Updating Test through Jest");
  });
});



