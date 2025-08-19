---
title: Region Shortcodes
---

## Site region shortcode

### Expected .md output

- The contents are enclosed in a `{% alert level="info" %}` tag.
- The alert contents include a heading or similar content establishing the context of the alert (e.g., "Alert for users on `ap1.datadoghq.com`").

### Example input

{{< site-region region="us,ap1" >}}
This paragraph only appears if the user has selected US or AP1 from the Site Selector dropdown.
{{< /site-region >}}

## Region parameter shortcode

### Expected .md output

A placeholder: 

- `<YOUR_DATADOG_SITE>` in code.
- `[USER'S DATADOG SITE]` in copy.

### Example inputs

#### In code

```shell
export DD_SITE={{< region-param key=dd_site code="true" >}}
```

#### In copy

Your Datadog site is {{< region-param key=dd_site >}}.