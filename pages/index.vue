<script setup lang="ts">
import { joinURL } from 'ufo'
const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())

const site = useSiteConfig()
const title = 'Discite: Shortform Learning'
const description = 'Nuxt is an open source framework that makes web development intuitive and powerful. Create performant and production-grade full-stack web apps and websites with confidence.'
useSeoMeta({
  title,
  ogTitle: title,
  description: description,
  ogDescription: description,
  ogImage: joinURL(site.url, '/new-social.jpg'),
  twitterImage: joinURL(site.url, '/new-social.jpg')
})
</script>

<template>
  <div v-if="page">
    <ULandingHero :ui="{ base: 'relative z-[1]' }" class="dark:bg-gradient-to-b from-gray-950 to-gray-900">
      <template #top>
        <HomeHeroBackground class="absolute -top-[--header-height] inset-x-0 w-full hidden lg:block" />
      </template>

      <template #headline>
        <UButton v-bind="page.hero.cta" />
      </template>

      <template #title>
        The Optimized<br><span class="text-primary block lg:inline-block">Shortform Learning Platform</span>
      </template>

      <template #description>
        Discite is a platform that optimizes learning for the modern attention span. <br>
        We provide shortform content targeted at specific subtopics,<br>
        with smart sequencing of clips into learning paths that guide you through an important topic. 
      </template>
    </ULandingHero>

    <!-- eslint-disable vue/no-deprecated-slot-attribute -->
    <ULandingSection
      v-for="(section, index) of page.sections"
      :key="index"
      :slot="section.slot"
      :class="section.class"
      :align="section.align"
      :links="section.links"
    >
      <template #title>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="section?.title" />
      </template>

      <template v-if="section.description" #description>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="section.description" />
      </template>

      <template #features>
        <HomeSectionFeatures :features="section.features" />
      </template>

      <template #integrations>
        <HomeSectionIntegrations :integrations="section.integrations" />
      </template>

      <template #contributors>
        <HomeSectionContributors />
      </template>

      <template #testimonials>
        <HomeSectionTestimonials :testimonials="section.testimonials" />
      </template>

      <template #code>
        <MDC
          v-if="section.code"
          :value="section.code"
          tag="pre"
          class="prose prose-primary dark:prose-invert max-w-none"
          :parser-options="{
            highlight: {
              theme: {
                light: 'material-theme-lighter',
                default: 'material-theme',
                dark: 'material-theme-palenight'
              }
            }
          }"
        />
      </template>
    </ULandingSection>
  </div>
</template>
