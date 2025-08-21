const PreRegistration = () => {
  return (
    <div className="mx-auto card-container">
      <div className="grid gap-4 items-start sm:grid-cols-1 md:grid-cols-2">
        {/* Left Column: Text & Call to Action */}
        <div className="mt-6 text-center sm:mx-4 sm:mt-12">
          <p className="mx-2 text-xl leading-relaxed sm:mx-0">
            In partnership with{' '}
            <span className="font-semibold">Hospitality Newfoundland & Labrador, Keyin College</span> is proud to launch{' '}
            <span className="font-semibold">AI for Tourism</span>—a fully funded micro-credential designed to help
            tourism professionals unlock the power of artificial intelligence. This 40-hour, instructor-led course
            delivers practical tools that owners, managers, and frontline staff can use right away to boost
            productivity, streamline operations, and enhance guest experiences across the sector.
          </p>

          {/* Call to Action */}
          <div className="mt-12">
            <p className="text-xl font-bold text-black">
              Pre-Registration is Now Open for September Cohorts
              <br />
              Seats are limited - Secure Yours Today!
            </p>

            <a
              href="/pre-register"
              className="inline-block px-6 py-2 mt-4 text-lg font-medium whitespace-nowrap rounded-md text-keyin-white bg-keyin-green hover:bg-keyin-green-hover"
            >
              PRE-REGISTER
            </a>

            {/* <p className="mt-4 text-lg font-semibold text-black">
              August not the right fit? Our September cohorts open next week!
            </p> */}
          </div>
        </div>

        {/* Right Column: Circle & Program Details */}
        <div className="flex flex-col justify-start items-center mt-6 w-full sm:mt-12">
          {/* Circle Badge */}
          <div className="flex justify-center items-center w-64 h-64 text-center rounded-full border-8 border-black">
            <div className="px-2 space-y-1 leading-tight">
              <div>
                <span className="text-3xl text-keyin-red">Claim your</span>
              </div>
              <div>
                <span className="text-3xl text-keyin-red">
                  seat today—<span className="font-semibold">only</span>
                </span>
              </div>
              <div>
                <span className="text-3xl font-semibold text-keyin-red">200 funded spots</span>
              </div>
              <div>
                <span className="text-3xl font-semibold text-keyin-red">available!</span>
              </div>
            </div>
          </div>

          {/* Program Details */}
          <div className="mt-6 max-w-md text-lg leading-relaxed text-center text-gray-800">
            <p>
              <strong className="text-xl">Program Details:</strong>
              <br />
              Duration: 4-week Sprint (2hrs x 2 classes per week)
              <br />
              100% Funded – zero cost to you or yourself
              <br />
              Fully online & flexible – live, online + recorded catch-up sessions!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreRegistration
