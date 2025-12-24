---
title: Customization
aliases:
- /service_management/case_management/customization/
further_reading:
- link: "service_management/case_management/"
  tag: "Documentation"
  text: "Case Management Overview"
- link: "service_management/case_management/create_case"
  tag: "Documentation"
  text: "Create a case"
- link: "service_management/case_management/settings"
  tag: "Documentation"
  text: "Settings"
---

## Overview

Datadog Case Management allows customization to align with your team's unique workflows, data capture needs, and reporting requirements.

## Custom Case Types

<div class="alert alert-danger">
  You must have Case Shared Settings Write (<code>cases_shared_settings_write</code>) permissions. For more information, see
  <a href="https://docs.datadoghq.com/account_management/rbac/permissions/#case_management">Datadog Role Permissions</a>.
</div>

Datadog provides five [built-in case types][1], each designed for common workflows. To customize Case Management for your team's needs, you can define your own custom case types. This allows you to:

* Scope custom data capture to relevant work types
* Enable targeted automation
* Conduct more granular analytics and reporting

##### Create a custom case type

1. Navigate to [**Settings > Shared Settings > Case Types**][2].
2. Click **+ Create Case Type**.
3. Provide a **Name** and an optional **Description**.
4. Save your new case type.
5. (Optional) See the [custom attributes section](#custom-attributes) of this page to add custom attributes.

##### Enable a custom case type

After you create a custom case type, you must explicitly assign it to each project where it should be available. Follow the steps below to enable your new case type within a specific Case Management project.

1. Back on the [**Settings** page][2], locate the target project under either **Starred Projects** or **Other Projects**.
2. Expand the project menu by clicking on the project name.
3. Click **General** to open the project's settings panel.
4. Scroll down to the Case Types section in the settings panel.
5. Under **From your organization**, open the dropdown and select the custom case type you created.

{{< img src="/service_management/case_management/customization/enable_custom_attribute.png" alt="Enable a custom case type in project settings" style="width:100%;" >}}

After you add the case type, it is available as an option when you create a new case within that project.

Your new case type is available for:

* Manual case creation
* API-based creation
* Automated case creation through Workflows

## Custom attributes

Custom attributes allow you to capture the structured data your team needs to work efficiently and report effectively. All case types, whether Datadog-provided or custom, include five reserved attributes that cannot be removed or modified:

* Teams
* Services
* Environments
* Datacenters
* Versions

{{< img src="/service_management/case_management/customization/add_custom_attribute.png" alt="Add a custom attribute to a case type" style="width:100%;" >}}

You can add attributes that reflect your team's specific needs, such as escalation levels, component owners, business impact, or external links. To add a custom attribute:

1. Navigate to [**Settings > Shared Settings > Case Types**][2].
2. Click the desired case type.
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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/case_management/create_case#case-types
[2]: https://app.datadoghq.com/cases/settings?type=shared
