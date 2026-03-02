class Router {
  constructor() {
    this.routes = [];
    this.handleHashChange = this.handleHashChange.bind(this);
  }

  addRoute(pattern, callback) {
    this.routes.push({ pattern, callback });
  }

  start() {
    window.addEventListener("hashchange", this.handleHashChange);
    this.handleHashChange();
  }

  stop() {
    window.removeEventListener("hashchange", this.handleHashChange);
  }

  handleHashChange() {
    const hash = window.location.hash.slice(1) || "/";
    this.navigate(hash);
  }

  navigate(path) {
    for (const route of this.routes) {
      const params = this._mathchRoute(route.pattern, path);
      if (params !== null) {
        route.callback(params);
        return;
      }
    }
    console.warn(`No route matched for path: ${path}`);
  }

  _mathchRoute(pattern, actualPath) {
    const patternParts = pattern.split("/").filter((p) => p);
    const actualParts = actualPath.split("/").filter((p) => p);
    if (patternParts.length !== actualParts.length) return null;

    const params = {};
    for (let i = 0; i < patternParts.length; i++) {
      const patternPart = patternParts[i];
      const actualPart = actualParts[i];
      if (patternPart.startsWith(":")) {
        const paramName = patternPart.slice(1);
        params[paramName] = actualPart;
      } else if (patternPart !== actualPart) {
        return null;
      }
    }
    return params;
  }
}

export default Router;
