import rewire from "rewire";
import {Request} from "express";
import mockReqRes from "mock-req-res";
import {PAGE_SIZE} from "../controller/airpollController";

const airpollController = rewire('../dist/out-tsc/controller/airpollController');

describe("Check query preparement", () => {
  test("check if limit gets calculated correctly", () => {
    let extractQueryParams = airpollController.__get__('extractQueryParams')
    let mockReq: Request = mockReqRes.mockRequest({query: {limit: '1'}})
    let {limit} = extractQueryParams(mockReq)
    expect(limit).toStrictEqual(1)
  });

  test("check empty limit", () => {
    let extractQueryParams = airpollController.__get__('extractQueryParams')
    let mockReq: Request = mockReqRes.mockRequest({query: {}})
    let {limit} = extractQueryParams(mockReq)
    expect(limit).toStrictEqual(PAGE_SIZE)
  });

  test("check if skip gets calculated correctly 1", () => {
    let extractQueryParams = airpollController.__get__('extractQueryParams')
    let mockReq: Request = mockReqRes.mockRequest({query: {page: '1'}})
    let {skip} = extractQueryParams(mockReq)
    expect(skip).toStrictEqual(0)
  });

  test("check if skip gets calculated correctly 2", () => {
    let extractQueryParams = airpollController.__get__('extractQueryParams')
    let mockReq: Request = mockReqRes.mockRequest({query: {page: '2'}})
    let {skip} = extractQueryParams(mockReq)
    expect(skip).toStrictEqual(PAGE_SIZE)
  });

  test("check if skip gets calculated correctly 3", () => {
    let extractQueryParams = airpollController.__get__('extractQueryParams')
    let mockReq: Request = mockReqRes.mockRequest({query: {page: '50'}})
    let {skip} = extractQueryParams(mockReq)
    expect(skip).toStrictEqual(PAGE_SIZE * 49)
  });

  test("check if orderBy gets extracted correctly", () => {
    let extractQueryParams = airpollController.__get__('extractQueryParams')
    let mockReq: Request = mockReqRes.mockRequest({query: {order_by: 'Country'}})
    let {orderBy} = extractQueryParams(mockReq)
    expect(orderBy).toStrictEqual('Country')
  });

  test("check if sort gets extracted correctly", () => {
    let extractQueryParams = airpollController.__get__('extractQueryParams')
    let mockReq: Request = mockReqRes.mockRequest({query: {sort: 'asc'}})
    let {sort} = extractQueryParams(mockReq)
    expect(sort).toStrictEqual(1)
  });

  test("check if sort gets extracted correctly", () => {
    let extractQueryParams = airpollController.__get__('extractQueryParams')
    let mockReq: Request = mockReqRes.mockRequest({query: {sort: 'desc'}})
    let {sort} = extractQueryParams(mockReq)
    expect(sort).toStrictEqual(-1)
  });

  test("check if filterQuery gets added combined correctly 1", () => {
    let extractQueryParams = airpollController.__get__('extractQueryParams')
    let mockReq: Request = mockReqRes.mockRequest({query: {city: 'Madrid'}})
    let {filterQuery} = extractQueryParams(mockReq)
    expect(filterQuery).toMatchObject({city: 'Madrid'})
  });

  test("check if filterQuery gets added combined correctly 2", () => {
    let extractQueryParams = airpollController.__get__('extractQueryParams')
    let mockReq: Request = mockReqRes.mockRequest({query: {country: 'Andorra'}})
    let {filterQuery} = extractQueryParams(mockReq)
    expect(filterQuery).toMatchObject({country: 'Andorra'})
  });

  test("check if filterQuery gets added combined correctly 3", () => {
    let extractQueryParams = airpollController.__get__('extractQueryParams')
    let mockReq: Request = mockReqRes.mockRequest({query: {city: 'Madrid', country: 'Andorra'}})
    let {filterQuery} = extractQueryParams(mockReq)
    expect(filterQuery).toMatchObject({city: 'Madrid', country: 'Andorra'})
  });

  test("check multiple attributes", () => {
    let extractQueryParams = airpollController.__get__('extractQueryParams')
    let mockReq: Request = mockReqRes.mockRequest({query: {sort: 'desc', city: 'Madrid', country: 'Andorra', limit: '1'}})
    let {sort, filterQuery, limit} = extractQueryParams(mockReq)
    expect(limit).toStrictEqual(1)
    expect(sort).toStrictEqual(-1)
    expect(filterQuery).toMatchObject({city: 'Madrid', country: 'Andorra'})
  });
});