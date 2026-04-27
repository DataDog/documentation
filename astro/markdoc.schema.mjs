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
    apiMethodBadge: {
      attributes: {
        method: {
          type: String,
          required: true,
          matches: ["get", "post", "put", "patch", "delete", "head", "options"],
        },
      },
    },
    apiStatusAlert: {
      attributes: {
        type: {
          type: String,
          required: true,
          matches: ["deprecated", "unstable", "beta"],
        },
        newerVersionUrl: { type: String },
        message: { type: String },
      },
    },
    schemaTable: {
      attributes: {
        fields: { type: String, required: true },
        title: { type: String },
        showExpandAll: { type: Boolean, default: true },
      },
    },
    regionSelector: {
      attributes: {},
    },
    apiResponse: {
      attributes: {
        responses: { type: String, required: true },
      },
    },
    apiCodeExample: {
      attributes: {
        examples: { type: String, required: true },
      },
    },
    apiEndpoint: {
      attributes: {
        data: { type: String, required: true },
      },
    },
    placeholder: {
      attributes: {
        name: { type: String, required: true },
        class: { type: String },
      },
    },
  },
};
