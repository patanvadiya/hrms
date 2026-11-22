<script setup lang="ts">
import { ref } from 'vue'
import AuthLayout from './AuthLayout.vue'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmation = ref('')
const error = ref('')
const submitted = ref(false)

function signUp() {
  if (!name.value) {
    error.value = 'Enter your name.'
    return
  }
  if (password.value !== confirmation.value) {
    error.value = 'The passwords do not match.'
    return
  }
  name.value = ''
  email.value = ''
  password.value = ''
  confirmation.value = ''
  submitted.value = true
}
</script>

<template>
  <AuthLayout title="Sign up" description="Try the registration form with fictional details.">
    <form v-if="!submitted" class="auth-form" @submit.prevent="signUp" @input="error = ''">
      <label for="signup-name">Full name</label>
      <input id="signup-name" v-model.trim="name" name="name" autocomplete="name" maxlength="100" required/>

      <label for="signup-email">Email address</label>
      <input id="signup-email" v-model.trim="email" name="email" type="email" autocomplete="email" required/>

      <label for="signup-password">Password</label>
      <input id="signup-password" v-model="password" name="password" type="password" autocomplete="new-password" minlength="8" aria-describedby="signup-password-hint" required/>
      <small id="signup-password-hint" class="password-hint">At least 8 characters</small>

      <label for="signup-confirmation">Confirm password</label>
      <input id="signup-confirmation" v-model="confirmation" name="confirm-password" type="password" autocomplete="new-password" required/>

      <p v-if="error" class="auth-error" role="alert">{{ error }}</p>
      <button class="primary auth-submit" type="submit">Sign up</button>
    </form>
    <div v-else class="signup-success">
      <p role="status">Demo registration complete. Continue to the HR workspace.</p>
      <a class="primary auth-submit" href="#overview">Open demo workspace</a>
    </div>
    <p class="auth-switch">Already have an account? <a href="#sign-in">Sign in</a></p>
  </AuthLayout>
</template>

<style scoped>
.password-hint { margin: -9px 0 6px; }
.signup-success > a { margin-top: 14px; border-radius: 8px; padding: 8px 14px; }
</style>
