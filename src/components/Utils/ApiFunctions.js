import axios from "axios";

export const api = axios.create({
    baseURL : "http://localhost:8080"
})

// this method is used to add a new room into the database or in our application
export async function addRoom(photo, roomType, roomPrice) {
    const formData = new formData();

    formData.append("photo", photo)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)

    const response = await api.post("/add/new-rooms", formData)

    if (response.status === 201) {
        return true
    } else {
        return false
    }
}

// function to get room for this application
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/room/types")
        return response.data
    } catch (error) {
        throw new Error("Failetd to get the rooms");
        
    }
}