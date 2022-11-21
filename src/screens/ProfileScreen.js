
import { useSelector } from "react-redux";

const ProfileScreen = () => {

    const {userInfo} = useSelector((state) => state.user)

    return (
        <div className='container'>
            <div className="mt-3">
                <figure>
                    Email : {userInfo?.email}
                </figure>
                <div className='alert alert-success p-3'>
                    Bienvenue <strong>{userInfo?.firstname}</strong>, vous êtes connectez !
                </div>
            </div>
        </div>
    )
  }
  
  export default ProfileScreen;