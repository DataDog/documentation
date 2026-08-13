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
    img: {
      attributes: {
        src: { type: String, required: true },
        alt: { type: String },
        caption: { type: String },
        width: { type: String, default: false },
        height: { type: String, default: false },
        widthPercent: { type: Number },
        video: { type: Boolean, default: false },
        inline: { type: Boolean, default: false },
        popup: { type: Boolean, default: true },
      },
      validate(node) {
        const { width, height, widthPercent } = node.attributes;
        if (widthPercent !== undefined && (width !== undefined || height !== undefined)) {
          return [
            {
              id: "img-width-percent-conflict",
              level: "error",
              message:
                "img: widthPercent can't be combined with width or height. widthPercent overrides them silently in the rendered CSS, so use one sizing approach.",
            },
          ];
        }
        return [];
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
    "stepper-finished": {
      attributes: {},
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
    "collapse-content": {
      attributes: {
        title: { type: String, required: true },
        level: {
          type: String,
          default: "h3",
          matches: ["h1", "h2", "h3", "h4", "h5", "h6"],
        },
        expanded: { type: Boolean, default: false },
        id: { type: String },
      },
    },
    ui: {
      attributes: {},
    },
    kbd: {
      attributes: {},
    },
    sup: {
      attributes: {},
    },
    nbsp: {
      attributes: {},
      selfClosing: true,
    },
    "agent-only": {
      attributes: {},
    },
  },
};
