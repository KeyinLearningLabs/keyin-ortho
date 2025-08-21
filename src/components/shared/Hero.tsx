import hnlbanner from '../../assets/HNL_landing_page.png'
import HNL_Logo from '../../assets/HNL_LOGO.png'
import keyinLogo from '../../assets/KEYIN LOGO secondary RGB-ai.png'
import smallLogo from '../../assets/white ARROW.png'

export const Hero = () => {
  const banners = [
    {
      id: 2,
      image: hnlbanner,
      alt: 'Banner 2',
      title: 'AI for NL Tourism',
      text: ['A Powerful Micro-Credential to', 'Unlock the Power of', 'AI in Tourism'],
      color: 'keyin-green',
      button: 'LEARN MORE',
      smallLogo: smallLogo
    }
  ]

  return (
    <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-120 xl:h-144">
      {banners.map((banner) => (
        <div key={banner.id} className="relative w-full">
          <img
            className="object-cover w-screen h-64 sm:h-80 md:h-96 lg:h-120 xl:h-144 hero-image"
            src={banner.image}
            alt={banner.alt}
          />
          <div className="flex absolute inset-0 justify-center items-center px-2 -ml-12 sm:px-8 md:-ml-8">
            <div className="text-center text-white opacity-90">
              {banner.smallLogo && (
                <div className="mb-3 md:mb-5">
                  <img className="mx-auto w-12 h-auto md:w-24 md:ml-44" src={banner.smallLogo} alt="Small logo" />
                </div>
              )}
              <h1 className="text-xl font-bold md:text-4xl md:mb-10 text-keyin-red">{banner.title}</h1>
              <p className="text-lg md:text-3xl md:-mt-10">Introducing:</p>
              <div className="mt-1">
                {banner.text.map((line, index) => (
                  <p key={index} className="text-lg font-bold leading-tight sm:text-2xl md:text-4xl text-keyin-black">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="flex absolute top-0 right-0 flex-col items-end pr-2 mt-2 space-y-2 md:mt-8 sm:pr-5 sm:pt-5 lg:-mt-0">
            <img
              className="mx-10 my-10 -mr-2 mb-12 w-28 h-auto scale-100 lg:w-52 lg:mr-5 md:mb-32 md:mr-10 md:scale-150 lg:mb-10"
              src={HNL_Logo}
              alt="HNL"
            />
            <p className="-mt-1 mr-4 text-xs leading-tight sm:text-lg md:mr-10">Training provided by:</p>
            <img
              className="object-cover mt-2 mr-8 w-20 h-auto leading-tight scale-110 lg:w-40"
              src={keyinLogo}
              alt="Keyin"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
