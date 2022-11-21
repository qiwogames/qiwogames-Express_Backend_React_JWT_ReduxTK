import axios from "axios";
//ceci accepte 3 paramètres string = type action + fonction de rappel (callback) + des options
//3 elements du cycle de vie = en attente(pending) + tous remplis (fulfilled) et eereur(rejected)
//ses elements s'utilise dans extraReducer
import { createAsyncThunk } from "@reduxjs/toolkit";

/**********************CONNEXION*****************/
export const connexionUtilisateur = createAsyncThunk(
  //url front
  "/connexion",
  async ({ email, password }, { rejectedValue }) => {
    try {
      //entete de la requètes
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const {data} = await axios.post("http://localhost:5000/connexion",{
        email, password
      },config)

      //On stock localement des données dans le cache localstorage du navigateur
      localStorage.setItem('userToken', data.userToken);
      //on retourne les données
      return data;

    } catch (error) {
        if (error.response && error.response.data.message) {
            return rejectedValue(error.response.data.message);
          } else {
            return rejectedValue(error.message);
          }
    }
  }
);
/***********************************************/

export const inscriptionUtilisateur = createAsyncThunk(
  "/inscription",
  async ({ firstname, email, password }, { rejectedValue }) => {
    try {
      //entete de la requètes
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      //la methode post pour URL du backend + data + type de données dans entete
      await axios.post(
        "http://localhost:5000/inscription",
        { firstname, email, password },
        config
      );
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectedValue(error.response.data.message);
      } else {
        return rejectedValue(error.message);
      }
    }
  }
);

//details utilisateurs
export const getDetailsUtilisateurs = createAsyncThunk(
  '/profile',
  async (arg, {getState, rejectedValue}) => {
    try{
      //objet User
      const {user} = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      }

      const {data} = await axios.get('http://127.0.0.1:5000/profile', config);

      return data;

    }catch(error){
      if (error.response && error.response.data.message) {
        return rejectedValue(error.response.data.message);
      } else {
        return rejectedValue(error.message);
      }
    }
  }
)
