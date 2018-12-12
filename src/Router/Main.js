import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../Home'
import Board from '../Othello/Board'

// The Main component renders the provided
// routes (provided that one matches). The /board
// route will match any pathname that starts
// with /board The '/' route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/board' component={Board}/>
    </Switch>
  </main>
)

export default Main