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

Template variables allow you to insert dynamic values from your test results and configuration into Synthetic Monitoring notification messages. These variables are accessed using the `synthetics.attributes` prefix. 

## Variable reference

{{< whatsnext desc="Select your test type to see available template variables:">}}
    {{< nextlink href="/synthetics/notifications/template_variables/browser_mobile" >}}Browser and Mobile Test Variables{{< /nextlink >}}
    {{< nextlink href="/synthetics/notifications/template_variables/api" >}}API Test Variables{{< /nextlink >}}
{{< /whatsnext >}}

**Note:** Variable availability depends on the test type. To verify available data, export a test result as JSON from the **Actions** tab in the [Results Explorer][1]. Use this output to confirm the exact paths for your monitor configuration.

{{< img src="synthetics/notifications/action_tab.png" alt="Actions tab from the Synthetics Result Explorer with Export Result JSON highlighted" style="width:90%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/explore/results_explorer

