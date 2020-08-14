import { assertNotNull, hardFail, assertNotUndefined } from "./assertions";

describe("assertNotNull()", () => {
  it("raises exception when null", () => {
    expect(() => assertNotNull(null)).toThrowError(
      "expected argument to not be null"
    );
  });

  it("returns argument when not null", () => {
    expect(assertNotNull("")).toBe("");
  });
});

describe("hardFail()", () => {
  it("throws an error", () => {
    expect(() => hardFail()).toThrowError(
      "Code should never reach this point!"
    );
    expect(() => hardFail("boop")).toThrowError("boop");
  });
});

describe("assertNotUndefined()", () => {
  it("raises exception when undefined", () => {
    expect(() => assertNotUndefined(undefined)).toThrowError(
      "expected argument to not be undefined"
    );
  });

  it("returns argument when not undefined", () => {
    expect(assertNotUndefined(null)).toBe(null);
  });
});
