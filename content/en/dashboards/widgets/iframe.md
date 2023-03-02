---
title: Iframe Widget
kind: documentation
description: "Include an Iframe in your Datadog dashboards."
aliases:
    - /graphing/widgets/iframe/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
---

The iframe widget allows you to embed a portion of any other web page on your dashboard.

## Setup

{{< img src="dashboards/widgets/iframe/iframe_setup.png" alt="Iframe setup" style="width:80%;">}}

Enter the URL of the page you want to display inside the iframe. If you do not use an HTTPS URL, you may have to configure your browser to allow non-secure content.

## API

This widget can be used with the **Dashboards API**. See the [Dashboards API documentation][1] for additional reference.

The dedicated [widget JSON schema definition][2] for the iframe widget is:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/v1/dashboards/
[2]: /dashboards/graphing_json/widget_json/
