import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { LogIn } from "./Login";
import { Entry } from "./redirect/Entry";
import { Chat } from "./redirect/Chat";

function App() {

  return ( 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/entry" element={<Entry />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
  )
}
export default App
