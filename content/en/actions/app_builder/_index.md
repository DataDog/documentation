---
title: App Builder
description: Low-code platform for building internal tools with drag-and-drop interface, JavaScript support, and integration with external services.
disable_toc: false
aliases:
    - /developers/datadog_apps/
    - /developers/ui_extensions/
    - /developers/faq/ui_extensions
    - /service_management/app_builder/
further_reading:
- link: "/actions/actions_catalog/"
  tag: "Documentation"
  text: "Action Catalog"
- link: "https://www.datadoghq.com/blog/datadog-app-builder-low-code-internal-tools/"
  tag: "Blog"
  text: "Build custom monitoring and remediation tools with the Datadog App Builder"
- link: "https://www.datadoghq.com/blog/app-builder-remediation/"
  tag: "Blog"
  text: "Remediate apps built using Datadog App Builder"
- link: "https://www.datadoghq.com/blog/ai-assistant-workflows-apps/"
  tag: "Blog"
  text: "Build Datadog workflows and apps in minutes with our AI assistant"
- link: "https://www.datadoghq.com/blog/pm-app-automation/"
  tag: "Blog"
  text: "How we created a single app to automate repetitive tasks with Datadog Workflow Automation, Datastore, and App Builder"
- link: "https://learn.datadoghq.com/courses/getting-started-app-builder/"
  tag: "Learning Center"
  text: "Getting Started with App Builder"
---

Datadog App Builder is a low-code application building platform. It streamlines the development of your internal tools with a user-friendly drag-and-drop interface and built-in support for JavaScript. App Builder integrates with popular services such as AWS and GitHub, allowing you to leverage data and seamlessly connect with external APIs and data stores. By integrating with Datadog's existing capabilities, App Builder provides a centralized context that enables you to take preventive actions or respond to ongoing incidents, all from within the same view that you use for troubleshooting.

{{< img src="/service_management/app_builder/app-builder-app.png" alt="An app in App Builder" style="width:100%;" >}}

## Configure App Builder actions

Datadog App Builder provides an [Action Catalog][1] of hundreds of actions across multiple integrations. The Action Catalog and the connection credentials for each integration are shared with [Datadog Workflow Automation][2]. If there isn't an integration that accomplishes your task, you can use generic actions such as the HTTP requests and JavaScript functions to perform any task that your app requires.

{{< img src="/service_management/app_builder/app-builder-action-catalog.png" alt="Datadog App Builder provides an Action Catalog of hundreds of actions across multiple integrations." style="width:100%;" >}}

## Start with blueprints

Datadog provides you with preconfigured flows in the form of out-of-the-box [blueprints][3] to help you [get started][5].

Below are a few examples of what App Builder apps can do:
- Identify the most likely causes of a regression given a text description of an incident and the most recent 150 commits to a repo.
- Monitor your PagerDuty service status to get complete context while working on incidents.
- Allow users to manage their EC2 instances directly from a dashboard.
- Allow users to explore and view the content of an S3 bucket.
- Use a PagerDuty integration to see who is on-call for each team in an organization.
- Summarize the progress of each PR in a given repo.

{{< img src="/service_management/app_builder/app-builder-blueprints-2.png" alt="App blueprints" style="width:100%;" >}}

## Take action directly from dashboards

You can use your apps from the Apps page or [access them directly from within your dashboards][6]. Datadog Apps function as native dashboard integrations, allowing you to customize and take action on your data straight from your Dashboard.

{{< img src="/service_management/app_builder/app-builder-embedded-dashboard.png" alt="An app embedded in a dashboard" style="width:100%;" >}}

### Apps created by Datadog

Apps created by Datadog are apps that are embedded in Integration dashboards. They work without having to build them; all you need to do is choose a connection.

For example, the [EC2 integration dashboard][7] offers an EC2 instance management app. When you load the dashboard, the app is populated with demo data:

{{< img src="/service_management/app_builder/ootb-app-ec2-demo-data.png" alt="EC2 app created by Datadog, populated with demo data" style="width:100%;" >}}

To use the app with your data, click **+ Connect Data**, then either create a new connection or select an existing one. After you save your selection, the app displays data from your connection.

You can change the selected connection by clicking **Change Connection** in the app.

## App Builder Overview dashboard

The App Builder Overview dashboard provides a high-level overview of your Datadog apps. To find the dashboard, go to your [Dashboard list][8] and search for `App Builder Overview`.

{{< img src="service_management/app_builder/app-builder-overview-dashboard.png" alt="The App Builder Overview dashboard" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#app-builder** channel on the [Datadog Community Slack][4].

[1]: https://app.datadoghq.com/actions/action-catalog/
[2]: /service_management/workflows/
[3]: https://app.datadoghq.com/app-builder/blueprints
[4]: https://chat.datadoghq.com/
[5]: /service_management/app_builder/build/#build-an-app-from-a-blueprint
[6]: /service_management/app_builder/embedded_apps/#add-apps-to-your-dashboard
[7]: https://app.datadoghq.com/dash/integration/60
[8]: https://app.datadoghq.com/dashboard/lists
[9]: https://app.datadoghq.com/app-builder/apps/list
