"use strict";

module.exports = (plugin) => {
  // Get current `MenuItem` attributes.
  const defaultAttrs = plugin.contentTypes["menu-item"].schema.attributes;

  // Define custom attributes for `MenuItem`
  const customAttrs = {
    additional_attributes: {
      type: "enumeration",
      enum: ["tel:", "mailto:"],
    },
  };

  // Extend the `MenuItem` content type with custom attributes.
  plugin.contentTypes["menu-item"].schema.attributes = {
    ...defaultAttrs,
    ...customAttrs,
  };

  return plugin;
};
