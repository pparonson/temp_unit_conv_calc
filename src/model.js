const initModel = {
  leftValue: 0
  , leftUnit: "Celcius"
  , rightValue: 32
  , rightUnit: "Fahrenheit"
  , isLeftSource: true
}

// helpers
function celciusToFahrenheit(_model) {
  const {temperature} = _model
  // (T(°C) = (T(°F) - 32) / 1.8
  return ( (temperature - 32) / 1.8 )
}

function fahrenheitToCelcius(_model) {
  const {temperature} = _model
  // T(°F) = T(°C) × 1.8 + 32
  return ( (temperature * 1.8) + 32 )

}

export default initModel
