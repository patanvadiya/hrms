<script setup lang="ts">
import { ArrowLeft, Users } from '@lucide/vue'

defineProps<{ title: string; description: string }>()
</script>

<template>
  <main class="auth-page" aria-labelledby="auth-title">
    <div class="auth-pane">
      <header class="auth-brand">
        <span class="brand-mark"><Users :size="20" aria-hidden="true"/></span>
        <span>People Studio</span>
      </header>

      <div class="auth-content">
        <h1 id="auth-title">{{ title }}</h1>
        <p>{{ description }}</p>
        <slot/>
      </div>

      <a class="auth-back" href="#overview"><ArrowLeft :size="16" aria-hidden="true"/> Back to HR Dashboard</a>
    </div>
    <div class="auth-art" aria-hidden="true"></div>
  </main>
</template>

<style>
.auth-page {
  display: grid;
  grid-template-columns: minmax(370px, 39%) minmax(0, 1fr);
  min-height: 100dvh;
  background: #fff;
  --auth-green: #17643a;
}

.auth-pane {
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 32px;
  padding: clamp(24px, 4vw, 62px);
}

.auth-brand,
.auth-back {
  display: flex;
  align-items: center;
  gap: 11px;
}

.auth-brand { font-size: 17px; font-weight: 750; }
.auth-content { align-self: center; width: 100%; max-width: 390px; margin-inline: auto; }
.auth-content h1 { font-size: clamp(34px, 4vw, 50px); }
.auth-content p { margin-top: 10px; font-size: 14px; }
.auth-form { gap: 8px; margin-top: 28px; }
.auth-form > input { min-height: 46px; margin-bottom: 8px; }
.auth-content a:not(.primary), .auth-back { color: var(--auth-green); font-weight: 650; }
.auth-content a:hover, .auth-back:hover { text-decoration: underline; }
.auth-content .auth-submit { justify-content: center; min-height: 46px; background: var(--auth-green); border-color: var(--auth-green); }
.auth-content .auth-submit:hover { background: #11512e; }
.auth-content .auth-switch { margin-top: 22px; }
.auth-content .auth-error { margin: 0 0 4px; color: #942e3d; font-size: 13px; }
.auth-back { justify-self: start; font-size: 13px; }
.auth-art {
  min-width: 0;
  margin: 16px 16px 16px 0;
  border-radius: 20px;
  background: #dfebe1 url('./login-workspace.jpg') center 48% / cover no-repeat;
}

@media (max-width: 780px) {
  .auth-page { grid-template-columns: minmax(0, 1fr); }
  .auth-pane { padding: 24px clamp(20px, 6vw, 56px); }
  .auth-art { display: none; }
}
</style>
