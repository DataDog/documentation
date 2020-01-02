---
title: Iframe Widget
kind: documentation
description: "Inlude an Iframe in your Datadog dashboards."
aliases:
    - /graphing/widgets/iframe/
further_reading:
- link: "graphing/dashboards/screenboard/"
  tag: "Documentation"
  text: "Screenboard"
- link: "graphing/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
---

The iframe widget allows you to embed a portion of any other web page on your dashboard.

## Setup

{{< img src="graphing/widgets/iframe/iframe_setup.png" alt="Iframe setup"  style="width:80%;">}}

Enter the URL of the page you want to display inside the iframe. If you do not use an HTTPS URL, you may have to configure your browser to allow non-secure content.

## API

The dedicated [widget JSON schema definition][1] for the iframe widget is:

```
IFRAME_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["iframe"]},
        "url": {"type": "string"},
    },
    "required": ["type", "url"],
    "additionalProperties": false
}
```

| Parameter  | Type            | Required | Description                                                                                                                                                  |
| ------     | -----           | -----    | -----                                                                                                                                                        |
| `type`| string|yes|Type of the widget, for the iframe widget use `iframe`|
|`url`|string|yes|URL of the iframe|

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/graphing_json/widget_json
