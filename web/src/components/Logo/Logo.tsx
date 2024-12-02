const Logo = () => {
  return (
    <div className="relative h-10 w-10">
      <svg
        viewBox="0 0 40 40"
        className="absolute h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="20" className="fill-blue-50" />
        <path
          d="M10 20h20M20 10v20"
          className="stroke-blue-500"
          strokeWidth="2"
        />
        <circle cx="15" cy="15" r="3" className="fill-green-500" />
        <circle cx="25" cy="25" r="3" className="fill-red-500" />
      </svg>
    </div>
  )
}

export default Logo
