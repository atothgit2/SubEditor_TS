import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5050/",
  timeout: 1000,
});

describe("User routes", () => {
  test("Get all dogs", async () => {
    const res = await instance.get("/dogs");
    expect(res.data[0]._id).toEqual("631789e95cbc381d4be8bed8");
    expect(res.data[0].id).toEqual(5);
    expect(res.data[0].name).toEqual("Spot");
    expect(res.data[0].breed).toEqual("labrador");
    expect(res.data[0].adopted_at).toBe(null);
  });

  test("Get specific dog", async () => {
    const res = await instance.get("/dogs/631789e95cbc381d4be8bed8");
    // console.log(JSON.stringify(res.data));
    expect(res.data._id).toEqual("631789e95cbc381d4be8bed8");
    expect(res.data.id).toEqual(5);
    expect(res.data.adopted_at).toBe(null);
    expect(res.data.name).toEqual("Spot");
    expect(res.data.breed).toEqual("labrador");
  });
});

// https://github.com/visionmedia/supertest/issues/520
