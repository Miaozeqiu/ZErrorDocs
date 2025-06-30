import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: 'ZErrorDocs',
  description: 'A VitePress Site',
  ignoreDeadLinks: true,
  head: [
    ['link', { rel: 'icon', href: '/在浙学图标-02_32x32.ico' }]
  ],
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: false
  },
  themeConfig: {
    nav: [
      { text: '首页', link: 'https://app.zerror.cc', target: '_self', rel: '' },
      { text: '文档', link: '/docs/introduction' },
      { text: '下载', link: '/docs/download' }
    ],
    sidebar: {
      '/docs': [
        {
          text: 'ZError',
          items: [
            { text: '项目简介', link: '/docs/introduction' },
            { text: '快速开始', link: '/docs/get-started' },
            { text: '下载', link: '/docs/download' },
            { text: '获取API Key', link: '/docs/get-apiKey' },
          ]
        },

        {
          text: '在线题库',
          items: [
            { text: '题库配置', link: '/docs/online/API' },
            { text: '在线题库API说明', link: '/docs/online/API-Documentation' }
          ]
        },
        {
            text: '本地题库',
            items: [
                { text: '软件使用', link: '/docs/local/howtouse' },
                { text: 'API', link: '/docs/local/API' }
            ]
        }
      ],

    },
        socialLinks: [
      { icon: 'github', link: 'https://github.com/Miaozeqiu/ZError/' }
    ]
  },
cleanUrls: true,  // 开启 cleanUrls 功能
})
