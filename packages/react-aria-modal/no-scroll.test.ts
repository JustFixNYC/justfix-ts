import * as noScroll from './no-scroll';


test("it does not explode", () => {
  window.scroll = () => {};
  noScroll.on();
  noScroll.off();
  noScroll.toggle();
});
