"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../api/axiosInstance"
import Loader from "../components/Loader"

function Details() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [experience, setExperience] = useState(null)
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSlot, setSelectedSlot] = useState(null)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await api.get(`/experiences/${id}`)
        setExperience(res.data.data.experience)
        setSlots(res.data.data.slots)
      } catch (err) {
        console.error("Error fetching details:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [id])

  const handleBooking = () => {
    if (!selectedSlot) {
      alert("Please select a slot before proceeding!")
      return
    }
    navigate(`/checkout/${selectedSlot}`, { state: { experience } })
  }

  if (loading) return <Loader />

  if (!experience)
    return <div className="flex justify-center items-center h-[60vh] text-slate-600">No details available.</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <img
            src={experience.image_url || "/placeholder.svg"}
            alt={experience.title}
            className="w-full h-96 object-cover"
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">{experience.title}</h1>
          <p className="text-slate-600 text-lg leading-relaxed mb-6">{experience.description}</p>
          <div className="inline-block bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
            <p className="text-2xl font-bold text-blue-600">₹{experience.base_price}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Available Slots</h2>
          {slots.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No slots available currently.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {slots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedSlot === slot.id
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                      : "bg-white text-slate-700 border-slate-200 hover:border-blue-400 hover:bg-blue-50"
                  }`}
                >
                  <p className="font-semibold">{new Date(slot.date).toDateString()}</p>
                  <p className="text-sm mt-2 opacity-75">{slot.available_seats} seats</p>
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleBooking}
          disabled={!selectedSlot}
          className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
            selectedSlot
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl cursor-pointer"
              : "bg-slate-300 text-slate-500 cursor-not-allowed"
          }`}
        >
          {selectedSlot ? "Proceed to Checkout" : "Select a Slot to Continue"}
        </button>
      </div>
    </div>
  )
}

export default Details
