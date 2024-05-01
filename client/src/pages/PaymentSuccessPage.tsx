import Lottie from "lottie-react";
import animationData from '../assets/payment_success.json';
import { Heading } from "../components/Heading";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

export const PaymentSuccessPage = () => {
    const navigate = useNavigate();

    const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate("/");
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Heading text={"Payment Successful"} />
            <div className="h-96 w-96">
                <Lottie
                    animationData={animationData}
                    className="h-full w-full"
                />
            </div>
            <Button text={"Go to Home page"} onClick={onClickHandler} />
        </div>
    );
};
