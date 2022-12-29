import Link from "next/link";

export default function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex h-screen">
      <div className="w-[400px] max-h-[550px] h-full bg-slate-200 p-4 m-auto drop-shadow-md rounded-md flex flex-col justify-between">
        <header>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  className="font-bold transition-colors duration-200 hover:text-blue-600"
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="font-bold transition-colors duration-200 hover:text-blue-600"
                  href="/ssr"
                >
                  Users
                </Link>
              </li>
              <li>
                <Link
                  className="font-bold transition-colors duration-200 hover:text-blue-600"
                  href="/csr"
                >
                  Create User
                </Link>
              </li>
              <li>
                <Link
                  className="font-bold transition-colors duration-200 hover:text-blue-600"
                  href="/web3"
                >
                  Web3
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="flex-1 py-4">{children}</main>
        <footer className="text-center">
          <span className="text-sm">© 2022 TradeWise Interview</span>
        </footer>
      </div>
    </div>
  );
}
