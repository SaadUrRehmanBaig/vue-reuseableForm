<template>
    <form @submit.prevent="submit">
        <div v-for="field in fields" :key="field.name">
            <div :class="{ valid: !v$.$error && v$.$dirty, error: v$.$error }">
                <label :for="field.name">{{ field.label }}:</label>

                <div v-if="field.type === 'range'">
                    {{ form[field.name] }}
                    <input type="range" :min="field.min || 0" :max="field.max || 100" v-model="form[field.name]" />
                </div>

                <div v-else-if="field.type === 'radio'">
                    <div v-for="(option, index) in field.options" :key="index">
                        <label :for="`${field.name}-${index}`">{{ option }}</label>
                        <input :type="field.type" :id="`${field.name}-${index}`" :name="field.name" :value="option"
                            v-model="form[field.name]" />
                    </div>
                </div>

                <div v-else-if="field.type === 'dropDown'">
                    <select :name="field.name" v-model="form[field.name]">
                        <option v-for="(option, index) in field.options" :key="index" :value="option">{{ option }}</option>
                    </select>
                </div>

                <div v-else>
                    <input :type="field.type" v-model="v$[field.name].$model" />
                </div>
            </div>
            <div v-for="(error, index) in v$[field.name].$errors" :key="index">
                {{ error.$message }}
            </div>
        </div>
        <button type="submit">Submit</button>
    </form>
</template>
  
  
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useStore } from 'vuex';
import { actions } from '@/store/enums/StoreEnum';
import { useVuelidate } from '@vuelidate/core';

export default defineComponent({
    props: {
        fields: {
            type: Array,
            required: true,
        },
        action: {
            type: String,
            required: false
        },
        rules: {
            type: Object,
            required: true
        },
        callBack: {
            type: Function,
            required: false
        }
    },
    setup(props) {
        const store = useStore();

        let form: any = {};
        props.fields.forEach((field: any) => {
            if (field.type === 'multiselect') {
                form[field.name] = [];
            } else {
                form[field.name] = '';
            }
        });

        form = reactive({ ...form });

        const v$ = useVuelidate(props.rules, form);

        const submit = async () => {
            console.log(form);

            if (v$.value.$silentErrors.length > 0) {
                return;
            }
            if (props.callBack) {
                return props.callBack(form)
            }
            await store.dispatch(actions.SIGNUP, form);
        };
        return {
            FormFields: props.fields,
            submit,
            form,
            v$
        };
    }
});
</script>
  