import { lazy } from "react"

export const Pages = {
  Foo: lazy(() => import("./Foo")),
}
