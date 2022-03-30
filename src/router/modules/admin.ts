import { $t } from "/@/plugins/i18n";
const Layout = () => import("/@/layout/index.vue");

const adminRouter = {
  path: "/admin",
  component: Layout,
  redirect: "/admin/dashboard",
  meta: {
    icon: "lollipop",
    title: $t("menus.hsadmin"),
    i18n: true,
    rank: 9
  },
  children: [
    {
      path: "/admin/dashboard",
      name: "dashborad",
      component: () => import("/@/views/admin/dashboard.vue"),
      meta: {
        title: $t("menus.hsdashboard"),
        i18n: true
      }
    },
    {
      path: "/admin/orderquery",
      name: "orderquery",
      component: () => import("/@/views/admin/orderquery.vue"),
      meta: {
        title: $t("menus.hsorderquery"),
        i18n: true
      }
    }
  ]
};

export default adminRouter;
