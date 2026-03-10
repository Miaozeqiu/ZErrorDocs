// https://vitepress.dev/guide/custom-theme
import { h, nextTick } from "vue";
import type { Theme, EnhanceAppContext } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { inBrowser } from 'vitepress';
import "./style.css";
import './custom.css'
import WorkspaceToggle from './components/WorkspaceToggle.vue'
import Vercount from './components/Vercount.vue'
import useVisitData from './hooks/useVisitData'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'doc-footer-before': () => h(Vercount),
    });
  },
  enhanceApp({ app, router, siteData }: EnhanceAppContext) {
    app.component('WorkspaceToggle', WorkspaceToggle)
    app.component('Vercount', Vercount)
    if (inBrowser) {
      router.onAfterPageLoad = () => {
        nextTick(() => {
          const el = document.getElementById('vercount_value_page_pv')
          if (el) el.textContent = 'Loading'
          useVisitData()
        })
      }
    }
  },
} satisfies Theme;
