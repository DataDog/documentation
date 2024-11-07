---
title: Run Workflow Widget
widget_type: run_workflow
disable_toc: false
further_reading:
- link: "/service_management/workflows/"
  tag: "Documentation"
  text: "Workflow Automation"
---

## Overview

The Run Workflow widget allows you to automate critical tasks from dashboards. Trigger your workflows from a dashboard at the point you become aware of an issue affecting the health of your system. This keeps your systems up and running by improving the time to resolution and reducing the possibility of errors.

## Configuration

1. Under **Select the workflow**, find your workflow in the dropdown menu.
1. Map dashboard template variables to workflow input parameters. This allows the values of your dashboard template variables to be mapped directly to the input parameters when you run the workflow.
1. Enter a title for the widget and click **Save**.

{{< img src="service_management/workflows/trigger-from-dashboard2.png" alt="Click Run Workflow to trigger a workflow from Dashboard widget." >}}

To run the workflow:
1. Click **Run Workflow** on your dashboard widget.
1. Under **Execution parameters**, any template variables you mapped to workflow inputs are automatically populated. Enter the values for any unmapped execution parameters, or edit the existing values if needed.
1. Click **Run** to run the workflow.

## API

This widget can be used with the **[Dashboards API][1]**. See the following table for the [widget JSON schema definition][2]:

{{< dashboards-widgets-api >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/dashboards/
[2]: /dashboards/graphing_json/widget_json/