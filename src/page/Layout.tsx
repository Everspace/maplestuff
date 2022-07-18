import { Container } from "@mui/material"

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return <Container sx={{ py: 3, maxHeight: "100vh" }}>{children}</Container>
}
export default Layout
