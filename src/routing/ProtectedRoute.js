import {useSelector} from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    //utilisateur connectez
    const {userInfo} = useSelector((state) => state.user);

    //Fenetre non autorisé si aucun user trouver dans le store redux
    if(!userInfo){
        return(
            <div className="alert alert-danger">
                <h2 className="text-center text-warning">Vous n'etes pas autorisé a consulté cette page :(</h2>
                <div className="text-center">
                    <Link to="/connexion" className="btn btn-warning">CONNEXION</Link>
                </div>
                
            </div>
        )
    }

    return <Outlet/>
}

export default ProtectedRoute;