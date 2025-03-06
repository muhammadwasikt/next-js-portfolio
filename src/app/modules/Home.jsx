import dynamic from "next/dynamic"

const Hero = dynamic(() => import('@/components/sections/hero/default'))



const Home = () => {
  return (
    <div>
      <Hero />
    </div>
  )
}

export default Home
