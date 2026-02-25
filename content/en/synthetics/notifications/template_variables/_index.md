---
title: Synthetic Monitoring Template Variables
aliases:
- /synthetics/notifications/template_variables_cdocs
further_reading:
- link: "/monitors/manage/"
  tag: "Documentation"
  text: "Learn how to manage monitors"
- link: "/monitors/templates/"
  tag: "Documentation"
  text: "Learn more about monitor templates"
- link: "/synthetics/guide/how-synthetics-monitors-trigger-alerts/"
  tag: "Guide"
  text: "Understanding Synthetic Monitor Alerting"
---

## Overview

Template variables allow you to insert dynamic values from your test results and configuration into Synthetic Monitoring notification messages. These variables are accessed using the `synthetics.attributes` prefix.

Select your test type to view the available template variables:

{{< whatsnext desc=" " >}}
    {{< nextlink href="synthetics/notifications/template_variables/browser/" >}}Browser test template variables{{< /nextlink >}}
    {{< nextlink href="synthetics/notifications/template_variables/mobile/" >}}Mobile test template variables{{< /nextlink >}}
    {{< nextlink href="synthetics/notifications/template_variables/multistep/" >}}Multistep API test template variables{{< /nextlink >}}
    {{< nextlink href="synthetics/notifications/template_variables/api/" >}}API test template variables{{< /nextlink >}}
{{< /whatsnext >}}
