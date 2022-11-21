import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Error from "../components/Error";
import { inscriptionUtilisateur } from "../features/user/userActions";

const InscriptionScreen = () => {
  //hook des erreurs
  const [customError, setCustomError] = useState(null);

  //useSelector = evite de taper (state: rootState) chaque fois
  //on appel les 4 elements du cycle de vie (etat du fomrulaire a la soumission)
  //on peu lire l'etat du reducer et dispatch (distribuer) les action au composant
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  );

  
  //distrubuer les actions
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  //La redirection si ca marche de react-router-dom
  const navigate = useNavigate();


  //Apres le componentDidMount
  useEffect(() => {
    // redirect authenticated user to profile screen
    if (userInfo) navigate('/profile')
    // redirect user to login page if registration was successful
    if (success) navigate('/connexion')
  }, [navigate, userInfo, success])

  const submitForm = (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Les mot de passe sont différent !");
      setCustomError("Les mot de passe ne sont pas identiques ! ");
      return;
    }
    //on transforme email en minuscule
    data.email = data.email.toLowerCase();
    //appel de l'action (fonction) du fichier userActions.js
    dispatch(inscriptionUtilisateur(data));
    console.log(data);
  };

  return (
    <div className="container w-50 bg-dark p-3 mt-5">
      {success ? (
        <div className="alert alert-success p-5">Vous êtes inscrit !
        <Link to="/connexion" className='btn btn-warning float-end'>Se connecter</Link>
        </div>
      ) : (
        <div>
          <h3 className="text-center text-warning">INSCRIPTION</h3>
          <form onSubmit={handleSubmit(submitForm)}>
            {/*Afficher des erreurs depuis le composant Error*/}
            {error && <Error>{error}</Error>}
            {customError && <Error>{customError}</Error>}
            <div className="mt-3">
              <label htmlFor="email">Nom d'utilisateurs</label>
              <input
                type="text"
                className="form-control"
                {...register("firstname")}
                required
              />
            </div>

            <div className="mt-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                {...register("email")}
                required
              />
            </div>

            <div className="mt-3">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                className="form-control"
                {...register("password")}
                required
              />
            </div>

            <div className="mt-3">
              <label htmlFor="password">Confirmer le mot de passe</label>
              <input
                type="password"
                className="form-control"
                {...register("confirmPassword")}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-secondary mt-3"
              disabled={loading}
            >
              Inscription
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default InscriptionScreen;
