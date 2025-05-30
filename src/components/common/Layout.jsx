import Footer from "./Footer"
import NavBar from "./NavBar"

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
        <NavBar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    )
}

export default Layout