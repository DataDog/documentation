export default {
  tags: {
    alert: {
      attributes: {
        type: { type: String, default: 'info' },
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
        method: { type: String, required: true },
      },
    },
    apiStatusAlert: {
      attributes: {
        type: { type: String, required: true },
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
