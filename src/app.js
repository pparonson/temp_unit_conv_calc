import {diff, patch} from "virtual-dom";
import createElement from "virtual-dom/create-element";

// WARNING: impure code below
function app(_model, _view, _update, _node) {
  let model = _model;
  let currentView = _view(model);
  let rootNode = createElement(currentView);
  _node.appendChild(rootNode);

  // update
  function dispatch(_msg) {
    model = _update(_msg, model);
    const updatedView = _view(model);
    const patches = diff(currentView, updatedView);
    rootNode = patch(rootNode, patches);
    currentView = updatedView;
  }
}

export default app;
