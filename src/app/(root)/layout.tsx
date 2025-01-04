import Navbar from '@/src/components/Navbar'

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default Layout
