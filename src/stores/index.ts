import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


const theme:boolean = true  // true light false dark

export const useStore = defineStore('counter', {
  state(){
    return {
        theme:""
    }
  },
  actions:{},
  getters:{
    themeString():void{
      return this.theme?"light":"dark"
    }
  }
})
