import React, { useEffect } from "react"

import { Button, Text } from "../../components"

import { FooStore } from "./index.store"

export const Foo = React.memo(() => {
  return (
    <FooStore>
      <Content />
    </FooStore>
  )
})

const Content = React.memo(({ onMount, products }) => {
  useEffect(() => {
    onMount()
  }, [onMount])

  return (
    <div>
      <Button onClick={() => console.log("clicked")} label="Click me!" />

      <Text is="h1">I'm a title!</Text>

      <input
        type="text"
        onChange={(evt) => products.search(evt.target.value)}
      />

      <ul>
        {products.data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  )
})
