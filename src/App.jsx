import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index"
import { Outlet } from "react-router";
import { fetchPosts } from "./store/postSlice";

const App = ()=>{
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const primaryBg = useSelector((state) => state.theme.primaryBg);
  const primaryColor = useSelector((state) => state.theme.primaryColor);
  const secondaryColor = useSelector((state) => state.theme.secondaryColor);
  const secondaryBg = useSelector((state) => state.theme.secondaryBg);
  const textMuted = useSelector((state) => state.theme.textMuted);

  
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
    });

    if(authStatus) dispatch(fetchPosts());
  }, [authStatus])

  return(
    <>
    {loading ? (
      <div className="bg-gray-800 min-h-screen flex justify-center align-middle"><h1 className="text-3xl text-white self-center">Loading...</h1></div>
    ) :(
      <div className={` ${secondaryBg} `}>
        <div className={`${primaryColor} ${primaryBg}`}>
          <Header />
        </div>
          <main className={`min-h-[70vh] ${secondaryColor}`}>
              <Outlet />
          </main>
        <Footer primaryBg={primaryBg} textMuted={textMuted} primaryColor={primaryColor} secondaryBg={secondaryBg} secondaryColor={secondaryColor} />
      </div>
    )}
    </>
  )
}
export default App