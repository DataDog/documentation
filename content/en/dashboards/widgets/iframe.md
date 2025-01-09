---
title: Iframe Widget
widget_type: iframe
description: "Include an Iframe in your Datadog dashboards."
aliases:
- /graphing/widgets/iframe/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
---

An inline frame (iframe) is a HTML element that loads another HTML page within the document. The iframe widget allows you to embed a portion of any other web page on your dashboard.

## Setup

{{< img src="dashboards/widgets/iframe/iframe_setup.png" alt="Iframe setup" style="width:80%;">}}

Enter the URL of the page you want to display inside the iframe. If you do not use an HTTPS URL, you may have to configure your browser to allow non-secure content.

## API

This widget can be used with the **[Dashboards API][1]**. See the following table for the [widget JSON schema definition][2]:

{{< dashboards-widgets-api >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/dashboards/
[2]: /dashboards/graphing_json/widget_json/
