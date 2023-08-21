---
title: Powerpack Widget
kind: Documentation
disable_toc: false
further_reading:
- link: "/dashboards/guide/powerpacks-best-practices/"
  tag: "Guide"
  text: "Scale Graphing Expertise with Powerpacks"
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
---

## Overview

<div class="alert alert-info">Powerpack widgets are not supported on screenboards.</div>

Powerpacks allow you to templatize a group of widgets as a reusable dashboard building block to scale graphing expertise in your org.Powerpacks are either preset (created by Datadog, available to all customers) or custom (created by a user, available only within their organization). For more information on Powerpack best practices, see the [Scale Graphing expertise with Powerpacks][1] guide.

## Setup

### Creating a Powerpack

Create a Powerpack from an existing group on a dashboard: 
1. From the group's header, click the "Save as Powerpack" icon. 
1. Fill out details to make this powerpack discoverable to your organization. 
1. Add tags under "Add Search Categories" to organize your Powerpacks. This allows team members to find the correct Powerpack to add to their dashboard.
1. Choose which filters should be configurable for the users of this powerpack. 

**Note**: After creating a Powerpack, the original group will be replaced with an instance of the Powerpack.

### Updating a Powerpack

Changes to a Powerpack sync across all dashboards where your Powerpack is used.

To make changes to the look or layout of a Powerpack:
1. Hover over the header and click the kebab menu.
1. Select **Edit Powerpack Layout** from the Powerpack Actions menu.
1. Make any desired changes to the Powerpack layout or any individual widget and select **Confirm Changes** in the header.
1. Verify the instances of the Powerpack that are updated on other dashboards.

To make changes to the Powerpack Details:
1. Hover over the header and click the kebab menu.
1. Select **Edit Powerpack Details** from the Powerpack Actions menu.
1. Make changes to the Powerpack info, the search categories, or filter configuration and select **Update Powerpack**.

**Note**: You must have [edit permissions](#powerpack-permissions) to make any updates to the Powerpack or to modify the permissions.

## Using Powerpacks

### Add a Powerpack instance
After you create a Powerpack, you can add an instance of that Powerpack to multiple dashboards.

To add a powerpack instance to the dashboard:
1. Click the "Powerpacks" tab of the widget tray to find available powerpacks. You can search with text as well as the predefined tags. 
1. Click the desired Powerpack to add to your dashboard.
1. Customize the display of the powerpack instance with the *Header Style* selection. 
1. Select filter values and how the filters are controlled.
    * Powerpack filters - the selected value applies to widgets inside the powerpack instance.
    * Dashboard filters - is controlled by dashboard template variables.

### Customizing a Powerpack instance
Changes to a powerpack instance do not apply to other powerpack instances in other dashboards. 

To customize how Powerpack instances are displayed on your dashboard:
1.Hover over the header and click the kebab menu.
1. Select **Edit Display Options** from the Instance Actions menu.
1. Choose new styling options for the header, update the group title, or configure the filters used by your powerpack.
1. Configure the tag values of your powerpack instance. For example, if the Powerpack is configured with `env:*`, in your powerpack instance, you can specify the value with `env:prod`. Additionally, if you check Add to dashboard, you can use this as a dashboard template variable.

## Powerpack permissions

To make changes to the edit permissions for a Powerpack:
1. Hover over the header and click the kebab menu.
1. Select **Modify Permissions** from the Powerpack Actions menu.
1. Update which users have edit permissions for the Powerpack.

## API

This widget can be used with the **Dashboards API**. See the [Dashboards API documentation][2] for additional reference.

The dedicated [widget JSON schema definition][3] for the widget is:

{{< dashboards-widgets-api >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/guide/powerpacks-best-practices/
[2]: /api/latest/dashboards/
[3]: /dashboards/graphing_json/widget_json/