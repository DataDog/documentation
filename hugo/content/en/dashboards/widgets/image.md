---
title: Image Widget
widget_type: image
description: "Include an image or a gif in your Datadog dashboards."
aliases:
- /graphing/widgets/image/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
---

The image widget allows you to embed an image on your dashboard. An image can be uploaded to Datadog or hosted where it can be accessed by URL. PNG, JPG, and GIF file formats are supported.

{{< img src="dashboards/widgets/image/image.mp4" alt="Image" video="true" style="width:80%;" >}}

## Setup

{{< img src="dashboards/widgets/image/image_setup2.png" alt="Image setup" style="width:80%;">}}

1. Upload your image or enter your image URL.
2. Select a preset template or customize the display options.

## API

This widget can be used with the **[Dashboards API][1]**. See the following table for the [widget JSON schema definition][2]:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/dashboards/
[2]: /dashboards/graphing_json/widget_json/
