import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

interface WasteReqCardsProps {
  image: string;
  linkTo: string;
  name: string;
  description: string;
}

export function ProductCard({ linkTo, image, name, description }: WasteReqCardsProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Function to truncate the description text
  const truncateDescription = ({ text, maxLength }: { text: string, maxLength: number }) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  return (
      <Link to={linkTo}>
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
        >
          <img src={image} alt="Waste Request" className="w-96 h-72 object-cover" />
          <div className="p-4">
            <h5 className="text-lg font-semibold mb-2">{name}</h5>
            <p className="text-gray-700 text-sm">{truncateDescription({ text: description, maxLength: 100 })}</p>
          </div>
        </motion.div>
      </Link>
  );
}