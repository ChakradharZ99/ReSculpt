import Lottie from 'lottie-react';
import noDataAnimation from '../assets/no_data.json';
import { Heading } from './Heading';

interface NoDataParam {
    text: string;
}

export const NoData = ({text}: NoDataParam) => {
  return (
    <>
    <div className='flex justify-center items-center'>
            <Heading text={text}/>
        </div>
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-white bg-opacity-0">
        
      <Lottie animationData={noDataAnimation} loop={true} />
    </div>
    </>
  );
};