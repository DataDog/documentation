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

**Note:** Not all variables are available for every test type. You may need to test different outputs to verify the data returned. You can export the result as a JSON file from the **Actions** tab of a test run in the [Results Explorer][1], then reference the path directly within your monitor configuration. 

{{< img src="synthetics/notifications/action_tab.png" alt="Actions tab from the Synthetics Result Explorer with Export Result JSON highlighted" style="width:90%;" >}}

## Available variables

### Test execution variables

{{< partial name="synthetics/template-variables-execution.html" >}}

### Result variables

{{< partial name="synthetics/template-variables-result.html" >}}

### Variables extracted by steps

{{< partial name="synthetics/template-variables-steps.html" >}}

### Step summary

{{< partial name="synthetics/template-variables-summary.html" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/explore/results_explorer
