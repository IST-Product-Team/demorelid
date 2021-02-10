import { init } from "@rematch/core";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory({ basename: `/${process.env.REACT_APP_MICROSITENAME}` });

const middleware = routerMiddleware(history);

const store = init({
    models: {
    },
    redux: {
        reducers: {
            router: connectRouter(history)
        },
        middlewares: [middleware]
    }
});

export default store;
