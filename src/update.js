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
    const {leftValue} = _msg
    return {
      // spread the new obj and overwrite the value
      ..._model, leftValue
    }
  }
  if (_msg.type === "RIGHT_VALUE_INPUT") {
    const {rightValue} = _msg;
    return {
      // spread the new obj and overwrite the value
      ..._model, rightValue
    }
  }

  return _model
}

export default update
