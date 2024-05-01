import { useState, useEffect } from "react";
import axios from "axios";
import { BackgroundGradientDemo } from "../components/background-gradientDemo";
import { TypewriterEffectSmoothDemo } from "../components/typewriter-effectComponent";
import { SearchBar } from "../components/SearchBar";
import { Loading } from "../components/Loading";

interface InnovativeProd {
  productId: number;
  image: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
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

export const DisplayInnovativeProdsPage = () => {
  const [innovativeProd, setInnovativeProd] = useState<InnovativeProd[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [displayedProds, setDisplayedProds] = useState<InnovativeProd[]>([]);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchInnovativeProds = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/getAllInnovativeProds`);
        setInnovativeProd(response.data);
        setDisplayedProds(response.data); // Set displayed products to all fetched products
        setLoading(false);
      } catch (error) {
        console.error("Error fetching innovative products:", error);
        setLoading(false);
      }
    };

    fetchInnovativeProds();
  }, []);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter the displayed products based on the search query
    const filtered = getFilteredData(query, innovativeProd);
    setDisplayedProds(filtered);
  };

  const getFilteredData = (query: string, items: InnovativeProd[]) => {
    if (!query) {
      return items; // Return all items if the search query is empty
    }

    return items.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
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
            {displayedProds.map((product) => (
              <div key={product.productId} className="mr-4">
                <BackgroundGradientDemo
                  image={product.image}
                  name={product.name}
                  description={product.description}
                  link={`/product/${product.productId}`}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
