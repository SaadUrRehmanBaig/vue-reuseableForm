<script lang="ts">
import { actions } from '@/store/enums/StoreEnum';
import { computed, defineComponent, watch } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
    setup() {
        const store = useStore();
        const router = useRouter()
        const logout = ()=>{
            store.dispatch(actions.LOGOUT);
        }
        const logedIn = computed(()=>{return store.state.AuthModule.isAuthenticated})

        watch(logedIn, (newValue) => {
                            if (!newValue) {
                                router.push('/'); // Replace '/login' with your actual login route path
                            }},{ immediate: true })
        return{
            logout
        }
    },
})
</script>

<template>
    <button @click="logout">Logout</button>
</template>
