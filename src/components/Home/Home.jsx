import MainHeader from '../layout/MainHeader'
import HotelService from '../common/HotelService'
import Parallax from '../common/Parallax'

const Home = () => {
  return (
    <section>
      <MainHeader/>
      <section className='container'>
        <Parallax/>
        <HotelService/>
      </section>
    </section>
  )
}

export default Home