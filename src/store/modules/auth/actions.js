import axios from "axios";
import validations from "../../../services/validations";
import {
  AUTH_ACTION,
  LOGIN_ACTION,
  LOGOUT_ACTION,
  SIGNUP_ACTION,
} from "../../storeconstants";
import { SET_USER_TOKEN_DATA_MUTATION } from "../../storeconstants";
export default {
  
  [LOGOUT_ACTION](context) {
    context.commit(SET_USER_TOKEN_DATA_MUTATION, {
      email: null,
      token: null,
      userId: null,
      refreshToken: null,
      expiresIn: null,
    });
  },

  async [LOGIN_ACTION](context, payload) {
    return context.dispatch(AUTH_ACTION, {
      ...payload,
      url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=
AIzaSyAhUzlFdTeEtGgwiXGIau103khbtNbhmXs`
    });
  },

  async [SIGNUP_ACTION](context, payload) {
    return context.dispatch(AUTH_ACTION, {
      ...payload,
      url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
    AIzaSyAhUzlFdTeEtGgwiXGIau103khbtNbhmXs`
    })
  },

  async [AUTH_ACTION](context, payload) {
    let postData = {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true,
    };

    let response = "";
    try {
      response = await axios.post(payload.url, postData);
    } catch (err) {
      let errorMessage = validations.getErrorMessageFromCode(
        err.response.data.error.errors[0].message
      );

      throw errorMessage;
    }
    if (response.status === 200) {
      context.commit(SET_USER_TOKEN_DATA_MUTATION, {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localID,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
      });
    }
  },
};
