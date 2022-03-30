import { $t } from "/@/plugins/i18n";
const Layout = () => import("/@/layout/index.vue");

const myshopRouter = {
  path: "/myshop",
  component: Layout,
  redirect: "/myshop/info",
  meta: {
    icon: "fa-user",
    title: $t("menus.hsmyshop"),
    i18n: true,
    rank: 4
  },
  children: [
    {
      path: "/myshop/info",
      name: "info",
      component: () => import("/@/views/myshop/info.vue"),
      meta: {
        title: $t("menus.hsinfo"),
        i18n: true
      }
    },
    {
      path: "/myshop/bought",
      component: () => import("/@/views/myshop/bought.vue"),
      name: "bought",
      meta: {
        title: $t("menus.hsbought"),
        i18n: true
      }
    }
  ]
};

export default myshopRouter;
