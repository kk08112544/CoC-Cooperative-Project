import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
export const useLoginUserStore = defineStore("loginuser", {
  state: () => ({
    userid: useStorage("userid", ""),
    name: useStorage("name", ""),
    lastname: useStorage("lastname",""),
    accessToken: useStorage("accessToken", ""),
    roleId: useStorage("roleId", ""),
  }),
  getters: {
    getUserid: (state) => {
      return state.userid;
    },
    getName: (state) => {
      return state.name;
    },
    getLastname: (state) => {
        return state.lastname;
    },
    getAccessToken: (state) => {
      return state.accessToken;
    },
    getRoleId: (state) => {
      return state.roleId;
    },
  },
  actions: {
    clearStorage() {
      this.userid = "";
      this.name = "";
      this.lastname = "";
      this.accessToken = "";
      this.roleId = "";
    },
  },
});