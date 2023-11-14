<script setup lang="ts">
import { joinURL } from 'ufo'
const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())

const site = useSiteConfig()
const title = 'Discite: Shortform Learning'
const description = 'Discite is a platform for short-form content that organizes content into learning paths for intuitive learning.'
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
        <!-- The Intuitive<br><span class="text-primary block lg:inline-block">Shortform Learning Platform</span> -->
        A Learning Platform<br> <span class="text-primary block lg:inline-block">for the Modern Attention Span</span>
      </template>

      <template #description>
        Discite optimizes learning for the modern attention span. <br> <br>
        We provide shortform content targeted at specific subtopics,<br>
        with smart sequencing ofcontent into learning paths that guide you through a topic. 
      </template>

      <template #links>
        <!-- <UButton to="/docs/getting-started/installation" icon="i-ph-rocket-launch-duotone" size="xl">
          Get Started
        </UButton> -->
        <UButton size="xl" color="white" icon="i-ph-arrow-up-right" to="/blog/23f-technigala">
          Why Discite?
        </UButton>
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
