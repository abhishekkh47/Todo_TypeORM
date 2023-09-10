import { Request, Response, NextFunction } from "express";
import {
  createRequest,
  createResponse,
  MockRequest,
  MockResponse,
} from "node-mocks-http";
import requireAuth from "../../middleware/requireAuth";

describe("first", () => {
  let req: MockRequest<Request>;
  let res: MockResponse<Response>;
  beforeEach(() => {
    res = createResponse();
  });

  const next: NextFunction = () => {
    return;
  };

  it("should return a 200-Success response", async () => {
    req = createRequest({
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJ0ZXN0MUBnbWFpbC5jb20iLCJpYXQiOjE2OTQzNDE5NDUsImV4cCI6MTY5NDYwMTE0NX0.qlNzps4tFO5MgyBX3VajxM8IeDz2JBVzf-GgBzzzy9A",
      },
    });
    await requireAuth(req, res, next);
    expect(res.statusCode).toBe(200);
  });

  it("should return a 404-Authorization token required error response", async () => {
    req = createRequest({});
    await requireAuth(req, res, next);
    expect(res._getJSONData().error).toBe('Bad Request - Authorization token required');
  });

  it("should return a 404-Authorization token invalid error response", async () => {
    req = createRequest({
      headers: {
        authorization:
          "Bear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJ0ZXN0MUBnbWFpbC5jb20iLCJpYXQiOjE2OTQzNDE5NDUsImV4cCI6MTY5NDYwMTE0NX0.qlNzps4tFO5MgyBX3VajxM8IeDz2JBVzf-GgBzzzy9A",
      },});
    await requireAuth(req, res, next);
    expect(res._getJSONData().error).toBe('Bad Request - Authorization token invalid');
  });

  it("should return a 404-Invalid token error response", async () => {
    req = createRequest({
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJ0ZXN0MUBnbWFpbC5jb20iLCJpYXQiOjE2OTQzNDE5NDUsImV4cCI6MTY5NDYwMTE0NX0.qlNzps4tFO5MgyBX3VajxM8IeDz2JBVzf-GgBzzzy9",
      },});
    await requireAuth(req, res, next);
    expect(res._getJSONData().error).toBe('Unauthorized : Invalid token');
  });
});
