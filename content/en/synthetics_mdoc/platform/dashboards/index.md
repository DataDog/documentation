---
title: Synthetic Dashboards
description: >-
  Explore out-of-the-box Synthetic dashboards to learn more about your Synthetic
  tests.
breadcrumbs: Docs > Synthetic Testing and Monitoring > Platform > Synthetic Dashboards
sourceUrl: https://docs.datadoghq.com/synthetics/platform/dashboards/index.html
---

# Synthetic Dashboards

## Overview{% #overview %}

When you create a Synthetic test, Datadog [collects data](https://docs.datadoghq.com/synthetics/metrics/) and generates dashboards about your stack, browser applications, or overall tests' performance, private locations, and events.

Access your Synthetic Monitoring dashboards by filtering for `Synthetic Monitoring` in the search query of the [**Dashboard List**](https://app.datadoghq.com/dashboard/lists) or by clicking on the dropdown menu under [**Dashboards**](https://app.datadoghq.com/synthetics/tests/) on the [Synthetic Monitoring & Continuous Testing page](https://app.datadoghq.com/synthetics/tests).

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/dashboards/dashboards_homepage_blurred.1099fd5a659c70aae611b14aef98547d.png?auto=format"
   alt="Synthetic Monitoring Dashboards on the Synthetic Monitoring & Continuous Testing homepage" /%}

- [API Test Performance: Monitor your endpoints and services.](https://docs.datadoghq.com/synthetics/dashboards/api_test)
- [Browser Test Performance: View your browser tests' web performance, insights into third-party providers, and Core Web Vitals.](https://docs.datadoghq.com/synthetics/dashboards/browser_test)
- [Test Overview: See insights about your Synthetic Monitoring tests by region, environment, or team.](https://docs.datadoghq.com/synthetics/dashboards/test_summary)

## Customize your Synthetic dashboards{% #customize-your-synthetic-dashboards %}

You can clone [dashboards](https://docs.datadoghq.com/dashboards/) and customize them by team, environment, or region using template variables. You can also customize your view and create a [saved view](https://docs.datadoghq.com/continuous_testing/explorer/saved_views/) of your cloned dashboard.

### Edit template variables{% #edit-template-variables %}

The generated Synthetic dashboards automatically contain a set of default template variables. Use the template variable dropdown menus to narrow the data shown in the dashboard. For example, you can filter for a specific browser type with the `Browser` template variable. For more information, see the [Template Variables](https://docs.datadoghq.com/dashboards/template_variables/) documentation. To clone your Synthetic dashboard, click the **Clone** button next to the **Configure** icon.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/dashboards/clone.b7a7cd2a98d63b062f9c894dc130c4c5.png?auto=format"
   alt="Clone a dashboard" /%}

The Synthetic dashboard has a default view which you can adjust. Click the **Edit** icon to enter edit mode and customize your template variables.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/dashboards/synthetics_template_variable_edit.0b068e092f712f02033937bd092c3265.png?auto=format"
   alt="Edit template variables in a Synthetic dashboard" /%}

### Create a saved view{% #create-a-saved-view %}

Once you are done editing, click **Done** and select **Save selections as view** from the left hand dropdown menu.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/dashboards/saved_view.8b1d9e1b9ffb072156f5baa4e4e83926.png?auto=format"
   alt="Create a saved view in a Synthetic dashboard" /%}

Enter a name for your saved view and click **Save**.

## Further Reading{% #further-reading %}

- [Learn about Synthetic Monitoring](https://docs.datadoghq.com/synthetics/)
- [Learn about the Synthetic Monitoring & Testing Results Explorer](https://docs.datadoghq.com/continuous_testing/explorer/)
- [Learn about Saved Views](https://docs.datadoghq.com/continuous_testing/explorer/saved_views)
