import { useLocation, Link } from "react-router-dom";

function Result() {
  const location = useLocation();
  const data = location.state;

  if (!data)
    return (
      <div className="flex flex-col justify-center items-center h-[70vh]">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">No booking data</h1>
        <Link to="/" className="text-blue-600 hover:underline">
          Go back to Home
        </Link>
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center h-[70vh] text-center px-6">
      {data.success ? (
        <>
          <h1 className="text-3xl font-bold text-green-600 mb-3">
            🎉 Booking Confirmed!
          </h1>
          <p className="text-gray-700 mb-4">
            Thank you, {data.booking.user_name}! Your booking was successful.
          </p>
          <p className="text-gray-600">
            You have booked <strong>{data.booking.seats}</strong> seat(s) for{" "}
            <strong>{data.booking.experience_title}</strong>.
          </p>
          <p className="text-gray-600 mt-2">
            Confirmation sent to: <strong>{data.booking.email}</strong>
          </p>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-red-600 mb-3">❌ Booking Failed</h1>
          <p className="text-gray-700 mb-4">
            {data.message || "Something went wrong. Please try again."}
          </p>
        </>
      )}

      <Link
        to="/"
        className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default Result;
