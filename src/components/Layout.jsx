import { Outlet } from "react-router-dom";
import GraphSubheading from "./GraphSubheading";


function Layout()
{
  return(
    <>
      <GraphSubheading />
      <Outlet/>
    </>
  )
}
export default Layout;