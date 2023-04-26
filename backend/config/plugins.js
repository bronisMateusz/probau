module.exports = {
  menus: {
    config: {
      layouts: {
        menuItem: {
          // This is the menu item edit panel.
          link: [
            // This is the "link" tab in the menu item edit panel.
            {
              input: {
                label: "Additional attributes",
                name: "additional_attributes",
                type: "select",
                options: [
                  {
                    label: "Telefon",
                    value: "tel:",
                  },
                  {
                    label: "Mail",
                    value: "mailto:",
                  },
                ],
              },
              grid: {
                col: 6,
              },
            },
          ],
        },
      },
      maxDepth: 2,
    },
  },
};
