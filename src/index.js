/**
 * Created by Jonathan Batista <jonathan.b.d.o.s@gmail.com> on 5/22/17.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import { Provider} from 'react-redux';

import configureStore from './store/configureStore';
import ZSSN from './components/ZSSN';

const store = configureStore();

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component/>
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
};

render(ZSSN);

if (module.hot) {
    module.hot.accept('./components/ZSSN', () => {
        render(ZSSN);
    });
}
