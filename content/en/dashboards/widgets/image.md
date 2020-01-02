---
title: Image Widget
kind: documentation
description: "Inlude an image or a gif in your Datadog dashboards."
aliases:
    - /graphing/widgets/image/
further_reading:
- link: "graphing/dashboards/screenboard/"
  tag: "Documentation"
  text: "Screenboard"
- link: "graphing/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
---

The image widget allows you to embed an image on your dashboard. An image can be a PNG, JPG, or animated GIF:

{{< img src="graphing/widgets/image/image.mp4" alt="Image" video="true"  width="80%" >}}

## Setup

{{< img src="graphing/widgets/image/image_setup.png" alt="Image setup"  style="width:80%;">}}

1. Enter your image URL
2. Choose an appearance:
    * Zoom image to cover whole title
    * Fit image on tile
    * Center image on tile

## API

The dedicated [widget JSON schema definition][1] for the image widget is:

```
IMAGE_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["image"]},
        "url": {"type": "string"},
        "sizing": {"enum": ["zoom", "fit", "center"]},
        "margin": {"enum": ["small", "large"]}
    },
    "required": ["type", "url"],
    "additionalProperties": false
}
```

| Parameter  | Type            | Required | Description                                                                                                                                                  |
| ------     | -----           | -----    | -----                                                                                                                                                        |
| `type`| string|yes|Type of the widget, for the image widget use `image`|
|`url`|string|yes|URL of the image|
|`sizing`|string|no|How to size the image on the widget. Available values are: `zoom`, `fit` or `center`
|`margin`|string|no|Size of the margins around the image. Available values are: `small` or `large`


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/graphing_json/widget_json
