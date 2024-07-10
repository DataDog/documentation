---
title: Powerpack Widget
disable_toc: false
further_reading:
- link: "/dashboards/guide/powerpacks-best-practices/"
  tag: "Guide"
  text: "Scale Graphing Expertise with Powerpacks"
- link: "https://www.datadoghq.com/blog/standardize-dashboards-powerpacks-datadog/"
  tag: "Blog"
  text: "Save dashboard widgets in reusable groups with Powerpacks"
- link: "/dashboards/widgets/group/"
  tag: "Documentation"
  text: Group Widget
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
---

## Overview

<div class="alert alert-info">Powerpack widgets are not supported on screenboards.</div>

Powerpacks are templated groups of widgets that scale graphing expertise as reusable dashboard building blocks. Powerpacks are either preset (created by Datadog, available to all customers) or custom (created by a user, and only available within their organization). For more information on Powerpack best practices, see the [Scale Graphing expertise with Powerpacks][1] guide.

## Setup

### Creating a Powerpack

Create a Powerpack from an existing group on a dashboard: 

{{< img src="dashboards/widgets/powerpack/group_header_icons.png" alt="Dashboard group header icons highting the Save as Powerpack icon option" style="width:80%;" >}}

1. From a dashboard group's header, click the "Save as Powerpack" icon. 
1. Fill out details to make the Powerpack discoverable to your organization. 
1. Add tags under "Add Search Categories" to organize your Powerpacks. This allows team members to find the correct Powerpack to add to their dashboard.
1. Choose which filters should be configurable for the users of the Powerpack. 

**Note**: After creating a Powerpack, the original group is replaced with an instance of the Powerpack.

### Updating a Powerpack

Changes to a Powerpack sync across all dashboards where your Powerpack is used.

To make changes to the look or layout of a Powerpack:
1. Hover over the header and click the kebab menu.
1. Select **Edit Powerpack Layout** from the Powerpack Actions menu.
1. Make any desired changes to the Powerpack layout or any individual widget and select **Confirm Changes**.
1. If this Powerpack is used in multiple dashboards, a prompt opens up to verify the instances of the Powerpack that are affected by this update.

{{< img src="dashboards/widgets/powerpack/powerpack_actions_menu.png" alt="Action menu options to update a Powerpack and the Powerpack instance accessed through kebab on Powerpack header" style="width:80%;" >}}

To make changes to the Powerpack Details:
1. Hover over the header and click the kebab menu.
1. Select **Edit Powerpack Details** from the Powerpack Actions menu.
1. Make changes to the Powerpack info, the search categories, or filter configuration and select **Update Powerpack**.
1. If this Powerpack is used in multiple dashboards, a prompt opens to verify the instances of the Powerpack that are affected by this update.

**Note**: You must have [edit permissions](#powerpack-permissions) to make any updates to the Powerpack or to modify the permissions.

## Using Powerpacks

### Add a Powerpack instance
After you create a Powerpack, you can add an instance of that Powerpack to multiple dashboards.

To add a Powerpack instance to the dashboard:
1. Click the "Powerpacks" tab of the widget tray to find available Powerpacks. You can search with text as well as the predefined tags. 
1. Click the desired Powerpack to add to your dashboard to open the configuration for the Powerpack instance.
1. Select filter values and how the filters are controlled.
    * Powerpack filters - the selected value applies to widgets inside the Powerpack instance.
    * Dashboard filters - controlled by dashboard template variables.
1. Click **Confirm**. 

### Customizing a Powerpack instance

Changes to a Powerpack instance **do not** apply to other Powerpack instances in other dashboards. 

To customize Powerpack instances displayed on your dashboard:
1. Click the kebab menu on the instance header.
1. Select **Edit Display Options** from the Instance Actions menu.
1. Choose new styling options for the header, update the group title, or configure the filters used by your Powerpack.
1. Configure the tag values of your Powerpack instance. Check **Add to dashboard**, to use this as a dashboard template variable.

{{< img src="dashboards/widgets/powerpack/instance_configuration_modal.png" alt="Configuration options for a Powerpack instance" style="width:100%;" >}}

## Powerpack permissions

To make changes to the edit permissions for a Powerpack:
1. Hover over the header and click the kebab menu.
1. Select **Modify Permissions** from the Powerpack Actions menu.
1. Update which users have edit permissions for the Powerpack.

## API

This widget can be used with the **[Dashboards API][2]**. See the following table for the [widget JSON schema definition][3]:

{{< dashboards-widgets-api >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/guide/powerpacks-best-practices/
[2]: /api/latest/dashboards/
[3]: /dashboards/graphing_json/widget_json/
