import DropdownMenu from "./Dropdown"

const Navbar = () => {
  return (
    <>
    <div className="flex justify-between items-center mb-4">
    <h2 className="text-2xl font-bold">Password Generator</h2>
    <DropdownMenu/>
  </div>

  </>
  )
}

export default Navbar
