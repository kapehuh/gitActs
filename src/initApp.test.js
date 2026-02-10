import { initApp } from "./initApp";

describe("initApp", () => {
  test("должен добавлять заголовок в элемент", () => {
    // Создаём мок элемента
    const el = { innerHTML: "" };
    initApp(el);
    expect(el.innerHTML).toBe('<h1 class="initApp">Hello world!</h1>');
  });
});
