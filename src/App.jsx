import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index"
import { Outlet } from "react-router";

const App = ()=>{
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  
  useEffect(()=>{
    authService.getCurrentUser()
    .then((data)=>{
      if(data){
        dispatch(login({data}));
      }else{
        dispatch(logout({}));
      }
    })
    .finally(()=>{
      setLoading(false);
    })

  }, [])

  return(
    <>
    {loading ? (
      <div className="bg-gray-800 min-h-screen flex justify-center align-middle"><h1 className="text-3xl text-white self-center">Loading...</h1></div>
    ) :(
      <div className="bg-gray-800 ">
        <Header />
          <main className="text-white min-h-[70vh]">
            <Outlet />
          </main>
        <Footer />
      </div>
    ) 
    }
    </>
  )
}
export default App