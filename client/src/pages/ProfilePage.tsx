import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import profile from '../assets/profile.json';

const UserDetails = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between border p-4 rounded-lg mb-4">
    <h3 className="text-md font-medium text-gray-900 pr-4">{label}:</h3>
    <p className="text-md text-gray-700">{value}</p>
  </div>
);

interface UserProfile {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await axios.get(
          `${BACKEND_URL}/profile`
        );
        setUserProfile(profileResponse.data.userDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${BACKEND_URL}/logout`);
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
    <div className="container mx-auto p-4 flex flex-col md:flex-row items-start justify-center gap-8">
      <div className="inline-flex items-center space-x-2"></div>
      <div className="bg-white p-6 rounded-3xl shadow-2xl w-full md:w-1/2 max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          User Details
        </h1>
        {userProfile && (
          <div className="flex flex-col items-center">
            {/* Lottie animation here */}
            <Lottie
              animationData={profile}
              style={{ width: "200px", height: "200px", marginBottom: "16px" }}
            />
            <div className="w-full">
              <UserDetails label="Username" value={userProfile.username} />
              <UserDetails label="Email" value={userProfile.email} />
              {/* Add more user profile details as needed */}
            </div>
          </div>
        )}
        {/* Logout Button */}
        <button
          className="self-start mt-4 ml-4 p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
          onClick={handleLogout}
        >
          <div className="p-2">
            Logout
            <FontAwesomeIcon icon={faSignOutAlt} size="lg" className="pl-2" />
          </div>
        </button>
      </div>
      </div>
      </div>
  );
};

export default ProfilePage;