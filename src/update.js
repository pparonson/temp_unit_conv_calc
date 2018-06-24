import * as R from "ramda"

const MSGS = {
  LEFT_VALUE_INPUT: "LEFT_VALUE_INPUT"
  , RIGHT_VALUE_INPUT: "RIGHT_VALUE_INPUT"
  , LEFT_UNIT_CHANGE: "LEFT_UNIT_CHANGE"
  , RIGHT_UNIT_CHANGE: "RIGHT_UNIT_CHANGE"
}

const UNIT_CONVERSIONS = {
  CELCIUS: {
    FAHRENHEIT: convCtoF
    , KELVIN: convCtoK
  }
  , FAHRENHEIT: {
    CELCIUS: convFtoC
    , KELVIN: convFtoK
  }
  , KELVIN: {
    CELCIUS: convKtoC
    , FAHRENHEIT: convKtoF
  }
}

export function leftValueInputMsg(_leftValue) {
  return {
    type: MSGS.LEFT_VALUE_INPUT
    , leftValue: _leftValue
  }
}

export function rightValueInputMsg(_rightValue) {
  return {
    type: MSGS.RIGHT_VALUE_INPUT
    , rightValue: _rightValue
  }
}

export function leftUnitChangeMsg(_leftUnit) {
  return {
    type: MSGS.LEFT_UNIT_CHANGE
    , leftUnit: _leftUnit
  }
}

export function rightUnitChangeMsg(_rightUnit) {
  return {
    type: MSGS.RIGHT_UNIT_CHANGE
    , rightUnit: _rightUnit
  }
}

function update(_msg, _model) {
  if (_msg.type === "LEFT_VALUE_INPUT") {
    // clear the input fields
    if (_msg.leftValue === "") {
      return {..._model, leftValue: "", rightValue: "", isLeftSource: true}
    }
    // return new model with updated input values
    const _leftValue = toInt(_msg.leftValue)
    // return {
    //   // spread the new obj and overwrite the value
    //   ..._model, leftValue: _leftValue, isLeftSource: true
    // }
    return convert({..._model, leftValue: _leftValue, isLeftSource: true})
  }
  if (_msg.type === "RIGHT_VALUE_INPUT") {
    // clear the input fields
    if (_msg.rightValue === "") {
      return {..._model, leftValue: "", rightValue: "", isLeftSource: false}
    }
    // return new model with updated input values
    const _rightValue = toInt(_msg.rightValue)
    // return {
    //   // spread the new obj and overwrite the value
    //   ..._model, rightValue: _rightValue, isLeftSource: false
    // }
    return convert({..._model, rightValue: _rightValue, isLeftSource: false})
  }
  if (_msg.type === "LEFT_UNIT_CHANGE") {
    return {..._model, leftUnit: _msg.leftUnit}
  }
  if (_msg.type =="RIGHT_UNIT_CHANGE") {
    return {..._model, rightUnit: _msg.rightUnit}
  }

  return _model
}

// helpers
const toInt = R.compose(
  R.defaultTo(0)
  , parseInt
)

function convert(_model) {
  const {leftValue, leftUnit, rightValue, rightUnit, isLeftSource} = _model
  const [fromTemp, fromUnit, toUnit] = isLeftSource
    ? [leftValue, leftUnit, rightUnit]
    : [rightValue, rightUnit, leftUnit]

  // point-free
  const toValue = R.compose(
    round
    , convertFromToTemp
  )(fromUnit, toUnit, fromTemp)

  return (_model.isLeftSource
    ? {..._model, rightValue: toValue}
    : {..._model, leftValue: toValue}
  )
}

function convertFromToTemp(_fromUnit, _toUnit, _fromTemp) {
  const convertFn = R.pathOr(
    R.identity
    , [_fromUnit, _toUnit]
    , UNIT_CONVERSIONS
  )
  return convertFn(_fromTemp)
}

function round(_value) {
  return Math.round(_value)
}

function convCtoF(_value) {
  return ((9/5) * _value) + 32
}

function convCtoK(_value) {
  return _value - 273.15
}

function convFtoC(_value) {
  return (5/9) * (_value - 32)
}

function convKtoC(_value) {
  return _value + 273.15
}

// point-free notation, _value
const convFtoK = R.compose(
  convCtoK
  , convFtoC
)

// point-free, _value
const convKtoF = R.compose(
  convCtoF
  , convKtoC
)

export default update
