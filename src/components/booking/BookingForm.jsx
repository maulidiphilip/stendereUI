import React, { useState } from 'react'
import { bookRoom, getRoomById } from '../Utils/ApiFunctions'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'

const BookingForm = () => {

    const [validated, setIsValidated] = useState(false)
    const [submit, setIsSubmitted] = useState(false)
    const [errMessage, setErrMessage] = useState("")
    const [roomPrice, setRoomPrice] = useState(0)
    const [booking, setBooking] = useState({
        guestName: "",
        guestEmail: "",
        checkInDate: "",
        checkOutDate: "",
        numOfAdults: "",
        numOfChildren: "",
    })
    // get room info
    const [roomInfo, setRoomInfo] = useState({
      photo: "",
      roomType: "",
      roomPrice: ""
    })

    const [roomId] = useParams()
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setBooking({...booking, [name] : value})
        setErrMessage("")
    }

    const getRoomPriceById = async(roomId) => {
      try {
        const response = await getRoomById(roomId)
        setRoomPrice(response.roomPrice)
      } catch (error) {
        throw new Error(error);
        
      }
    } 

    useEffect(() => {
      getRoomPriceById(roomId)
    }, [roomId])

    // a function to calculate the price based on the number of rooms selected by the room
    const calculatePayment = () => {
      const checkInDate = moment(booking.checkInDate)
      const checkOutDate = moment(booking.checkOutDate)

      const diffInDays = checkOutDate.diff(checkInDate)
      const paymentPricePerDay = roomPrice ? roomPrice : 0
      return diffInDays * paymentPricePerDay
    }

    const isGuestCountValid = () => {
      const adultCount = parseInt(booking.numOfAdults)
      const childrenCount = parseInt(booking.numOfChildren)
      const totalCount = adultCount + childrenCount

      // before the booking form is valid make sure we have at least one num of adult and zero children is fine
      return totalCount >= 1 && adultCount >= 1
    }


    const isCheckOutDateValid = () => {
      if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
        setErrMessage("Check out date must be after check-in-date")
        return false
      } else {
        setErrMessage("")
        return true
      }
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      const form = e.currentTarget
      if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
        e.stopPropagation()
      } else {
        setIsSubmitted(true)
      }
      setIsValidated(true)
    }

    // function to handle the booking now, the one that will interarct eith the database
    const handleBooking = async () => {
      try {
        const confirmationCode = await bookRoom(roomId, booking)
        setIsSubmitted(true)
        navigate("/", { state: { message: confirmationCode } })
      } catch (error) {
        setErrMessage(error.message)
        navigate("/", { state: { error: errMessage } })
      }
    }

  return (
    <div>BookingForm</div>
  )
}

export default BookingForm