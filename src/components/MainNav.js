import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";

export default function MainNav() {
  // This returns a flat list of menu items
  const data = useStaticQuery(graphql`
    {
      allWpMenuItem(
        sort: { order: ASC }
        filter: { locations: { eq: MAIN_MENU } }
      ) {
        nodes {
          id
          path
          label
          parentId
        }
      }
    }
  `);

  console.log(data.allWpMenuItem.nodes);

  // This functions converts the flat menu list into a hierarchical list
  const flatListToHierarchical = (
    data = [],
    { idKey = "id", parentKey = "parentId", childrenKey = "children" } = {}
  ) => {
    const tree = [];
    const childrenOf = {};
    data.forEach((item) => {
      const newItem = { ...item };
      const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;
      childrenOf[id] = childrenOf[id] || [];
      newItem[childrenKey] = childrenOf[id];
      parentId
        ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
        : tree.push(newItem);
    });
    return tree;
  };

  const mainMenuList = flatListToHierarchical(data.allWpMenuItem.nodes);

  console.log(mainMenuList);

  return (
    <nav className="main-menu">
      <ul className="menu">
        {mainMenuList.map((menuItem) => (
          <li>
            <Link to={menuItem.path} key={menuItem.id}>
              {menuItem.label}
            </Link>
            {menuItem.children.length > 0 ? (
              <ul className="sub-menu">
                {menuItem.children.map((childItem) => (
                  <li>
                    <Link to={childItem.path} key={childItem.id}>
                      {childItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}
