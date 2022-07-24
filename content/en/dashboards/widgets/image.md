---
title: Image Widget
kind: documentation
description: "Include an image or a gif in your Datadog dashboards."
aliases:
    - /graphing/widgets/image/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
---

The image widget allows you to embed an image on your dashboard. An image can be a PNG, JPG, or animated GIF, hosted where it can be accessed by URL:

{{< img src="dashboards/widgets/image/image.mp4" alt="Image" video="true" style="width:80%;" >}}

## Setup

{{< img src="dashboards/widgets/image/image_setup.png" alt="Image setup" style="width:80%;">}}

1. Enter your image URL.
2. Choose an appearance:
    * Zoom image to cover whole title
    * Fit image on tile
    * Center image on tile

## API

This widget can be used with the **Dashboards API**. See the [Dashboards API documentation][1] for additional reference.

The dedicated [widget JSON schema definition][2] for the image widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/v1/dashboards/
[2]: /dashboards/graphing_json/widget_json/
