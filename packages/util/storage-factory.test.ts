import { storageFactory } from "./storage-factory";

describe("storageFactory()", () => {
  const localStore = storageFactory(() => localStorage);

  beforeEach(() => {
    localStore.clear();
  });

  it("knows if localStorage is supported", () => {
    expect(localStore.isSupported()).toBe(true);

    const localStorageMock = {
      getItem: jest.fn(() => {
        throw "localStorage not supported";
      }),
    };
    Object.defineProperty(window, "localStorage", { value: localStorageMock });

    expect(localStore.isSupported()).toBe(false);
  });

  it("sets and gets items", () => {
    localStore.setItem("foo", "bar");
    expect(localStore.getItem("foo")).toBe("bar");
  });

  it("gets key by index", () => {
    localStore.setItem("foo", "bar");
    expect(localStore.key(0)).toBe("foo");
  });

  it("gets storage length", () => {
    expect(localStore.length).toBe(0);
    localStore.setItem("foo", "bar");
    expect(localStore.length).toBe(1);
  });

  it("removes items", () => {
    localStore.setItem("foo", "bar");
    expect(localStore.getItem("foo")).toBe("bar");
    localStore.removeItem("foo");
    expect(localStore.getItem("foo")).toBeNull();
  });

  it("clears items", () => {
    localStore.setItem("foo", "bar");
    expect(localStore.getItem("foo")).toBe("bar");
    localStore.clear();
    expect(localStore.getItem("foo")).toBeNull();
  });

  it("works with sessionStorage also", () => {
    const sessionStore = storageFactory(() => sessionStorage);
    sessionStore.setItem("foo", "bar");
    try {
      expect(sessionStore.getItem("foo")).toBe("bar");
    } finally {
      sessionStore.clear();
    }
  });
});
