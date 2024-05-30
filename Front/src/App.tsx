import { BrowserRouter } from "react-router-dom"
import { GlobalStyle } from "./GlobalStyle"
import { Navigation } from "./components/Navigation"
import '@fontsource/barlow';

export const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle/>
      <Navigation />
    </BrowserRouter>
  )
}
