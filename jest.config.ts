export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  // 🟢 Dodaj ovu liniju:
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
