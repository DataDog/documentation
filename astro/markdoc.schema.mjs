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
    stepper: {
      attributes: {
        open: { type: Boolean, default: false },
        level: {
          type: String,
          default: "h3",
          matches: ["h1", "h2", "h3", "h4", "h5", "h6"],
        },
      },
    },
    step: {
      attributes: {
        title: { type: String, required: true },
      },
    },
    stepperFinished: {
      attributes: {},
    },
    regionSelector: {
      attributes: {},
    },
    whatsNext: {
      attributes: {
        desc: { type: String },
      },
    },
    nextLink: {
      attributes: {
        href: { type: String, required: true },
        tag: { type: String },
      },
    },
  },
};
