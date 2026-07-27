export default {
  nodes: {
    fence: {
      attributes: {
        content: { type: String, render: true },
        language: { type: String, render: true },
        filename: { type: String, render: true },
        wrap: { type: Boolean, default: false, render: true },
        collapsible: { type: Boolean, default: false, render: true },
        disable_copy: { type: Boolean, default: false, render: true },
      },
    },
  },
  tags: {
    alert: {
      attributes: {
        level: {
          type: String,
          default: "info",
          matches: ["info", "danger", "warning", "tip"],
        },
      },
    },
    tabs: {
      attributes: {},
    },
    tab: {
      attributes: {
        label: { type: String, required: true },
      },
    },
    "region-selector": {
      attributes: {},
    },
    "whats-next": {
      attributes: {
        desc: { type: String },
      },
    },
    "next-link": {
      attributes: {
        href: { type: String, required: true },
        tag: { type: String },
      },
    },
  },
};
