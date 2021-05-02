import { icons } from "./icons";
export default function theme(callBack) {
  const themeItem = [
    {
      title: "juejin",
    },
    {
      title: "geek-black",
    },
    {
      title: "awesome-green",
    },
    {
      title: "cyanosis",
    },
    {
      title: "channing-cyan",
    },
    {
      title: "qklhk-chocolate",
    }
    ,
    {
      title: "fancy",
    },
    {
      title: "mc-curt"
    }
  ];
  return {
    actions: [
      {
        title: "主题",
        icon: icons.theme,
        handler: {
          type: "dropdown",
          actions: themeItem.map(({ title }) => ({
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
