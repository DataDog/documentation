---
title: "Text label Component"
---

## Overview

The Text label component can be used to label components, icons, and areas in a diagram, increasing readability and visual appeal.

{{< img src="cloudcraft/components-common/text-label/component-text-label.png" alt="Screenshot of a 3D representation of the text label component in Cloudcraft" responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Color**: Select a predefined color or enter the hexadecimal value for the color. Accepts the same color for both 2D and 3D view, or different colors for each.
- **Toggle 3D/2D projection**: Display the label in 3D or 2D view.
- **Toggle flat/standing projection**: Display the label flat or standing. Not available when 2D projection is toggled.
- **Size**: The size of the text label. Accepts a maximum value of 112.
- **Rotate item**: Rotate a text label component and change its direction.
- **Outline**: Add an outline to the text label for increased color contrast.

## API

Use [the Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. The following is an example JSON object of a Text label component:

```json
{
  "type": "isotext",
  "id": "8f2a0f5f-c373-42dd-b4df-f06f455f5f94",
  "mapPos": [3.5, 9],
  "text": "Hello world!",
  "textSize": 56,
  "isometric": true,
  "standing": false,
  "direction": "down",
  "outline": true,
  "color": {
    "2d": "#000000",
    "isometric": "#000000"
  },
  "link": "https://blog.cloudcraft.co/welcome-to-cloudcraft/",
  "locked": true
}
```

- **type: isotext**: The type of component.
- **id: string**: A unique identifier for the component in the `uuid` format.
- **mapPos: [number, number]**: The position of the component in the blueprint, expressed as a x,y coordinate pair.
- **text: string**: The text used for the label.
- **textSize: number**: The size of the text label. Defaults to 25.
- **isometric: boolean**: If true, the label is displayed using a 3D projection, while false displays the label in a 2D projection. Defaults to true.
- **standing: boolean**: If true, displays the label in a standing position instead of flat. Defaults to false.
- **direction: string**: The rotation or direction of the label. Accepts `down, up, right, left` as value, with `down` as the default.
- **outline: boolean**: If true, adds an outline to the text to increase color contrast. Defaults to false.
- **color: object**: The fill color for the component.
  - **isometric: string**: Fill color for the component in 3D view. Must be an hexadecimal color.
  - **2d: string**: Fill color for the component in 2D view. Must be an hexadecimal color.
- **link: uri**: Link component to another diagram in the `blueprint://ID` format or to external website in the `https://LINK` format.
- **locked: boolean**: If true, changes to the component through the application are disabled until unlocked.

[1]: https://developers.cloudcraft.co/
