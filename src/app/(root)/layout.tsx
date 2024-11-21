import Navbar from '../components/Navbar'

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className='font-work-sans'>
      <Navbar />
      layout nuevo {children}
    </main>
  )
}

export default Layout
