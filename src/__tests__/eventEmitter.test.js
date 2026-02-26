import EventEmitter from "../core/eventEmitter";

describe("EventEmitter", () => {
  let emitter;

  beforeEach(() => {
    emitter = new EventEmitter();
  });

  test("should register and emit event", () => {
    const listener = jest.fn();
    emitter.on("test", listener);
    emitter.emit("test", "arg1", "arg2");
    expect(listener).toHaveBeenCalledWith("arg1", "arg2");
  });

  test("should support multiple listeners", () => {
    const l1 = jest.fn();
    const l2 = jest.fn();
    emitter.on("test", l1);
    emitter.on("test", l2);
    emitter.emit("test", "data");
    expect(l1).toHaveBeenCalledWith("data");
    expect(l2).toHaveBeenCalledWith("data");
  });

  test("should unsubscribe with off", () => {
    const listener = jest.fn();
    emitter.on("test", listener);
    emitter.off("test", listener);
    emitter.emit("test");
    expect(listener).not.toHaveBeenCalled();
  });

  test("should unsubscribe using returned function", () => {
    const listener = jest.fn();
    const unsubscribe = emitter.on("test", listener);
    unsubscribe();
    emitter.emit("test");
    expect(listener).not.toHaveBeenCalled();
  });

  test("should not affect other listeners when unsubscribing", () => {
    const l1 = jest.fn();
    const l2 = jest.fn();
    emitter.on("test", l1);
    emitter.on("test", l2);
    emitter.off("test", l1);
    emitter.emit("test");
    expect(l1).not.toHaveBeenCalled();
    expect(l2).toHaveBeenCalled();
  });

  test("should handle emit with no listeners", () => {
    expect(() => emitter.emit("none")).not.toThrow();
  });

  test("should throw if listener is not a function", () => {
    expect(() => emitter.on("test", "not function")).toThrow(TypeError);
  });

  test("should allow self-unsubscribe during emit", () => {
    const listener = jest.fn(() => {
      emitter.off("test", listener);
    });
    emitter.on("test", listener);
    emitter.emit("test");
    emitter.emit("test"); // второй вызов не должен сработать
    expect(listener).toHaveBeenCalledTimes(1);
  });

  test("should continue other listeners even if one throws", () => {
    const errorListener = jest.fn(() => {
      throw new Error("Oops");
    });
    const normalListener = jest.fn();
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    emitter.on("test", errorListener);
    emitter.on("test", normalListener);
    emitter.emit("test");
    expect(errorListener).toHaveBeenCalled();
    expect(normalListener).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  test("clear should remove all listeners", () => {
    const listener = jest.fn();
    emitter.on("test", listener);
    emitter.clear();
    emitter.emit("test");
    expect(listener).not.toHaveBeenCalled();
  });
});
