import { useState } from "react";
import addRoom from '../Utils/ApiFunctions'

const addRoom = () => {
  // varibale to hold the information
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });

  // variable to handle image previewing, because we are going to preview image b4 submitting to the database
  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRoomInputChange = (e) => {
    const name = e.target.name;

    let value = e.target.value;
    if (name === "roomPrice") {
      if (!isNaN(value)) {
        value = parseInt(value);
      } else {
        value = "";
      }
    }
    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0]
		setNewRoom({ ...newRoom, photo: selectedImage })
		setImagePreview(URL.createObjectURL(selectedImage))
  } 

  // function to handle the submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice)
      if (success !==undefine) {
        setSuccessMessage("A new room created")
        setNewRoom({photo : null, roomType : "", roomPrice : ""})
        setImagePreview("")
        setErrorMessage("")
      } else {
        setErrorMessage("Error in adding room!!!!")
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  }
  return (
    <>
      <section></section>
    </>
  );
};

export default addRoom;
