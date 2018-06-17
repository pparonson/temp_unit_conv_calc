import {diff, patch} from "virtual-dom"
import createElement from "virtual-dom/create-element"

// WARNING: impure code below
function app(_model, _view, _update, _node) {
  let model = _model
  let currentView = _view(dispatch, model)
  // Render the currentView node to a DOM node
  let rootNode = createElement(currentView)
  _node.appendChild(rootNode)

  // update model state and view
  function dispatch(_msg) {
    model = _update(_msg, model)
    const updatedView = _view(dispatch, model);
    // compare currentView to updatedView
    const patches = diff(currentView, updatedView)
    // Update the DOM with the results of a diff
    rootNode = patch(rootNode, patches)
    currentView = updatedView
  }
}

export default app
