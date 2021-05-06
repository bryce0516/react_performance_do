import * as moment from "moment";
import { sha256 } from "js-sha256";
import api from "../api/axios.utils";

export default class Auth {
  constructor() {
    this.isAuthenticated = this._isAuthenticated.bind(this);
    this.getProfile = this._getProfile.bind(this);
    this.signIn = this._signIn.bind(this);
    this.signOut = this._clearLocalStorage.bind(this);
    this.getToken = this._getToken.bind(this);
  }

  _getToken() {
    return localStorage.getItem("id_token");
  }

  async _signIn(id, password) {
    let result = await api.post("/monthly/cms/MONTHLY_CMS_API_GET_TOKEN", {
      admin_id: id,
      admin_pass: sha256(password),
    });
    if (result.status === 200) {
      const {
        token,
        admin_nm,
        admin_id,
        admin_type,
        kitchen_no,
        kitchen_nm,
        kitchen_id,
        kitchen_type,
      } = result.data;
      this._setLocalStorage(token, [1, "d"], {
        admin_nm,
        admin_id,
        admin_type,
        kitchen_no,
        kitchen_nm,
        kitchen_id,
        kitchen_type,
      });
      return result.data;
    } else if (result.status === 403) {
      console.log("sign in is 403", result.data);
      return { status: result.status, ...result.data };
    } else {
      console.log(result);
      return { status: result.status, ...result.data };
    }
  }

  _setLocalStorage(token, expiresIn, userObj) {
    const expiresAt = moment().add(...expiresIn);
    localStorage.setItem("id_token", token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem("user_obj", JSON.stringify(userObj));
  }

  async _clearLocalStorage() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.remote("user_obj");
  }

  _getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  _getProfile() {
    return this.isAuthenticated()
      ? JSON.parse(localStorage.getItem("user_obj"))
      : { admin: null, admin_type: null };
  }

  _isAuthenticated() {
    return moment().isBefore(this._getExpiration());
  }
}
