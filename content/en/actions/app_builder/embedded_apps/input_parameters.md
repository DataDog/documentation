---
title: Input Parameters
description: Input parameters reduces maintenance overhead by managing one app that can use the same logic in different contexts.
disable_toc: false
---

Input parameters allow you to embed the same app in multiple dashboards or notebooks using different configurations for each instance. 

## Example dashboard

A common use case for input parameters is an app that's used on separate dashboards for dev, staging, and production. In the screenshot below, one app was created then embedded twice in a dashboard. The app on the left shows monitors in the demo environment while the app on the right shows the same information for monitors in the staging environment. 

{{< img src="/service_management/app_builder/embedded_apps/example-input-parameters-dashboard.png" alt="Two embedded apps with different input parameters selected" style="width:100%;" >}}

## Create an input parameter 

1. In [App Builder][1], select an app and click **Edit**. 
1. Click the **App Properties** icon ({{< img src="service_management/app_builder/embedded_apps/app_properties_icon.png" inline="true" width="12px" style="position:relative; bottom:1px;">}}).
1. Click the plus icon (<i class="icon-plus-2" style="position:relative; top:2px;font-size: 12px; max-width: 12px"></i>) to add an input parameter. 
1. Click the new input parameter to configure its elements: 
    - Parameter Name
    - Display Name (Optional) 
    - Data Type
    - Allowed Values
    - Default Value
    - Description (Optional) 
1. Click **Save**.

### Example input parameter 

This example input parameter was configured to show the same app in various staging environments:

{{< img src="/service_management/app_builder/embedded_apps/example-input-parameters-configuration.png" alt="An example of configured input parameters inside an app" style="width:35%;" >}}

## Use input parameters 

<div class="alert alert-info">Apps with input parameters work best in dashboards and notebooks. While you can add an app to Self-Service Actions, you can't select the input parameters you've configured. 
</div>

To embed an app with input parameters:

1. In [App Builder][1], select an app with a configured input parameter(s).
1. Click **Add to a dashboard**. 
1. Select a dashboard, then click **Save and Open**.
1. In your dashboard, hover over the app and click the **Edit** icon ({{< img src="icons/pencil.png" inline="true" style="width:14px;">}}).
1. In the **Input Parameters** section, select an input parameter:
{{< img src="/service_management/app_builder/embedded_apps/example-input-params-configuring-in-dashboard.png" alt="An example of an app in editing mode with Input Parameters circled" style="width:80%;" >}}
1. Click **Save**.
1. Duplicate the app with copy + paste keyboard shortcuts, or clone it. 
1. Follow the steps above to select a different input parameter.

[1]: https://app.datadoghq.com/app-builder/apps/list