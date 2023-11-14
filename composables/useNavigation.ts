import { createSharedComposable } from '@vueuse/core'

const _useNavigation = () => {
  const route = useRoute()

  const headerLinks = computed(() => [{
    label: 'Docs',
    icon: 'i-ph-book-bookmark-duotone',
    to: '/docs',
    children: [{
      label: 'Architecture',
      description: 'Learn how Discite works.',
      icon: 'i-ph-brackets-angle-duotone',
      to: '/docs/architecture',
      active: route.path.startsWith('/docs/architecture')
    }, {
      label: 'Guide',
      description: 'Learn how to use Discite.',
      icon: 'i-ph-book-open-duotone',
      to: '/docs/guide',
      active: route.path.startsWith('/docs/guide')
    }, {
      label: 'Community',
      description: 'Find answers and support from the community.',
      icon: 'i-ph-chats-teardrop-duotone',
      to: '/docs/community',
      active: route.path.startsWith('/docs/community')
    }]
  }, {
    label: 'Blog',
    icon: 'i-ph-newspaper-duotone',
    to: '/blog'
  }])

  const footerLinks = [{  
    label: 'Architecture',
    children: [{
      label: 'Front-End',
      to: '/docs/architecture/front-end'
    }, {
      label: 'Back-End',
      to: '/docs/architecture/back-end'
    }, {
      label: 'Streaming',
      to: '/docs/architecture/streaming'
    }, {
      label: 'Database',
      to: '/docs/architecture/database'
    }, {
      label: 'Machine Learning',
      to: '/docs/architecture/machine-learning'
    }
    
  
  ]
  }]

  const searchLinks = computed(() => [...headerLinks.value.map(link => {
    // Remove `/docs` and `/enterprise` links from command palette
    if (['/docs', '/enterprise'].includes(link.to)) {
      return {
        label: link.label,
        icon: link.icon,
        children: link.children
      }
    }

    return link
  }).filter(Boolean)])

  const searchGroups = [{
    key: 'articles-search',
    label: 'Articles',
    search: async (q) => {
      if (!q) {
        return []
      }

      const { articles, fetchList } = useBlog()
      if (!articles.value.length) {
        await fetchList()
      }

      return articles.value
        .filter(article => article.title.search(searchTextRegExp(q)) !== -1)
        .map(article => ({
          id: `article-${article._path}`,
          label: article.title,
          suffix: article.description,
          icon: 'i-ph-newspaper',
          to: article._path
        }))
    }
  }]

  return {
    headerLinks,
    footerLinks,
    searchLinks,
    searchGroups
  }
}

export const useNavigation = createSharedComposable(_useNavigation)
