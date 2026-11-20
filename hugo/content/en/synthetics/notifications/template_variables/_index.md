---
title: Synthetic Monitoring Template Variables
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
    {{< nextlink href="synthetics/notifications/template_variables/browser/" >}}Browser testing template variables{{< /nextlink >}}
    {{< nextlink href="synthetics/notifications/template_variables/mobile/" >}}Mobile App testing template variables{{< /nextlink >}}
    {{< nextlink href="synthetics/notifications/template_variables/multistep/" >}}Multistep API testing template variables{{< /nextlink >}}
    {{< nextlink href="synthetics/notifications/template_variables/api/" >}}API testing template variables{{< /nextlink >}}
{{< /whatsnext >}}
