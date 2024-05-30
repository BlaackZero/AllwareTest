import { PropsWithChildren } from "react"
import { LayoutContainer } from "./style"

export const MainLayout = ({children}: PropsWithChildren) => {
  return (
    <LayoutContainer>{children}</LayoutContainer>
  )
}
