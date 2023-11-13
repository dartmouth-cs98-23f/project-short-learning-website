<script setup>
import { vIntersectionObserver } from '@vueuse/components'
const start = ref(0)
const total = 5 * 4
const contributors = useState('contributors-grid', () => [])
const intersecting = ref(false)
let _contributors
let currentTimeout

function onIntersectionObserver ([{ isIntersecting }]) {
  intersecting.value = isIntersecting
  if (isIntersecting) {
    if (_contributors) {
      contributors.value = _contributors
    }
    startTimer()
  } else {
    stopTimer()
  }
}
// Fetch on client-side
onMounted(async () => {
  if (contributors.value.length) return
  // https://avatars.githubusercontent.com/u/65356625?v=4
  // _contributors = await $fetch('https://api.nuxt.com/contributors').then(data => data.slice(0, total * 10).map(c => c.username))

  /*
      - name: Amittai Siavava
    avatarUrl: https://github.com/siavava.png
    link: https://github.com/siavava
  - name: Bansharee Ireen
    avatarUrl: https://github.com/banshee56.png
    link: https://github.com/banshee56
  - name: Yizhen Zhen
    avatarUrl: https://github.com/zhenyiplusone.png
    link: https://github.com/zhenyiplusone
  - name: Kevin Lin
    avatarUrl: https://github.com/linkevin281.png
    link: https://github.com/linkevin281
  - name: Colton Sankey
    avatarUrl: https://github.com/ColtonSankey.png
    link: https://github.com/ColtonSankey
  - name: Jessie Li
    avatarUrl: https://github.com/jessieli24.png
    link: https://github.com/jessieli24
  */
  _contributors = [
    'banshee56', 'ColtonSankey', 'jessieli24', 'linkevin281', 'siavava', 'zhenyiplusone'
  ]

  Arrays.shuffle(_contributors)
  await loadImages(_contributors.slice(0, total))
  if (!contributors.value.length && intersecting.value) {
    contributors.value = _contributors
  }
})
onBeforeUnmount(stopTimer)

const $contributors = computed(() => contributors.value.length ? contributors.value.slice(start.value, start.value + total) : new Array(total).fill(null))
function startTimer (ms = 5000) {
  currentTimeout = setTimeout(nextContributors, ms)
}
function stopTimer () {
  clearTimeout(currentTimeout)
  currentTimeout = null
}
async function loadImages (usernames) {
  await Promise.all(usernames.map(username => {
    const img = new Image()
    img.src = `https://ipx.nuxt.com/f_auto,s_${window.devicePixelRatio === 2 ? '160x160' : '80x80'}/gh_avatar/${username}`
    return new Promise(resolve => {
      img.onload = resolve
      img.onerror = resolve
    })
  }))
}
async function nextContributors () {
  const newStart = (start.value + total >= contributors.value.length ? 0 : start.value + total)
  start.value = newStart
  contributors.value.sort(() => (Math.random() > .7) ? 1 : -1)
  startTimer()
}
</script>

<template>
  <div
    v-intersection-observer="onIntersectionObserver"
    class="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-10 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-8"
    @mouseenter="stopTimer()"
    @mouseleave="startTimer(2500)"
  >
    <div
      v-for="(username, index) in $contributors"
      :key="index"
      class="pt-[100%] relative"
    >
      <Transition
        name="avatar"
        mode="out-in"
        appear
      >
        <a
          v-if="username"
          :key="username"
          :href="`https://nuxters.nuxt.com/${username}`"
          target="_blank"
          class="absolute inset-0 block transition-all"
          :style="{
            'transition-delay': `${(index % 8 + Math.floor(index / 8)) * 20}ms`
          }"
        >
          <UTooltip :text="username">
            <img
              :src="`https://ipx.nuxt.com/f_auto,s_80x80/gh_avatar/${username}`"
              :srcset="`https://ipx.nuxt.com/f_auto,s_160x160/gh_avatar/${username} 2x`"
              :alt="username"
              loading="lazy"
              :title="username"
              class="rounded-xl w-full h-full transition lg:hover:scale-125"
            >
          </UTooltip>
        </a>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.avatar-enter-active,
.avatar-leave-active {
  transition: all 0.4s ease;
}

.avatar-enter-from,
.avatar-leave-to {
  opacity: 0.1;
  transform: scale(0.5);
}
</style>
