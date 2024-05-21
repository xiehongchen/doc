// .vitepress/theme/index.js
import DefaultTheme from "vitepress/theme";
import vitepressNprogress from "vitepress-plugin-nprogress";
import vitepressBackToTop from "vitepress-plugin-back-to-top";
import "vitepress-plugin-back-to-top/dist/style.css";
import "vitepress-plugin-nprogress/lib/css/index.css";
import "./custom.css";
import "./main.css";
import mediumZoom from "medium-zoom";
import { useRoute } from "vitepress";
import { onMounted, watch, nextTick } from "vue";

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    vitepressNprogress(ctx);
    vitepressBackToTop({
      // default
      threshold: 300,
    });
  },
  setup() {
    const route = useRoute();
    const initZoom = () => {
      // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
      mediumZoom(".main img", { background: "var(--vp-c-bg)" });
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  },
};
