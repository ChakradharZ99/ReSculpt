import Lottie from 'lottie-react';
import loadingAnimation from '../assets/loading.json';

export const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-white bg-opacity-0">
      <Lottie animationData={loadingAnimation} loop={true} />
    </div>
  );
};