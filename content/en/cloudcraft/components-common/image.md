---
title: "Image Component"
---

## Overview

The Image component is a basic but powerful component available for designing diagrams. Along with Icon and Blocks, it can be used to represent cloud components not yet available, as well as add new icon sets and software stacks.

{{< img src="cloudcraft/components-common/image/component-image.png" alt="Screenshot of a 3D representation of the image component in Cloudcraft" responsive="true" style="width:60%;">}}

## Toolbar

Use the toolbar to configure and customize the component. The following options are available:

- **Image name**: Name of the uploaded image, with file extension. Clicking the image name allow you to upload a new image to replace the current one.
- **Toggle 3D/2D projection**: Display the image in a 3D or 2D view when the diagram itself is in 3D view. Not available for 2D diagrams.
- **Toggle flat/standing projection**: Display the image flat or standing on the diagram. Not available when 2D projection is toggled or on 2D diagrams.
- **Scale**: Increase or decrease the size of an image.
- **Rotate item**: Rotate an image and change its direction.
- **Raise**: Raise the image component above other images.
- **Lower**: Lower the image component below other images.

## API

<div class ="alert alert-info">
  <p>While you can manipulate an image inside a diagram through our API, the image itself must be uploaded through the Cloudcraft UI.</p>
</div>

Use [the Cloudcraft API][1] to programmatically access and render your architecture diagrams as JSON objects. The following is an example JSON object of an Image component:

```json
{
  "type": "image",
  "id": "53c342f3-3f13-4ba5-bffa-f4e0db874f95",
  "mapPos": [2.25, 9.75],
  "key": "a5a840d9-c1f9-4e19-b67c-6b2bd1bfcdaa/nginx-logo.webp",
  "isometric": true,
  "standing": false,
  "scale": 0.10000000000000014,
  "direction": "down",
  "link": "https://nginx.org/",
  "locked": true
}
```

- **type: image**: The type of component.
- **id: string**: A unique identifier for the component in the `uuid` format.
- **mapPos: [number, number]**: The position of the component in the blueprint, expressed as a x,y coordinate pair.
- **key: string**: A unique identifier for the image consisting of an UUID, a filename, and an extension.
- **isometric: boolean**: If true, the image is displayed using a 3D projection, while false displays the image in a 2D projection. Defaults to true.
- **standing: boolean**: If true, displays the image in a standing position instead of flat. Defaults to false.
- **scale: number**: Scale the image to increase or decrease its size.
- **direction: string**: The rotation or direction of the image. Accepts `down, up, right, left` as value, with `down` as the default.
- **link: uri**: Link component to another diagram in the `blueprint://ID` format or to external website in the `https://LINK` format.
- **locked: boolean**: If true, changes to the component through the application are disabled until unlocked.

[1]: https://developers.cloudcraft.co/
