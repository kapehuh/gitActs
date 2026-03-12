// src/core/router.ts
interface Route {
  path: string;
  handler: (params: Record<string, string>) => void;
}

class Router {
  private routes: Route[] = [];
  private currentPath = "";

  addRoute(
    path: string,
    handler: (params: Record<string, string>) => void,
  ): void {
    this.routes.push({ path, handler });
  }

  private matchRoute(
    path: string,
  ): {
    handler: (params: Record<string, string>) => void;
    params: Record<string, string>;
  } | null {
    for (const route of this.routes) {
      const routeParts = route.path.split("/");
      const pathParts = path.split("/");
      if (routeParts.length !== pathParts.length) continue;

      const params: Record<string, string> = {};
      let match = true;
      for (let i = 0; i < routeParts.length; i++) {
        if (routeParts[i].startsWith(":")) {
          const paramName = routeParts[i].substring(1);
          params[paramName] = decodeURIComponent(pathParts[i]);
        } else if (routeParts[i] !== pathParts[i]) {
          match = false;
          break;
        }
      }
      if (match) {
        return { handler: route.handler, params };
      }
    }
    return null;
  }

  navigate(path: string): void {
    window.history.pushState({}, "", path);
    this.handlePath(path);
  }

  private handlePath(path: string): void {
    const match = this.matchRoute(path);
    if (match) {
      match.handler(match.params);
    } else {
      console.warn(`No route found for path: ${path}`);
    }
  }

  start(): void {
    window.addEventListener("popstate", () => {
      this.handlePath(window.location.pathname);
    });
    this.handlePath(window.location.pathname);
  }
}

export default Router;
