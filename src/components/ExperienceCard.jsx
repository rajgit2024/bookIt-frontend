import { Link } from "react-router-dom"

function ExperienceCard({ exp }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform">
      {/* Image Container */}
      <div className="relative overflow-hidden h-48 bg-gray-200">
        <img
          src={exp.image_url || "/placeholder.svg"}
          alt={exp.title}
          className="h-full w-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Content Container */}
      <div className="p-5">
        {/* Title */}
        <h2 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">{exp.title}</h2>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{exp.description.slice(0, 80)}...</p>

        {/* Price */}
        <div className="mb-4">
          <p className="text-2xl font-bold text-blue-600">₹{exp.base_price}</p>
          <p className="text-xs text-gray-500">per person</p>
        </div>

        {/* View Details Button */}
        <Link
          to={`/details/${exp.id}`}
          className="w-full block text-center bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 active:scale-95"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default ExperienceCard
