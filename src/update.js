import * as R from "ramda"

const MSGS = {
  LEFT_VALUE_INPUT: "LEFT_VALUE_INPUT"
  , RIGHT_VALUE_INPUT: "RIGHT_VALUE_INPUT"
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

function update(_msg, _model) {
  if (_msg.type === "LEFT_VALUE_INPUT") {
    // clear the input fields
    if (_msg.leftValue === "") {
      return {..._model, leftValue: "", rightValue: "", isLeftSource: true}
    }
    // return new model with updated input values
    const _leftValue = toInt(_msg.leftValue)
    return {
      // spread the new obj and overwrite the value
      ..._model, leftValue: _leftValue, isLeftSource: true
    }
  }
  if (_msg.type === "RIGHT_VALUE_INPUT") {
    // clear the input fields
    if (_msg.rightValue === "") {
      return {..._model, leftValue: "", rightValue: "", isLeftSource: false}
    }
    // return new model with updated input values
    const _rightValue = toInt(_msg.rightValue)
    return {
      // spread the new obj and overwrite the value
      ..._model, rightValue: _rightValue, isLeftSource: false
    }
  }

  return _model
}

// helpers
const toInt = R.compose(
  R.defaultTo(0)
  , parseInt
)

export default update
