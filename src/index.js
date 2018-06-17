import initModel from "./model"
import view from "./view"
import update from "./update"
import app from "./app"

const node = document.getElementById("app")

app(initModel, view, update, node)
