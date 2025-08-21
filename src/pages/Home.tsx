import IndividualProgram from '../components/IndividualProgram'
import { Hero } from '../components/shared/Hero'
import MicrocredDescription from '../components/shared/MicrocredDescription'
import PreRegistration from '../components/shared/PreRegistration'

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-keyin-white">
      <Hero />
      <PreRegistration />
      <IndividualProgram />
      <MicrocredDescription />
    </div>
  )
}

export default Home
