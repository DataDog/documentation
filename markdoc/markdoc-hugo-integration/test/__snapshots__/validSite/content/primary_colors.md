---
title: The Primary Colors of the Color Wheel
---
<div>
  <div id="chooser">
    <div class="markdoc-pref__container">
      <div class="markdoc-pref__label">Color</div>
      <div class="markdoc-pref__pill" data-pref-id="color" data-option-id="red">
        Red
      </div>
      <div
        class="markdoc-pref__pill"
        data-pref-id="color"
        data-option-id="yellow"
      >
        Yellow
      </div>
      <div
        class="markdoc-pref__pill selected"
        data-pref-id="color"
        data-option-id="blue"
      >
        Blue
      </div>
    </div>
    <div class="markdoc-pref__container">
      <div class="markdoc-pref__label">Item</div>
      <div
        class="markdoc-pref__pill"
        data-pref-id="item"
        data-option-id="ocean"
      >
        Ocean
      </div>
      <div
        class="markdoc-pref__pill selected"
        data-pref-id="item"
        data-option-id="sky"
      >
        Sky
      </div>
      <div
        class="markdoc-pref__pill"
        data-pref-id="item"
        data-option-id="jeans"
      >
        Jeans
      </div>
      <div
        class="markdoc-pref__pill"
        data-pref-id="item"
        data-option-id="blueberry"
      >
        Blueberry
      </div>
    </div>
    <hr />
  </div>
</div>
<div id="content">
  <article>
    <p>
      This test page explores everyday items that are blue, yellow, or red --
      which also happen to be the primary colors of the color wheel. If this
      seems contrived and odd, that's only because test pages are often both of
      those things.
    </p>
    <h2>sky: Your blue item of choice</h2>
    <div>
      <div class="markdoc__hidden">
        <p>
          The ocean is a large body of saltwater. It covers about 70% of the
          Earth's surface.
        </p>
      </div>
      <div>
        <p>
          The sky is the atmosphere as seen from the Earth's surface. It appears
          blue during the day.
        </p>
      </div>
      <div class="markdoc__hidden">
        <p>
          Jeans are a type of clothing. They're often made from denim and are
          known for their durability.
        </p>
      </div>
      <div class="markdoc__hidden">
        <p>
          Blueberries are a type of fruit. They're often eaten raw or used in
          baking.
        </p>
      </div>
    </div>
    <div class="markdoc__hidden">
      <div class="markdoc__hidden">
        <p>
          Bananas are a type of fruit. They're often eaten raw or used in
          baking.
        </p>
      </div>
      <div class="markdoc__hidden">
        <p>
          Sunflowers are a type of flower. They're known for their large, yellow
          petals.
        </p>
      </div>
      <div class="markdoc__hidden">
        <p>
          Lemons are a type of citrus fruit. They're often used in drinks and
          cooking.
        </p>
      </div>
      <div class="markdoc__hidden">
        <p>
          School buses are a type of vehicle. They're often used to transport
          students to and from school.
        </p>
      </div>
    </div>
    <div class="markdoc__hidden">
      <div class="markdoc__hidden">
        <p>
          Rubies are a type of gemstone. They're known for their deep red color.
        </p>
      </div>
      <div class="markdoc__hidden">
        <p>
          Apples are a type of fruit. They're often eaten raw or used in baking.
        </p>
      </div>
      <div class="markdoc__hidden">
        <p>
          Firetrucks are a type of vehicle. They're often used to transport
          firefighters and equipment to emergency situations.
        </p>
      </div>
      <div class="markdoc__hidden">
        <p>
          Stop signs are a type of traffic sign. They're used to indicate that
          drivers should stop their vehicles.
        </p>
      </div>
    </div>
  </article>
</div>
<script>
  let selectedValsByPrefId = {
    color: "blue",
    item: "sky",
  };
  const renderableTree = {
    $$mdtype: "Tag",
    name: "article",
    attributes: {},
    children: [
      {
        $$mdtype: "Tag",
        name: "p",
        attributes: {},
        children: [
          "This test page explores everyday items that are blue, yellow, or red -- which also happen to be the primary colors of the color wheel. If this seems contrived and odd, that's only because test pages are often both of those things.",
        ],
      },
      {
        $$mdtype: "Tag",
        name: "h2",
        attributes: {},
        children: [
          {
            $$mdtype: "Variable",
            path: ["item"],
            value: "sky",
          },
          ": Your ",
          {
            $$mdtype: "Variable",
            path: ["color"],
            value: "blue",
          },
          " item of choice",
        ],
      },
      {
        $$mdtype: "Tag",
        name: "div",
        if: {
          $$mdtype: "Function",
          name: "equals",
          value: true,
          parameters: {
            0: {
              $$mdtype: "Variable",
              path: ["color"],
              value: "blue",
            },
            1: "blue",
          },
        },
        attributes: {
          display: "true",
        },
        children: [
          {
            $$mdtype: "Tag",
            name: "div",
            if: {
              $$mdtype: "Function",
              name: "equals",
              value: false,
              parameters: {
                0: {
                  $$mdtype: "Variable",
                  path: ["item"],
                  value: "sky",
                },
                1: "ocean",
              },
            },
            attributes: {
              display: "false",
            },
            children: [
              {
                $$mdtype: "Tag",
                name: "p",
                attributes: {},
                children: [
                  "The ocean is a large body of saltwater. It covers about 70% of the Earth's surface.",
                ],
              },
            ],
          },
          {
            $$mdtype: "Tag",
            name: "div",
            if: {
              $$mdtype: "Function",
              name: "equals",
              value: true,
              parameters: {
                0: {
                  $$mdtype: "Variable",
                  path: ["item"],
                  value: "sky",
                },
                1: "sky",
              },
            },
            attributes: {
              display: "true",
            },
            children: [
              {
                $$mdtype: "Tag",
                name: "p",
                attributes: {},
                children: [
                  "The sky is the atmosphere as seen from the Earth's surface. It appears blue during the day.",
                ],
              },
            ],
          },
          {
            $$mdtype: "Tag",
            name: "div",
            if: {
              $$mdtype: "Function",
              name: "equals",
              value: false,
              parameters: {
                0: {
                  $$mdtype: "Variable",
                  path: ["item"],
                  value: "sky",
                },
                1: "jeans",
              },
            },
            attributes: {
              display: "false",
            },
            children: [
              {
                $$mdtype: "Tag",
                name: "p",
                attributes: {},
                children: [
                  "Jeans are a type of clothing. They're often made from denim and are known for their durability.",
                ],
              },
            ],
          },
          {
            $$mdtype: "Tag",
            name: "div",
            if: {
              $$mdtype: "Function",
              name: "equals",
              value: false,
              parameters: {
                0: {
                  $$mdtype: "Variable",
                  path: ["item"],
                  value: "sky",
                },
                1: "blueberry",
              },
            },
            attributes: {
              display: "false",
            },
            children: [
              {
                $$mdtype: "Tag",
                name: "p",
                attributes: {},
                children: [
                  "Blueberries are a type of fruit. They're often eaten raw or used in baking.",
                ],
              },
            ],
          },
        ],
      },
      {
        $$mdtype: "Tag",
        name: "div",
        if: {
          $$mdtype: "Function",
          name: "equals",
          value: false,
          parameters: {
            0: {
              $$mdtype: "Variable",
              path: ["color"],
              value: "blue",
            },
            1: "yellow",
          },
        },
        attributes: {
          display: "false",
        },
        children: [
          {
            $$mdtype: "Tag",
            name: "div",
            if: {
              $$mdtype: "Function",
              name: "equals",
              value: false,
              parameters: {
                0: {
                  $$mdtype: "Variable",
                  path: ["item"],
                  value: "sky",
                },
                1: "banana",
              },
            },
            attributes: {
              display: "false",
            },
            children: [
              {
                $$mdtype: "Tag",
                name: "p",
                attributes: {},
                children: [
                  "Bananas are a type of fruit. They're often eaten raw or used in baking.",
                ],
              },
            ],
          },
          {
            $$mdtype: "Tag",
            name: "div",
            if: {
              $$mdtype: "Function",
              name: "equals",
              value: false,
              parameters: {
                0: {
                  $$mdtype: "Variable",
                  path: ["item"],
                  value: "sky",
                },
                1: "sunflower",
              },
            },
            attributes: {
              display: "false",
            },
            children: [
              {
                $$mdtype: "Tag",
                name: "p",
                attributes: {},
                children: [
                  "Sunflowers are a type of flower. They're known for their large, yellow petals.",
                ],
              },
            ],
          },
          {
            $$mdtype: "Tag",
            name: "div",
            if: {
              $$mdtype: "Function",
              name: "equals",
              value: false,
              parameters: {
                0: {
                  $$mdtype: "Variable",
                  path: ["item"],
                  value: "sky",
                },
                1: "lemon",
              },
            },
            attributes: {
              display: "false",
            },
            children: [
              {
                $$mdtype: "Tag",
                name: "p",
                attributes: {},
                children: [
                  "Lemons are a type of citrus fruit. They're often used in drinks and cooking.",
                ],
              },
            ],
          },
          {
            $$mdtype: "Tag",
            name: "div",
            if: {
              $$mdtype: "Function",
              name: "equals",
              value: false,
              parameters: {
                0: {
                  $$mdtype: "Variable",
                  path: ["item"],
                  value: "sky",
                },
                1: "school_bus",
              },
            },
            attributes: {
              display: "false",
            },
            children: [
              {
                $$mdtype: "Tag",
                name: "p",
                attributes: {},
                children: [
                  "School buses are a type of vehicle. They're often used to transport students to and from school.",
                ],
              },
            ],
          },
        ],
      },
      {
        $$mdtype: "Tag",
        name: "div",
        if: {
          $$mdtype: "Function",
          name: "equals",
          value: false,
          parameters: {
            0: {
              $$mdtype: "Variable",
              path: ["color"],
              value: "blue",
            },
            1: "red",
          },
        },
        attributes: {
          display: "false",
        },
        children: [
          {
            $$mdtype: "Tag",
            name: "div",
            if: {
              $$mdtype: "Function",
              name: "equals",
              value: false,
              parameters: {
                0: {
                  $$mdtype: "Variable",
                  path: ["item"],
                  value: "sky",
                },
                1: "ruby",
              },
            },
            attributes: {
              display: "false",
            },
            children: [
              {
                $$mdtype: "Tag",
                name: "p",
                attributes: {},
                children: [
                  "Rubies are a type of gemstone. They're known for their deep red color.",
                ],
              },
            ],
          },
          {
            $$mdtype: "Tag",
            name: "div",
            if: {
              $$mdtype: "Function",
              name: "equals",
              value: false,
              parameters: {
                0: {
                  $$mdtype: "Variable",
                  path: ["item"],
                  value: "sky",
                },
                1: "apple",
              },
            },
            attributes: {
              display: "false",
            },
            children: [
              {
                $$mdtype: "Tag",
                name: "p",
                attributes: {},
                children: [
                  "Apples are a type of fruit. They're often eaten raw or used in baking.",
                ],
              },
            ],
          },
          {
            $$mdtype: "Tag",
            name: "div",
            if: {
              $$mdtype: "Function",
              name: "equals",
              value: false,
              parameters: {
                0: {
                  $$mdtype: "Variable",
                  path: ["item"],
                  value: "sky",
                },
                1: "firetruck",
              },
            },
            attributes: {
              display: "false",
            },
            children: [
              {
                $$mdtype: "Tag",
                name: "p",
                attributes: {},
                children: [
                  "Firetrucks are a type of vehicle. They're often used to transport firefighters and equipment to emergency situations.",
                ],
              },
            ],
          },
          {
            $$mdtype: "Tag",
            name: "div",
            if: {
              $$mdtype: "Function",
              name: "equals",
              value: false,
              parameters: {
                0: {
                  $$mdtype: "Variable",
                  path: ["item"],
                  value: "sky",
                },
                1: "stop_sign",
              },
            },
            attributes: {
              display: "false",
            },
            children: [
              {
                $$mdtype: "Tag",
                name: "p",
                attributes: {},
                children: [
                  "Stop signs are a type of traffic sign. They're used to indicate that drivers should stop their vehicles.",
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  const pagePrefsConfig = [
    {
      display_name: "Color",
      identifier: "color",
      options_source: "primary_color_options",
    },
    {
      display_name: "Item",
      identifier: "item",
      options_source: "blue_item_options",
    },
  ];
  const prefOptionsConfig = {
    primary_color_options: [
      {
        display_name: "Red",
        identifier: "red",
      },
      {
        display_name: "Yellow",
        identifier: "yellow",
      },
      {
        display_name: "Blue",
        default: true,
        identifier: "blue",
      },
    ],
    red_item_options: [
      {
        display_name: "Ruby",
        identifier: "ruby",
      },
      {
        display_name: "Apple",
        default: true,
        identifier: "apple",
      },
      {
        display_name: "Firetruck",
        identifier: "firetruck",
      },
      {
        display_name: "Stop sign",
        identifier: "stop_sign",
      },
    ],
    yellow_item_options: [
      {
        display_name: "Banana",
        default: true,
        identifier: "banana",
      },
      {
        display_name: "Sunflower",
        identifier: "sunflower",
      },
      {
        display_name: "Lemon",
        identifier: "lemon",
      },
      {
        display_name: "School bus",
        identifier: "school_bus",
      },
    ],
    blue_item_options: [
      {
        display_name: "Ocean",
        identifier: "ocean",
      },
      {
        display_name: "Sky",
        default: true,
        identifier: "sky",
      },
      {
        display_name: "Jeans",
        identifier: "jeans",
      },
      {
        display_name: "Blueberry",
        identifier: "blueberry",
      },
    ],
  };
  const contentDiv = document.getElementById("content");
  const chooserDiv = document.getElementById("chooser");
  function handleValueChange(e) {
    const node = e.target;
    const prefId = node.getAttribute("data-pref-id");
    const optionId = node.getAttribute("data-option-id");
    selectedValsByPrefId[prefId] = optionId;
    MarkdocClientRenderer(renderableTree, contentDiv, {
      variables: selectedValsByPrefId,
    });
  }
  const prefPills = document.getElementsByClassName("markdoc-pref__pill");
  for (let i = 0; i < prefPills.length; i++) {
    prefPills[i].addEventListener("click", handleValueChange);
  }
</script>
