import axios from "axios";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { NoData } from "../components/NoData";

interface Contribution {
  id: number;
  mobile: string;
  quantity: number;
  address: string;
  userId: number;
  wasteRequirementId: number;
  createdAt: string;
  updatedAt: string;
  wasteRequirement: {
    requirementId: number;
    image: string;
    name: string;
    description: string;
    price: number;
    initialQuantity: number;
    requiredQuantity: number;
    color: string;
    weight: number;
    length: number;
    width: number;
    height: number;
    uploaderId: number;
    createdAt: string;
    updatedAt: string;
  };
}

export const UserContributionsPage = () => {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/getContributions`);
        setContributions(response.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : contributions.length === 0 ? (
        <NoData text={"You haven't contributed any waste for artisans"}/>
      ) : (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">S. no.</td>
                <td className="px-6 py-4">Name</td>
                <td className="px-6 py-4">Requirement Id</td>
                <td className="px-6 py-4">Quantity Contributed</td>
                <td className="px-6 py-4">RequiredQuantity</td>
                <td className="px-6 py-4">Image</td>
              </tr>
            </thead>
            <tbody>
              {contributions.map((contribution, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{contribution.wasteRequirement.name}</td>
                  <td className="px-6 py-4">
                    {contribution.wasteRequirement.requirementId}
                  </td>
                  <td className="px-6 py-4">{contribution.quantity}</td>
                  <td className="px-6 py-4">
                    {contribution.wasteRequirement.requiredQuantity}
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={contribution.wasteRequirement.image}
                      alt=""
                      className="h-10 w-10"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};