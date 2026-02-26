import EventEmitter from "../core/eventEmitter";
import SearchWidget from "../components/SearchWidget";

describe("SearchWidget", () => {
  let eventBus;
  let form;
  let input;
  let widget;

  beforeEach(() => {
    eventBus = new EventEmitter();
    form = document.createElement("form");
    form.id = "test-form";
    input = document.createElement("input");
    input.id = "test-input";
    form.appendChild(input);
    document.body.appendChild(form);
    widget = new SearchWidget(eventBus, {
      formId: "test-form",
      inputId: "test-input",
    });
  });

  afterEach(() => {
    document.body.removeChild(form);
  });

  test("emits city:changed on submit with valid city", () => {
    const spy = jest.spyOn(eventBus, "emit");
    input.value = "London";
    form.dispatchEvent(new Event("submit", { bubbles: true }));
    expect(spy).toHaveBeenCalledWith("city:changed", "London");
    expect(input.value).toBe("");
  });

  test("emits weather:error on empty submit", () => {
    const spy = jest.spyOn(eventBus, "emit");
    input.value = "";
    form.dispatchEvent(new Event("submit", { bubbles: true }));
    expect(spy).toHaveBeenCalledWith(
      "weather:error",
      "Please enter a city name",
    );
  });
});
