import { loginOut } from "@pc/apis/blogApis";
import { RESET } from "@pc/sotre/index";
import { message } from "antd";
export const menuOption = {
  loginout: (router, dispath) => {
    loginOut().then((res) => {
      message.success("退出成功");
      dispath({
        type: RESET,
      });
      router && router.replace("/");
    });
  },
  aboutUser:(router)=>{
    router && router.replace("/AboutUser");
  },
  goHome: (router) => {
    router && router.replace("/");
  },
  write: (router) => {
    router && router.push("/Eidtor");
  },
  drfat: (router, type) => {
    router && router.push("/Draft/" + type);
  },
  Profile: (router, id) => {
    router && router.push(`/Profile/${id}`);
  },
};
