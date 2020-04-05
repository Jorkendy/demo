import React from "react"
import { render } from "react-dom"

import "./index.scss"

import("./App").then(({ default: App }) => {
  render(<App />, document.querySelector("#root"))
})
