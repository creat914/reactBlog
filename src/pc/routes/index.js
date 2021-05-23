import { asyncComponent } from "@pc/components/asyncComponent";
import simpleHoc from "@pc/components/addHeader";
const Blog = simpleHoc(
  asyncComponent(() =>
    import(/* webpackChunkName: "pc/chunck/Blog" */ "../views/Blog")
  ),
  0
);
const Eidtor = asyncComponent(() =>
  import(/* webpackChunkName: "pc/chunck/Editor" */ "../views/editor")
);
const ArticleDetail = simpleHoc(
  asyncComponent(() =>
    import(
      /* webpackChunkName: "pc/chunck/ArticleDetail" */ "../views/articleDetail"
    )
  ),
  -1
);
const Profile = simpleHoc(
  asyncComponent(() =>
    import(/* webpackChunkName: "pc/chunck/Profile" */ "../views/profile")
  ),
  -1
);

const draft = simpleHoc(
  asyncComponent(() =>
    import(/* webpackChunkName: "pc/chunck/draft" */ "../views/draft")
  ),
  -1
);
const AboutUser = simpleHoc(
  asyncComponent(() =>
    import(/* webpackChunkName: "pc/chunck/aboutUser" */ "../views/aboutUser")
  ),
  -1
);

const collectDetail = simpleHoc(
  asyncComponent(() =>
    import(
      /* webpackChunkName: "pc/chunck/collectDetail" */ "../views/myCollectDedail"
    )
  ),
  -1
);
export default [
  {
    path: "/Eidtor/:type?/:id?",
    component: Eidtor,
  },
  {
    path: "/post/:id?",
    component: ArticleDetail,
  },
  {
    path: "/profile/:id?",
    component: Profile,
  },
  {
    path: "/draft/:type?",
    component: draft,
  },
  {
    path: "/AboutUser",
    component: AboutUser,
  },
  {
    path: "/collectDetail/:id/:collectTitle",
    component: collectDetail,
  },
  {
    path: "/:path?",
    component: Blog,
    cache: true,
  },
];
