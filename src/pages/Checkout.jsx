import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../api/axiosInstance";
import Loader from "../components/Loader";

function Checkout() {
  const { id } = useParams(); // slot_id
  const location = useLocation();
  const experience = location.state?.experience; // ✅ passed from Details page
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [seats, setSeats] = useState(1);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [promoLoading, setPromoLoading] = useState(false);

  // 🧮 Apply Promo
  const handlePromo = async () => {
    if (!promoCode.trim()) return alert("Enter a promo code!");
    try {
      setPromoLoading(true);
      const res = await api.post("/promo/validate", { code: promoCode });
      if (res.data.success) {
        setDiscount(res.data.data.discount);
        alert(`Promo applied! ${res.data.data.discount}% off`);
      } else {
        alert(res.data.message || "Invalid promo code!");
      }
    } catch (err) {
      console.error(err);
      alert("Invalid promo code");
    } finally {
      setPromoLoading(false);
    }
  };

  // 💾 Submit Booking
  const handleBooking = async (e) => {
    e.preventDefault();
    if (!userName || !email) return alert("Please fill in all details");

    try {
      setLoading(true);
      const res = await api.post("/bookings", {
        experience_id: experience?.id, // ✅ required
        slot_id: id,
        user_name: userName,
        user_email: email, // ✅ renamed key
        seats_booked: seats, // ✅ renamed key
        promo_code: promoCode || null,
      });

      if (res.data.success) {
        navigate("/result", { state: { success: true, booking: res.data.data } });
      } else {
        navigate("/result", { state: { success: false, message: res.data.message } });
      }
    } catch (err) {
      console.error("Booking failed:", err);
      navigate("/result", {
        state: { success: false, message: "Booking failed. Please try again." },
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  if (!experience)
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-600">
        Invalid booking request. Please select an experience again.
      </div>
    );

  return (
    <div className="max-w-lg mx-auto p-6 mt-10 bg-white rounded-2xl shadow">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Checkout</h1>

      {/* ✅ Experience Summary */}
      <div className="mb-6 border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-800">{experience.title}</h2>
        <p className="text-gray-600 mb-2">{experience.description}</p>
        <p className="text-gray-800 font-semibold">Base Price: ₹{experience.base_price}</p>
      </div>

      <form onSubmit={handleBooking} className="space-y-5">
        <div>
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-blue-600"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-blue-600"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Seats</label>
          <input
            type="number"
            min="1"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-blue-600"
          />
        </div>

        {/* Promo Code Section */}
        <div>
          <label className="block text-gray-700 mb-1">Promo Code</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2 focus:outline-blue-600"
              placeholder="Enter promo code"
            />
            <button
              type="button"
              onClick={handlePromo}
              disabled={promoLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {promoLoading ? "..." : "Apply"}
            </button>
          </div>
        </div>

        <div className="border-t pt-4 mt-4">
          <p className="text-gray-700">
            <strong>Seats:</strong> {seats}
          </p>
          <p className="text-gray-700">
            <strong>Discount:</strong> {discount}%
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

export default Checkout;
