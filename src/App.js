import "./App.css"

import { Foo } from "./pages/Foo"
import { StoreProvider } from "./store"

function App() {
  return (
    <StoreProvider>
      <Foo />
    </StoreProvider>
  )
}

export default App
