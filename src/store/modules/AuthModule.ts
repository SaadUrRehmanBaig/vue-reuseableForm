import {Module, VuexModule, Mutation, Action,} from 'vuex-module-decorators';
import {actions, mutations} from '../enums/StoreEnum'
import ApiService from '@/core/Services/ApiService';
import { AxiosRequestConfig } from 'axios';


interface UserAuthInfo {
  message: string;
  isAuthenticated: boolean;
}

@Module
export default class AuthModule extends VuexModule implements UserAuthInfo{
    isAuthenticated=true;
    message= ''


    @Action
    [actions.LOGIN](credentials:AxiosRequestConfig){
        ApiService.post('user/login',credentials).then(()=>{
          this.context.commit('setIsAuth',true)
        }).catch((error)=>{
          console.log(error)
          this.context.commit('setIsAuth',false)
        })
    }

    @Action
    [actions.LOGOUT](){
      ApiService.post('user/logout',{}).then(()=>{
        this.context.commit(mutations.SET_AUTH,false)
      }).catch((error)=>{
        console.log(error)
        this.context.commit(mutations.SET_AUTH,true)
      })
    }

    @Action
    [actions.SIGNUP](credentials:AxiosRequestConfig){
      console.log(credentials)
      // ApiService.post('user/signUp',credentials).then((res)=>{
      //   this.message = res.data
      // })
    }
    @Mutation
    [mutations.SET_AUTH](isUserAuth:boolean){
      this.isAuthenticated=isUserAuth
    }

    get isUserAuthenticated():boolean {
        return this.isAuthenticated
    }

    get signUpMessage(): string {
      return this.message
    }

}