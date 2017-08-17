import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';

import Auth from './Containers/Authentication/Auth';
import Nav from './Containers/Nav';
import Home from './Containers/Home';
import TodoList from './Containers/TodoList';

const Routes = () =>(
        <Switch>
            <Route exact path='/auth' component={Auth} />
            <Route path='/' render={()=>(
                <div>
                        <Nav />
                        <Route exact path='/' component={Home} />
                        <Route exact path='/todo-list' component={TodoList} />
                </div>
            )} />
            <Redirect from='/**' to='/auth'/>
        </Switch>
)

export default Routes;