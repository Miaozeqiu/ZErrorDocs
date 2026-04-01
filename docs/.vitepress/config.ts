import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: 'ZErrorDocs',
  description: 'ZError-网课AI题库',
  ignoreDeadLinks: true,
  head: [
    ['link', { rel: 'icon', href: '/在浙学图标-02_32x32.ico' }],
    ['script', { defer: '', async: '', src: 'https://cn.vercount.one/js' }]
  ],
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: false
  },
  // rewrites 只在开发服务器生效，部署到 EdgeOne 时会被忽略
  // 确保 /docs/ 路径仍然可用（通过实际的 docs/ 目录文件）
  // rewrites: {
  //   'legacy/:rest*': 'docs/:rest*',
  //   'docs/index.md': 'docs/index.md',
  //   'docs/:rest*': ':rest*'
  // },
  themeConfig: {
    nav: [
      { text: '首页', link: 'https://app.zerror.cc', target: '_self', rel: '' },
      { text: '文档', link: '/introduction' },
      { text: '下载', link: '/download' }
    ],
    sidebar: {
      '/': [
        {
          text: 'ZError',
          items: [
            { text: '项目简介', link: '/introduction' },
            { text: '快速开始', link: '/get-started' },

          ]
        },

        {
          text: '在线题库',
          items: [
            { text: 'OCS网课助手使用教程', link: '/online/API' },
            { text: '校园题库🔥', link: '/online/campus-question-bank' },
            { text: '在线题库API说明', link: '/online/API-Documentation' }
          ]
        },
        {
            text: '本地题库',
            items: [
                { text: '软件使用', link: '/local/howtouse' },
                { text: '获取API Key', link: '/get-apiKey' },
                { text: 'API', link: '/local/API' },
                { text: '模型配置', link: '/local/modelConfig' },
                { text: '局域网访问', link: '/local/LAN' }
            ]
        },
        {
            text: '其他',
            items: [
                { text: '联系', link: '/others/contact' },
            ]
        }
      ],

    },
        socialLinks: [
      { icon: 'github', link: 'https://github.com/Miaozeqiu/ZError/' }
    ]
  },
cleanUrls: true,  // 开启 cleanUrls 功能
  sitemap: {
    hostname: 'https://docs.zerror.cc'
  }
})
