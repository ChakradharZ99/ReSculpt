import { useState, useEffect } from "react";
import axios from "axios";
import { BackgroundGradientDemo } from "../components/background-gradientDemo";
import { TypewriterEffectSmoothDemo } from "../components/typewriter-effectComponent";
import { SearchBar } from "../components/SearchBar";
import { Loading } from "../components/Loading";

interface WasteRequirement {
  requirementId: number;
  image: string;
  name: string;
  description: string;
  price: number;
  initialQuantity: number;
  requiredQuantity: number;
  color: string | null;
  material: string | null;
  weight: number | null;
  length: number | null;
  width: number | null;
  height: number | null;
  uploaderId: number;
  createdAt: string;
  updatedAt: string;
}

export const DisplayWasteReqPage = () => {
  const [wasteRequirements, setWasteRequirements] = useState<WasteRequirement[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [displayedRequirements, setDisplayedRequirements] = useState<WasteRequirement[]>([]);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchWasteRequirements = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/getWasteRequirements`);
        setWasteRequirements(response.data);
        setDisplayedRequirements(response.data); // Set displayed requirements to all fetched requirements
        setLoading(false);
      } catch (error) {
        console.error("Error fetching waste requirements:", error);
        setLoading(false);
      }
    };

    fetchWasteRequirements();
  }, []);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter the displayed requirements based on the search query
    const filtered = getFilteredData(query, wasteRequirements);
    setDisplayedRequirements(filtered);
  };

  const getFilteredData = (query: string, items: WasteRequirement[]) => {
    if (!query) {
      return items; // Return all items if the search query is empty
    }

    return items.filter((wasteRequirement) =>
      wasteRequirement.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <div>
      <TypewriterEffectSmoothDemo />
      <SearchBar searchQuery={searchQuery} handleSearchInputChange={handleSearchInputChange} />
      {loading ? (
        <Loading/>
      ) : (
        <div className="w-screen overflow-x-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {displayedRequirements.map((requirement) => (
              <div key={requirement.requirementId}>
                <BackgroundGradientDemo
                  image={requirement.image}
                  name={requirement.name}
                  description={requirement.description}
                  link={`/requirement/${requirement.requirementId}`}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};