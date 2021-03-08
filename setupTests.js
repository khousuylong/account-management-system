import "@testing-library/jest-dom/extend-expect";
import fetchMock from "jest-fetch-mock";
import { initTestHelpers } from 'next-page-tester';

initTestHelpers();
fetchMock.enableMocks();
