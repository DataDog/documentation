---
title: Synthetic Monitoring Template Variables
aliases:
  - /synthetics/guide/synthetic-test-monitors/
further_reading:
- link: "/monitors/manage/"
  tag: "Documentation"
  text: "Learn how to manage monitors"
- link: "/monitors/templates/"
  tag: "Documentation"
  text: "Learn more about monitor templates"
---

## Overview

Template variables allow you to insert dynamic values from your test results and configuration into Synthetic Monitoring notification messages. 

These variables are accessed using the `synthetics.attributes` prefix. 

## Variable reference

{{< whatsnext desc="Select your test type to see available template variables:">}}
  {{< nextlink href="/synthetics/notifications/template_variables/browser_mobile" >}}Browser and Mobile Test Variables{{< /nextlink >}}
  {{< nextlink href="/synthetics/notifications/template_variables/api" >}}API Test Variables{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
