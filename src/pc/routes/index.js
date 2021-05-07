import { asyncComponent } from "@pc/components/asyncComponent";
import simpleHoc from "@pc/components/addHeader";
const Blog = simpleHoc(asyncComponent(() =>
    import( /* webpackChunkName: "pc/chunck/Blog" */ "../views/Blog")
), 0);
const Eidtor = asyncComponent(() =>
    import( /* webpackChunkName: "pc/chunck/Editor" */ "../views/editor")
);
const ArticleDetail = simpleHoc(asyncComponent(() =>
    import( /* webpackChunkName: "pc/chunck/ArticleDetail" */ "../views/articleDetail")
), -1);
const Profile = simpleHoc(asyncComponent(() =>
    import( /* webpackChunkName: "pc/chunck/Profile" */ "../views/profile")
), -1);
export default [{
    path: '/Eidtor/:id?',
    component: Eidtor
}, {
    path: '/post/:id?',
    component: ArticleDetail
}, {
    path: '/profile/:id?',
    component: Profile
}, {
    path: '/:path?',
    component: Blog
}]