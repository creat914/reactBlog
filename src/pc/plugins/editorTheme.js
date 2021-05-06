import { icons } from "./icons";
import themeNameList from "@pc/utils/themeName";
export default function theme(callBack) {
  return {
    actions: [
      {
        title: "主题",
        icon: icons.theme,
        handler: {
          type: "dropdown",
          actions: themeNameList.map(({ title }) => ({
            title,
            handler: {
              type: "action",
              click() {
                callBack(title);
              },
            },
          })),
        },
      },
    ],
  };
}
