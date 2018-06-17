import * as R from "ramda"
import {h} from "virtual-dom"
import hh from "hyperscript-helpers"

import {leftValueInputMsg, rightValueInputMsg} from "./update"

const {pre, div, h1, input, select, option} = hh(h)

const UNITS = ["Celcius", "Fahrenheit", "Kelvin"]

function unitOptions(_selectedUnit) {
  // transform selected unit into option tag
  return R.map(item => option({value: item, selected: _selectedUnit === item}, item)
  , UNITS)
}

function unitSection(_unit, _value, _oninput) {
    return div({className: "mw-50 ma1"}, [
      input({
        className: "pa2 br2 w-100 mv2 input-reset db dim grow ba b--black-40"
        , type: "text"
        , value: _value
        // oninput triggers call to update fn and passes msg and updated state
        , oninput: _oninput
      })
      // , div({className: "pa2 w-40 mb2 dib tc black-40"}, "=")
      , select(
        {className: "db w-100 mv2 pa2 input-reset db dim ba b--black-40 bg-white"}
        // unit select options
        , unitOptions(_unit))
    ])
}

function view(_dispatch, _model) {
  return div({className: "mw6 center"}, [
    h1({className: "f2 pv2 bb"}, "Temperature Unit Conversion Calculator")
    , div({className: "flex"}, [
      unitSection(
        UNITS[0]
        , _model.leftValue
        , e => _dispatch(leftValueInputMsg(e.target.value)))
      , unitSection(
        UNITS[1]
        , _model.rightValue
        , e => _dispatch(rightValueInputMsg(e.target.value)))
    ])

    // creates pre-tag for pre-formated text
    , pre( JSON.stringify(_model, null, 2) )
  ])
}

// helpers


export default view
