export const ContactButtons = () => {
  return (
    <div className="flex flex-col items-end">
      <div className="flex gap-1 justify-between items-center w-full"></div>

      <div className="flex gap-0.5">
        {/* <a
          href="/contact-us"
          className="inline-block px-2 py-1 text-sm font-medium whitespace-nowrap rounded-md bg-keyin-gray hover:bg-keyin-gray-hover text-keyin-black"
        >
          NEED HELP?
        </a> */}
        <a
          href="/pre-register"
          className="inline-block px-2 py-1 text-sm font-medium whitespace-nowrap rounded-md bg-keyin-green hover:bg-keyin-green-hover text-keyin-white"
        >
          PRE-REGISTER
        </a>
      </div>
    </div>
  )
}
