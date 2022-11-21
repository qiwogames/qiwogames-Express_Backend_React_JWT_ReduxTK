//creation de la tranche
import {createSlice} from '@reduxjs/toolkit';

//import des actions
import { inscriptionUtilisateur, connexionUtilisateur, getDetailsUtilisateurs } from './userActions';

//les tokens
//init des token du localstorage si ils existent
const userToken = localStorage.getItem('userToken') ? localStorage.getItem('userToken') : null;

//init de valeurs
const initialState = {
    loading: false,
    userInfo:null,
    userToken,
    error: null,
    success: false
}

//Les fonctions de la tranches
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        //Deconnexion
        deconnexion: (state) => {
            localStorage.removeItem('userToken') //Supprime le token de localstorage du navigateur
            state.loading = false
            state.userInfo = null
            state.userToken = null
            state.error = null
        }
    },
    extraReducers:{
        //Details utilisateur connecter
        [getDetailsUtilisateurs.pending]: (state) => {
            state.loading = true
        },
        [getDetailsUtilisateurs.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.userInfo = payload
        },
        [getDetailsUtilisateurs.rejected]: (state, {payload}) => {
            state.loading = false
        },


        //Connexion cycle de vie 3 elements
        [connexionUtilisateur.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [connexionUtilisateur.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.userInfo = payload
            state.userToken = payload.userToken
        },
        //en cas d'echec
        [connexionUtilisateur.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
        },
        //inscrire un utilisateur
        //les 3 etapes dus cycle de vie (attente = pending, remplis = fulfilled, erreur = rejected)
        [inscriptionUtilisateur.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        //quand ce rempli et ca match
        [inscriptionUtilisateur.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.success = true //ici ca marche
        },
        //en cas d'erreur
        [inscriptionUtilisateur.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
        }
    }
});

export const {deconnexion} = userSlice.actions;

export default userSlice.reducer