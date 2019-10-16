import { getHTMLElement } from "./get-html-element";

describe("getHTMLElement()", () => {
  it("finds elements that exist", () => {
    const boop = document.createElement('div');
    boop.id = 'boop';
    document.body.appendChild(boop);
    try {
      expect(getHTMLElement('div', '#boop')).toBe(boop);
    } finally {
      document.body.removeChild(boop);
    }
  });

  it("throws when elements can't be found", () => {
    expect(() => getHTMLElement('div', '#blah'))
      .toThrowError("Couldn't find any elements matching \"div#blah\"");
  });
});
