import omBanner from '../../assets/ORTHO_header_1280x380.jpg'
import mobileBanner from '../../assets/ortho_BLOCKimage.jpg'

export const Hero = () => {
  return (
    <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-120 xl:h-144">
      {/* Mobile and Tablet Banner */}
      <div className="relative block w-full lg:hidden">
        <img
          className="object-cover w-screen h-64 sm:h-80 md:h-96 hero-image"
          src={mobileBanner}
          alt="Orthodontic Module Mobile Banner"
        />
        <div className="absolute inset-0 flex items-center justify-center px-2 -ml-12 sm:px-8 md:-ml-8">
          <div className="text-center text-white opacity-90">
            <div className="mt-1"></div>
          </div>
        </div>
      </div>

      {/* Desktop Banner */}
      <div className="relative hidden w-full lg:block">
        <img
          className="object-cover w-screen h-64 sm:h-80 md:h-96 lg:h-120 xl:h-144 hero-image"
          src={omBanner}
          alt="Orthodontic Module Desktop Banner"
        />
        <div className="absolute inset-0 flex items-center justify-center px-2 -ml-12 sm:px-8 md:-ml-8">
          <div className="text-center text-white opacity-90">
            <div className="mt-1"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
