import MainHeader from '../layout/MainHeader'
import HotelService from '../common/HotelService'
import Parallax from '../common/Parallax'
import RoomCorousel from '../common/RoomCorousel'

const Home = () => {
  return (
    <section>
      <MainHeader/>
      <section className='container'>
        <RoomCorousel/>
        <Parallax/>
        <RoomCorousel/>
        <HotelService/>
        <RoomCorousel/>
      </section>
    </section>
  )
}

export default Home