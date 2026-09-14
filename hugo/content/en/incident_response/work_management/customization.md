---
title: Customization
description: "Customize Datadog Work Management with custom work types, attributes, and statuses"
aliases:
- /service_management/case_management/customization/
- /incident_response/case_management/customization/
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-risk-management"
  tag: "Blog"
  text: "How we centralize and remediate risks with Datadog Case Management"
- link: "/incident_response/work_management/"
  tag: "Documentation"
  text: "Work Management Overview"
- link: "/incident_response/work_management/create_work_item"
  tag: "Documentation"
  text: "Create a work item"
- link: "/incident_response/work_management/settings"
  tag: "Documentation"
  text: "Settings"
---

## Overview

Datadog Work Management allows customization to align with your team's unique workflows, data capture needs, and reporting requirements.

## Custom work types

<div class="alert alert-danger">
  You must have Case Shared Settings Write (<code>cases_shared_settings_write</code>) permissions. For more information, see
  <a href="https://docs.datadoghq.com/account_management/rbac/permissions/#case_management">Datadog Role Permissions</a>.
</div>

Datadog provides five [built-in work types][1], each designed for common workflows. To customize Work Management for your team's needs, you can define your own custom work types. This allows you to:

* Scope custom data capture to relevant work types
* Enable targeted automation
* Conduct more granular analytics and reporting

### Create a custom work type

1. Navigate to [**Settings > Shared Settings > Work Types**][2].
2. Click **+ Create Work Type**.
3. Provide a **Name** and an optional **Description**.
4. Save your new work type.
5. (Optional) See the [custom attributes section](#custom-attributes) of this page to add custom attributes.

### Enable a custom work type

After you create a custom work type, you must explicitly assign it to each project where it should be available. Follow the steps below to enable your new work type within a specific Work Management project.

1. Back on the [**Settings** page][2], locate the target project under either **Starred Projects** or **Other Projects**.
2. Expand the project menu by clicking on the project name.
3. Click **General** to open the project's settings panel.
4. Scroll down to the **Work Types** section in the settings panel.
5. Under **From your organization**, open the dropdown and select the custom work type you created.

After you add the work type, it is available as an option when you create a new work item within that project.

Your new work type is available for:

* Manual work item creation
* API-based creation
* Automated work item creation through Workflows

## Custom attributes

Custom attributes allow you to capture the structured data your team needs to work efficiently and report effectively. All work types, whether Datadog-provided or custom, include five reserved attributes that cannot be removed or modified:

* Teams
* Services
* Environments
* Datacenters
* Versions

You can add attributes that reflect your team's specific needs, such as escalation levels, component owners, business impact, or external links. To add a custom attribute:

1. Navigate to [**Settings > Shared Settings > Work Types**][2].
2. Click the desired work type.
3. Click **+ Add Attribute**.
4. Provide:
   * Display Name (such as "Region")
   * Key (used for programmatic access and reporting)
   * Description (optional context for your team)
   * Data Type, choose from:
     * Text
     * URL
     * Number
   * Choose whether to allow multiple values for this attribute.

## Custom statuses

Work Management supports customizable work item statuses. By default, work items move through Open, In Progress, and Closed. You can add additional statuses to represent reviews, handoffs, or other workflow steps. Custom statuses let you standardize work item workflows and align status options with your team's processes to support reporting and automation.

### Understanding custom statuses behavior
* Each status group (Open, In Progress, Closed) must contain at least one status.
* You can delete an existing status, but you must first migrate any work items currently using that status to another status in the same group.
* Custom statuses behave exactly the same as Datadog's built-in statuses.

### Create a custom status

1. Navigate to [**Settings > Shared Settings > Work Types**][2].
2. Select the work type you want to update.
3. Scroll to the **Statuses** section.
4. Add a new status under one of the three existing status groups: **Open, In Progress,** or **Closed**.
5. (Optional) Set a new **default status** for each status group. Default statuses are used in automations as the preferred statuses for the group when exact status names are not provided.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /incident_response/work_management/create_work_item#work-types
[2]: https://app.datadoghq.com/work/settings?type=shared
