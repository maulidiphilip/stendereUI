import axios from "axios";

export const api = axios.create({
    baseURL : "http://localhost:9192"
})

export const getHeader = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
}

// this method is used to add a new room into the database or in our application
export async function addRoom(photo, roomType, roomPrice) {
	const formData = new FormData()
	formData.append("photo", photo)
	formData.append("roomType", roomType)
	formData.append("roomPrice", roomPrice)

	const response = await api.post("/rooms/add/new-room", formData)
	if (response.status === 201) {
		return true
	} else {
		return false
	}
}

/* This function gets all room types from thee database */
export async function getRoomTypes() {
	try {
		const response = await api.get("/rooms/room/types")
		return response.data
	} catch (error) {
		throw new Error("Error fetching room types")
	}
}

// function to get all the room from the backend/database 
export async function getAllRooms(){
	try {
		const results = await api.get("/rooms/all-rooms")
		return results.data
	} catch (error) {
		throw new Error("Error fetching rooms");
		
	}
}
// this function will handle the delete options
export async function deleteRoom(roomId) {
	try {
		const result = await api.delete(`/rooms/delete/room/${roomId}`)
		return result.data
	} catch (error) {
		throw new Error(`Error occurred deleteing the room ${error.message}`);
		
	}
}