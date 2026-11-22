<script setup lang="ts">
import { ref } from 'vue'
import AuthLayout from './AuthLayout.vue'

const demoEmail = 'hr@example.com'
const demoPassword = 'people-demo'
const rememberKey = 'people-studio-remember-demo-email'
const remember = ref(false)
try {
  remember.value = localStorage.getItem(rememberKey) === 'true'
} catch {
  // The demo also works when browser storage is disabled.
}
const email = ref(remember.value ? demoEmail : '')
const password = ref('')
const error = ref('')

function fillDemo() {
  email.value = demoEmail
  password.value = demoPassword
  error.value = ''
}

function login() {
  if (email.value.trim().toLowerCase() !== demoEmail || password.value !== demoPassword) {
    error.value = 'Use the demo credentials to sign in.'
    return
  }
  try {
    if (remember.value) localStorage.setItem(rememberKey, 'true')
    else localStorage.removeItem(rememberKey)
  } catch {
    // Remembering the demo email is optional.
  }
  location.hash = '#overview'
}
</script>

<template>
  <AuthLayout title="Sign in" description="Open your HR demo workspace.">
    <form class="auth-form" @submit.prevent="login" @input="error = ''">
      <label for="login-email">Email address</label>
      <input id="login-email" v-model="email" type="email" name="email" autocomplete="username" required/>

      <label for="login-password">Password</label>
      <input id="login-password" v-model="password" type="password" name="password" autocomplete="current-password" required/>

      <div class="login-options">
        <label class="login-remember"><input v-model="remember" type="checkbox"/> Remember email</label>
        <a href="#forgot-password">Forgot password?</a>
      </div>
      <p v-if="error" class="auth-error" role="alert">{{ error }}</p>
      <button class="primary auth-submit" type="submit">Log in</button>
      <button class="login-demo" type="button" @click="fillDemo">Use demo credentials</button>
    </form>
    <p class="auth-switch">Need an account? <a href="#sign-up">Register</a></p>
  </AuthLayout>
</template>

<style scoped>
.login-options { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin: 2px 0 8px; flex-wrap: wrap; font-size: 13px; }
.login-options .login-remember { display: flex; align-items: center; gap: 7px; font-weight: 500; }
.login-remember input { margin: 0; accent-color: var(--auth-green); }
.login-demo { min-height: 42px; color: var(--auth-green); font-weight: 650; }
.login-demo:hover { background: #eff7f1; }
</style>
