export const addAchorClass = () => {
  let menuUl = document.querySelector(".bytemd-toc").children[1];
  let h1List = document.querySelectorAll("h1");
  let h2List = document.querySelectorAll("h2");
  let h3List = document.querySelectorAll("h3");
  let h4List = document.querySelectorAll("h4");
  let h5List = document.querySelectorAll("h5");
  let h6List = document.querySelectorAll("h6");
  h1List.hasAddClcassCount = 0;
  h2List.hasAddClcassCount = 0;
  h3List.hasAddClcassCount = 0;
  h4List.hasAddClcassCount = 0;
  h5List.hasAddClcassCount = 0;
  h6List.hasAddClcassCount = 0;
  if (menuUl) {
    let menuli = menuUl.children;
    let menulist = [];
    if (menuli) {
      for (let i = 0; i < menuli.length; i++) {
        let menuliItem = menuli[i];
        //   说明这是h1
        if (menuliItem.className.includes("bytemd-toc-1")) {
          menulist.push([]);
          menulist[menulist.length - 1].push({
            leave: "pl8",
            anchor: `heading-${menulist.length}-${
              menulist[menulist.length - 1].length
            }`,
            name: menuliItem.innerHTML,
          });
          console.log(h1List[h1List.hasAddClcassCount]);
          h1List[h1List.hasAddClcassCount].setAttribute(
            "data-id",
            `heading-${menulist.length}-${menulist[menulist.length - 1].length}`
          );
          h1List.hasAddClcassCount = h1List.hasAddClcassCount + 1;
        } else if (menuliItem.className.includes("bytemd-toc-2")) {
          menulist[menulist.length - 1].push({
            leave: "pl10",
            anchor: `heading-${menulist.length}-${
              menulist[menulist.length - 1].length
            }`,
            name: menuliItem.innerHTML,
          });
        } else if (menuliItem.className.includes("bytemd-toc-3")) {
          menulist[menulist.length - 1].push({
            leave: "pl12",
            anchor: `heading-${menulist.length}-${
              menulist[menulist.length - 1].length
            }`,
            name: menuliItem.innerHTML,
          });
        } else if (menuliItem.className.includes("bytemd-toc-4")) {
          menulist[menulist.length - 1].push({
            leave: "pl14",
            anchor: `heading-${menulist.length}-${
              menulist[menulist.length - 1].length
            }`,
            name: menuliItem.innerHTML,
          });
        } else if (menuliItem.className.includes("bytemd-toc-5")) {
          menulist[menulist.length - 1].push({
            leave: "pl16",
            anchor: `heading-${menulist.length}-${
              menulist[menulist.length - 1].length
            }`,
            name: menuliItem.innerHTML,
          });
        } else if (menuliItem.className.includes("bytemd-toc-6")) {
          menulist[menulist.length - 1].push({
            leave: "pl18",
            anchor: `heading-${menulist.length}-${
              menulist[menulist.length - 1].length
            }`,
            name: menuliItem.innerHTML,
          });
        }
      }
    }
  }
};
