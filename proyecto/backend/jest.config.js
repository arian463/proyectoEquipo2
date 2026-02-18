const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  moduleNameMapper: {
    "@routes/(.*)": "<rootDir>/src/routes/$1",
    "@controllers/(.*)": "<rootDir>/src/controllers/$1",
    "@middlewares/(.*)": "<rootDir>/src/middlewares/$1",
    "@models/(.*)": "<rootDir>/src/models/$1",
    "@services/(.*)": "<rootDir>/src/services/$1",
    "@utils/(.*)": "<rootDir>/src/utils/$1",
    "@config/(.*)": "<rootDir>/src/config/$1",
    "@tests/(.*)": "<rootDir>/src/tests/$1",
    "@schemas/(.*)": "<rootDir>/src/schemas/$1",
  },
};