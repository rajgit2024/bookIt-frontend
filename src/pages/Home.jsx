import { useEffect, useState } from "react"
import api from "../api/axiosInstance"
import ExperienceCard from "../components/ExperienceCard"
import Loader from "../components/Loader"

function Home() {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await api.get("/experiences")
        setExperiences(res.data.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchExperiences()
  }, [])

  if (loading) return <Loader />

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Discover Experiences</h1>
          <p className="text-lg text-slate-600">Explore amazing activities and create unforgettable memories</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {experiences.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No experiences available</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {experiences.map((exp) => (
              <ExperienceCard key={exp.id} exp={exp} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
