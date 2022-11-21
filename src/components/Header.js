import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDetailsUtilisateurs } from "../features/user/userActions";
import { deconnexion } from '../features/user/userSlice';

const Header = () => {
  //etat de utilisateur = connecter ou non
  const { userInfo, userToken } = useSelector((state) => state.user);
  //ditribuer les actions
  const dispatch = useDispatch();

  //Apres componentDidMount()
  useEffect(() => {
    if (userToken) {
      dispatch(getDetailsUtilisateurs());
    }
  }, [userToken, dispatch]);

  return (
    <header>
      <div className="container">
        <div className="alert alert-danger w-100 mt-3">
          {userInfo
            ? `Vous etes connectez en tant que : ${userInfo.email}`
            : "Merci de vous connectez"}
        </div>
        <div>
          {userInfo ? (
            <div>
              <button className="btn btn-danger" onClick={() => dispatch(deconnexion())}>DECONNEXION</button>
            </div>
          ) : (
            <div>
              <Link to="/connexion" className="btn btn-success">CONNEXION</Link>
            </div>
          )}
        </div>
      </div>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mt-3">
          <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  ACCUEIL
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/connexion">
                  CONNEXION
                </Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0 float-end">
              <Link className="btn btn-warning mx-3" to="/inscription">
                INSCRIPTION
              </Link>
              <Link className="btn btn-info" to="/profile">
                PROFILE
              </Link>
            </form>
          </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
