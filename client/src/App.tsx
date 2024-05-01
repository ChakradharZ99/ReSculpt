import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { ForgotPassword } from "./pages/ForgotPassword"
import { ResetPassword } from "./pages/ResetPassword"
import { HomePage } from "./pages/HomePage"
import { UploadInnovativeProdsPage } from "./pages/UploadInnovativeProdsPage"
import { UploadWasteReqPage } from "./pages/UploadWasteReqPage"
import { InnovativeProdPage } from "./pages/InnovativeProdPage"
import { WasteReqPage } from "./pages/WasteReqPage"
import './App.css'
import { ContributePage } from "./pages/ContributePage"
import {ProfilePage} from "./pages/ProfilePage"
import { DisplayWasteReqPage } from "./pages/DisplayWasteReqPage"
import { DisplayInnovativeProdsPage } from "./pages/DisplayInnovativeProdsPage"
import { SatisfiedRequirements } from "./pages/SatisfiedRequirementsPage"
import { UserWasteReqPage } from "./pages/UserWasteReqPage"
import { UserInnovativeProdsPage } from "./pages/UserInnovativeProdsPage"
import { UserContributionsPage } from "./pages/UserContributionsPage"
import { PaymentSuccessPage } from "./pages/PaymentSuccessPage"
import { PaymentFailurePage } from "./pages/PaymentFailurePage"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/forgotPassword" element={<ForgotPassword/>}/>
        <Route path="/resetPassword/:token" element={<ResetPassword/>}/>
        

        <Route path="/uploadInnovativeProd" element={<UploadInnovativeProdsPage/>}/>
        <Route path="/uploadWasteReq" element={<UploadWasteReqPage/>}/>

        <Route path="/product/:id" element={<InnovativeProdPage/>}/>
        <Route path="/requirement/:id" element={<WasteReqPage/>}/>

        <Route path="/requirement/:id/contribution/:id" element={<ContributePage/>}/>

        <Route path="/displayWasteReq" element={<DisplayWasteReqPage/>}/>
        <Route path="/displayInnovativeProds" element={<DisplayInnovativeProdsPage/>}/>

        <Route path="/profile/userData" element={<ProfilePage/>}/>
        <Route path="/profile/satisfiedReq" element={<SatisfiedRequirements/>}/>
        <Route path="/profile/uploadedReq" element={<UserWasteReqPage/>}/>
        <Route path="/profile/uploadedInnovations" element={<UserInnovativeProdsPage/>}/>
        <Route path="/profile/contributions" element={<UserContributionsPage/>}/>

        <Route path="/paymentSuccessful" element={<PaymentSuccessPage/>}/>
        <Route path="/paymentFailed" element={<PaymentFailurePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
