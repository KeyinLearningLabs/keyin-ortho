const PreRegistration = () => {
  return (
    <div className="mx-auto card-container">
      <div className="grid items-start gap-4 sm:grid-cols-1 md:grid-cols-2">
        {/* Left Column: Text & Call to Action */}
        <div className="mt-6 text-center sm:mx-4 sm:mt-12">
          <p className="mx-2 text-xl leading-relaxed sm:mx-0">
            The <span className="font-semibold">Orthodontic Module for Dental Assistants </span> is designed to equip
            participants with the knowledge and clinical skills required to support orthodontic procedures within the
            dental practice, in alignment with current Newfoundland and Labrador regulations.
          </p>

          {/* Call to Action */}
          <div className="mt-8">
            <p className="text-xl font-bold text-black">
              Pre-Registration is Now Open
              <br />
              Seats are limited - Secure Yours Today!
            </p>

            <a
              href="/pre-register"
              className="inline-block px-6 py-2 mt-4 text-lg font-medium rounded-md whitespace-nowrap text-keyin-white bg-keyin-green hover:bg-keyin-green-hover"
            >
              PRE-REGISTER
            </a>

            {/* <p className="mt-4 text-lg font-semibold text-black">
              August not the right fit? Our September cohorts open next week!
            </p> */}
          </div>
        </div>

        {/* Right Column: Circle & Program Details */}
        <div className="flex flex-col items-center justify-start w-full mt-6 sm:mt-12">
          {/* Circle Badge */}
          <div className="flex items-center justify-center w-64 h-64 text-center border-8 border-black rounded-full">
            <div className="px-2 space-y-1 leading-tight">
              <div>
                <span className="text-3xl text-keyin-bright-blue">Approximately</span>
              </div>
              <div>
                <span className="text-3xl text-keyin-bright-blue">45</span>
              </div>
              <div>
                <span className="text-3xl text-keyin-bright-blue">hours</span>
              </div>
              {/* <div>
                <span className="text-3xl font-semibold text-keyin-red">available!</span>
              </div> */}
            </div>
          </div>

          {/* Program Details */}
        </div>
      </div>
    </div>
  )
}

export default PreRegistration
