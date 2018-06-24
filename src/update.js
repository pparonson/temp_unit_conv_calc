import * as R from "ramda"

const MSGS = {
  LEFT_VALUE_INPUT: "LEFT_VALUE_INPUT"
  , RIGHT_VALUE_INPUT: "RIGHT_VALUE_INPUT"
  , LEFT_UNIT_CHANGE: "LEFT_UNIT_CHANGE"
  , RIGHT_UNIT_CHANGE: "RIGHT_UNIT_CHANGE"
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
    const _rightValue = convertValue(_model, _leftValue)
    return {
      // spread the new obj and overwrite the value
      ..._model
      , rightValue: _rightValue
      , leftValue: _leftValue
      , isLeftSource: true
    }
  }
  if (_msg.type === "RIGHT_VALUE_INPUT") {
    // clear the input fields
    if (_msg.rightValue === "") {
      return {..._model, leftValue: "", rightValue: "", isLeftSource: false}
    }
    // return new model with updated input values
    const _rightValue = toInt(_msg.rightValue)
    const _leftValue = convertValue(_model, _rightValue)
    return {
      // spread the new obj and overwrite the value
      ..._model
      , leftValue: _leftValue
      , rightValue: _rightValue
      , isLeftSource: false
    }
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

function convertValue(_model, _value) {
  const {leftUnit, rightUnit, isLeftSource} = _model
  if (isLeftSource) {
    if (leftUnit === "Celcius" && rightUnit === "Celcius") {
      // return {..._model, rightValue: _value}
      return _value
    }
    if (leftUnit === "Celcius" && rightUnit === "Fahrenheit") {
      // return {..._model, rightValue: convCelciusToFahrenheit(_value)}
      return convCelciusToFahrenheit(_value)
    }
    if (leftUnit === "Celcius" && rightUnit === "Kelvin") {
      // return {..._model, rightValue: convCelciusToKelvin(_value)}
      return convCelciusToKelvin(_value)
    }

    if (leftUnit === "Fahrenheit" && rightUnit === "Celcius") {
      // return {..._model, rightValue: convFahrenheitToCelcius(_value)}
      return convFahrenheitToCelcius(_value)
    }
    if (leftUnit === "Fahrenheit" && rightUnit === "Fahrenheit") {
      // return {..._model, rightValue: _value}
      return _value
    }
    if (leftUnit === "Fahrenheit" && rightUnit === "Kelvin") {
      // return {..._model, rightValue: convFahrenheitToKelvin(_value)}
      return convFahrenheitToKelvin(_value)
    }

    if (leftUnit === "Kelvin" && rightUnit === "Celcius") {
      // return {..._model, rightValue: convKelvinToCelcius(_value)}
      return convKelvinToCelcius(_value)
    }
    if (leftUnit === "Kelvin" && rightUnit === "Fahrenheit") {
      // return {..._model, rightValue: convKelvinToFahrenheit(_value)}
      convKelvinToFahrenheit(_value)
    }
    if (leftUnit === "Kelvin" && rightUnit === "Kelvin") {
      // return {..._model, rightValue: _value}
      return _value
    }
  } else {
    if (leftUnit === "Celcius" && rightUnit === "Celcius") {
      // return {..._model, rightValue: _value}
      return _value
    }
    if (leftUnit === "Celcius" && rightUnit === "Fahrenheit") {
      // return {..._model, rightValue: convCelciusToFahrenheit(_value)}
      return convFahrenheitToCelcius(_value)
    }
    if (leftUnit === "Celcius" && rightUnit === "Kelvin") {
      // return {..._model, rightValue: convCelciusToKelvin(_value)}
      return convKelvinToCelcius(_value)
    }

    if (leftUnit === "Fahrenheit" && rightUnit === "Celcius") {
      // return {..._model, rightValue: convFahrenheitToCelcius(_value)}
      return convCelciusToFahrenheit(_value)
    }
    if (leftUnit === "Fahrenheit" && rightUnit === "Fahrenheit") {
      // return {..._model, rightValue: _value}
      return _value
    }
    if (leftUnit === "Fahrenheit" && rightUnit === "Kelvin") {
      // return {..._model, rightValue: convFahrenheitToKelvin(_value)}
      return convKelvinToFahrenheit(_value)
    }

    if (leftUnit === "Kelvin" && rightUnit === "Celcius") {
      // return {..._model, rightValue: convKelvinToCelcius(_value)}
      return convCelciusToKelvin(_value)
    }
    if (leftUnit === "Kelvin" && rightUnit === "Fahrenheit") {
      // return {..._model, rightValue: convKelvinToFahrenheit(_value)}
      return convFahrenheitToKelvin(_value)
    }
    if (leftUnit === "Kelvin" && rightUnit === "Kelvin") {
      // return {..._model, rightValue: _value}
      return _value
    }
  }
}

function convCelciusToFahrenheit(_value) {
  return ((9/5) * _value) + 32
}

function convCelciusToKelvin(_value) {
  return _value - 273.15
}

function convFahrenheitToCelcius(_value) {
  return (5/9) * (_value - 32)
}

// point-free notation, _value
const convFahrenheitToKelvin = R.compose(
  convCelciusToKelvin
  , convFahrenheitToCelcius
)

function convKelvinToCelcius(_value) {
  return _value + 273.15
}

// point-free, _value
const convKelvinToFahrenheit = R.compose(
  convCelciusToFahrenheit
  , convKelvinToCelcius
)

export default update
