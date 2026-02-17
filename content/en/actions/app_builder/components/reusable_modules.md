---
title: Reusable Modules
description: Save and reuse groups of components and queries across multiple App Builder applications as modular templates.
disable_toc: false
further_reading:
- link: "/service_management/app_builder/components/"
  tag: "Documentation"
  text: "Components"
- link: "/service_management/app_builder/build/"
  tag: "Documentation"
  text: "Build Apps"
- link: "/service_management/app_builder/queries/"
  tag: "Documentation"
  text: "Queries"
---

Use the _Reusable Modules_ feature to save groups of components and queries as templates for reuse across your App Builder applications. Modules automatically include all dependencies to ensure your components function correctly.

<div class="alert alert-info">Default modules are read-only. To modify a default module, duplicate it first.</div>

## Create a reusable module

There are three ways to create a reusable module:

### From the components panel
1. While editing an app, click the expand icon (<i class="icon-expand-to-left-wui" style="position:relative; top:4px;"></i>) to open the components panel.
2. Click a component to select it.
3. In the components panel, click the menu icon (<i class="icon-config-1" style="position:relative; top:4px;"></i>).
4. Click Create Module ({{< img src="service_management/app_builder/reusable-module-icon.svg" inline="true">}}).
5. [Configure your module][3].

### From a component's instance name tab
1. While editing an app, select a component on the app canvas.
2. Click the Create Module icon ({{< img src="service_management/app_builder/reusable-module-icon.svg" inline="true">}}) in the component instance name tab.
3. [Configure your module][3].

### From selected components
1. While editing an app, hold down the Shift key and click multiple components to select them.
2. In the side panel that appears on the right, click Create Module ({{< img src="service_management/app_builder/reusable-module-icon.svg" inline="true">}}).

## Configure a module

When creating your module, the module editor allows you to preview the components and queries, add a name and description, and review dependencies before saving.

{{< img src="service_management/app_builder/app-builder-reusable-module-preview.png" alt="Module editor showing preview of components and queries with name and description fields" style="width:100%;">}}

1. Enter a name and description.
2. Review the components and queries that are automatically included. The system includes all nested query dependencies.
3. Click Save Module.

## Add a reusable module to an app
1. While editing an app, click the Add Component icon (<i class="icon-component-wui" style="position:relative; top:4px;"></i>).
2. In the Modules section, click a module or drag it onto the app canvas.


## Delete a module
1. While editing an app, click the Add Component icon (<i class="icon-component-wui" style="position:relative; top:4px;"></i>).
2. In the Modules section, click the edit icon ({{< img src="icons/pencil.png" inline="true" style="width:14px;">}}) for the module you want to delete.
3. In the module editor, click Delete Module.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#app-builder** channel on the [Datadog Community Slack][2].

[1]: https://app.datadoghq.com/app-builder/apps/list
[2]: https://chat.datadoghq.com/
[3]: /actions/app_builder/components/reusable_modules/#configure-a-module
