<script setup lang="ts">
const { footerLinks } = useNavigation()
</script>

<template>
  <UFooter
    :ui="{
      bottom: { wrapper: 'border-t border-gray-200 dark:border-gray-800', container: '!py-6' },
      top: { wrapper: 'border-t border-gray-200 dark:border-gray-800', container: 'py-8 lg:py-12' }
    }"
  >
    <!-- <template #top>
      <UFooterColumns :links="footerLinks">
        <template #right>
          <NewsletterForm />
        </template>
      </UFooterColumns>
    </template> -->

    <template #left>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Copyright © {{ new Date().getFullYear() }} Discite.
      </p>
    </template>

    <template #right>
      <UButton aria-label="Discite on GitHub" to="/" target="_blank" icon="i-simple-icons-github" v-bind="($ui.button.secondary as any)" />
    </template>
  </UFooter>
</template>
