import { Heading } from "../components/Heading"
import { ImagesSliderDemo } from "../components/images-sliderComponent"
import { NavbarDemo } from "../components/navbar-component"
import { GetInnovativeProds } from "../components/GetInnovativeProds"
import { GetWasteReq } from "../components/GetWasteReq"

export const HomePage = ()=>{
    return <div>
        <NavbarDemo/>
        <ImagesSliderDemo/>
        <div className="mt-10">
        <Heading text={"Waste Requirements which you can contribute"}/>
        </div>
        <GetWasteReq/>
        <div className="mt-10">
        <Heading text={"Innovative Products that are crafted by Artisans"}/>
        </div>
        <GetInnovativeProds/>
    </div>
}