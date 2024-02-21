import Logo from "../Logo";
import CartRoute from "./CartRoute";
import MobileMenu from "./Mobile-Menu";
import Route from "./Route";
import SearchProduct from "./Search";
import WishListRoute from "./WishListRoute";


export default function Navbar() {
  const routes = ["home", "contact", "about"];
  return (
    <nav className="w-full fixed h-[70px] border-red-600 border-b-2 shadow-xl px-5 flex justify-between items-center z-10 bg-white">
      <section>
        <Logo />
      </section>
      <section className="hidden lg:flex items-center gap-5">
        <Route />
      </section>
      <section className="flex items-center gap-3">
        <SearchProduct className="w-7 h-7" />
        <WishListRoute />
        <CartRoute />
        <MobileMenu className="lg:hidden w-7 h-7" />
      </section>
    </nav>
  );
}
