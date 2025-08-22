import omBanner from '../../assets/Ortho draft header.jpg'

export const Hero = () => {
  const banners = [
    {
      id: 2,
      image: omBanner,
      alt: 'Banner 2',
      title: 'AI for NL Tourism'
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
          <div className="absolute inset-0 flex items-center justify-center px-2 -ml-12 sm:px-8 md:-ml-8">
            <div className="text-center text-white opacity-90">
              <div className="mt-1"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
