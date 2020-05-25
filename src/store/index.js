import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import loggerMiddleware from './middleware/logger';
import rootReducer from './reducers';
import promise from 'redux-promise-middleware';

export default (preloadedState) => {
  const myMiddlewares = [loggerMiddleware, promise];
  const store = configureStore({
    reducer: rootReducer,
    middleware: [...myMiddlewares, ...getDefaultMiddleware()],
    preloadedState,
  });

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  return store;
};
