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
    img: {
      selfClosing: true,
      attributes: {
        src: { type: String, required: true },
        alt: { type: String },
        caption: { type: String },
        width: { type: String },
        height: { type: String },
        widthPercent: { type: Number },
        video: { type: Boolean, default: false },
        inline: { type: Boolean, default: false },
        popup: { type: Boolean, default: true },
      },
      validate(node) {
        const { widthPercent, width, height, video, caption } = node.attributes;
        const errors = [];
        if (widthPercent != null && (width != null || height != null)) {
          errors.push({
            id: "img-widthPercent-conflict",
            level: "error",
            message:
              "The `widthPercent` attribute can't be combined with `width` or `height`.",
          });
        }
        if (video && caption != null) {
          errors.push({
            id: "img-video-caption-conflict",
            level: "error",
            message:
              "The `caption` attribute is not supported on video images.",
          });
        }
        return errors;
      },
    },
    "card-grid": {
      attributes: {
        card_width: { type: Number, default: 150 },
        // No default: the transform distinguishes "author set this on the
        // child" from "inherit from the parent" by reading the raw AST
        // attributes. A default here would make every child look explicit.
        image_width: { type: Number },
      },
      validate(node) {
        const errors = [];
        const cards = [];

        for (const child of node.children) {
          if (child.type === "text") {
            // Markdoc emits a text node for the newlines between tags; only
            // text with real content is an authoring mistake.
            if (String(child.attributes.content ?? "").trim() !== "") {
              errors.push({
                id: "card-grid-text-child",
                level: "error",
                message:
                  "`card-grid` can only contain `image-card` tags, not text.",
              });
            }
            continue;
          }
          if (child.type === "paragraph") {
            // Markdoc wraps loose text (and inline tags like `alert`) in a
            // paragraph node rather than emitting a bare text node. Walk its
            // descendants: a nested tag is an invalid child in its own
            // right, and any leftover non-whitespace text is a stray-text
            // error.
            let paragraphText = "";
            let foundNestedTag = false;
            for (const descendant of child.walk()) {
              if (descendant.type === "tag") {
                foundNestedTag = true;
                if (descendant.tag !== "image-card") {
                  errors.push({
                    id: "card-grid-invalid-child",
                    level: "error",
                    message: `\`${descendant.tag}\` is not a valid child of \`card-grid\`. Only \`image-card\` is allowed.`,
                  });
                } else {
                  cards.push(descendant);
                }
              } else if (descendant.type === "text") {
                paragraphText += String(descendant.attributes.content ?? "");
              }
            }
            if (!foundNestedTag && paragraphText.trim() !== "") {
              errors.push({
                id: "card-grid-text-child",
                level: "error",
                message:
                  "`card-grid` can only contain `image-card` tags, not text.",
              });
            }
            continue;
          }
          if (child.type !== "tag") continue;
          if (child.tag !== "image-card") {
            errors.push({
              id: "card-grid-invalid-child",
              level: "error",
              message: `\`${child.tag}\` is not a valid child of \`card-grid\`. Only \`image-card\` is allowed.`,
            });
            continue;
          }
          cards.push(child);
        }

        if (cards.length === 0) {
          errors.push({
            id: "card-grid-empty",
            level: "error",
            message: "`card-grid` must contain at least one `image-card`.",
          });
        }

        for (const card of cards) {
          const { src, title } = card.attributes;
          if (src == null && title == null) {
            errors.push({
              id: "image-card-no-content",
              level: "error",
              message:
                "`image-card` needs a `src`, a `title`, or both. Without one it renders as an empty clickable box.",
            });
          }
        }

        return errors;
      },
    },
    "image-card": {
      selfClosing: true,
      attributes: {
        href: { type: String, required: true },
        src: { type: String },
        alt: { type: String, default: "" },
        title: { type: String },
        subtitle: { type: String },
        tooltip: { type: String },
        // No default — see the note on `card-grid.image_width`.
        image_width: { type: Number },
      },
    },
  },
};
