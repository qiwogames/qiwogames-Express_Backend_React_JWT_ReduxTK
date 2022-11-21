import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { connexionUtilisateur } from "../features/user/userActions";
import Error from "../components/Error";

const ConnexionScreen = () => {
  //etat
  const { loading, userInfo, error, success } = useSelector((state) => state.user);
  //distribuer les actions
  const dispatch = useDispatch();
  //les action du formulaire
  const { register, handleSubmit } = useForm();
  //la redirection
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo)
      navigate('/profile')
    }
  }, [navigate, userInfo])

  const submitForm = (data) => {
    //Appel de la fonction de userAction.js
    dispatch(connexionUtilisateur(data));
  };

  return (
    <div className="container w-50 bg-dark p-3 mt-5">
      {success ? (
        <div className='alert alert-success'>Vous etes connectez !</div>
      ) : (
        <div>
          <h3 className="text-center text-warning">CONNEXION</h3>
          {error && <Error>{error}</Error>}
          <form onSubmit={handleSubmit(submitForm)}>
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
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                {...register("password")}
                required
              />
            </div>
            <button type="submit" className="btn btn-danger mt-3" disabled={loading}>
              Connexion
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ConnexionScreen;
