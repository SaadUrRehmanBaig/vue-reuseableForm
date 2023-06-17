<template>
  <div>
    <ReusableForm :fields="fields" :action="action" :rules="rules" :callBack="callBack" />
  </div>
</template>
  
<script >
import { actions } from '@/store/enums/StoreEnum';
import { defineComponent } from 'vue';
import ReuseableFormVue from './ReuseableForm.vue';
import { email, helpers, maxLength, minLength, required } from '@vuelidate/validators'
export default defineComponent({
  components: { ReusableForm: ReuseableFormVue },
  data() {
    return {
      //these feilds will be rendered
      fields: [
        { name: 'name', label: 'Name', type: 'text', },
        { name: 'email', label: 'Email', type: 'email', },
        { name: 'password', label: 'Password', type: 'password', },
        { name: 'confirmPassword', label: 'Confirm Password', type: 'password', },
        { name: 'age', label: 'Age', type: 'range', min:10, max:100 },
        { name: 'gender', label: 'Gender', type: 'radio', options: ['Male', 'Female', 'Other'] },
        { name: 'genderdropDown', label: 'Gender dropDown', type: 'dropDown', options: ['Male', 'Female', 'Other'] },
        { name: 'birthdate', label: 'Birthdate', type: 'date' }
      ],

      // this actions will be triggered on the store
      action: actions.SIGNUP,

      // they can have custom as well as predefined sets of rules
      // make sure to only include those keys which are reffred in feilds section otherwise 
      // the form will not work
      rules: {
        name: {
          required: required,
          minLength: minLength(3),
          maxLength: maxLength(10),
        },
        email: {
          required: required,
          email: email,
        },
        password: {
          required: required,
        },
        confirmPassword: {
          required: required,
          custom: helpers.withMessage('passwords do not match', (value,formData)=>{
            if (value === formData.password){
              return true
            }
            return
          })
        },
        age:{},
        gender:{},
        genderdropDown:{},
        birthdate:{
          greaterthan : helpers.withMessage('your birthdate should be greater than 26th of april 2000', (value)=>{
            const minVal = new Date('26 april 2000');
            const selectedVal = new Date(value);
            if(selectedVal>minVal){
              return true
            } else{
              return false
            }
              
          })
        }
      },

      // perform your callback here logic here
      // if you give callback then actions will not be triggered
      callBack: function (formData) {
        console.log(formData)
      }

    };
  },

});
</script>
  