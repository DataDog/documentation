---
title: App Builder
kind: documentation
disable_toc: false
further_reading:
- link: "/service_management/workflows/actions_catalog/"
  tag: "Documentation"
  text: "Actions Catalog"
- link: "https://www.datadoghq.com/blog/datadog-app-builder-low-code-internal-tools/"
  tag: "Blog"
  text: "Build custom monitoring and remediation tools with the Datadog App Builder"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">App Builder is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< callout url="https://www.datadoghq.com/dg/datadog-app-builder/" btn_hidden="false" header="Join the Beta!">}}
Datadog App Builder is in private beta. Complete the form to request access.
{{< /callout >}}

Datadog App Builder is a low-code application building platform. It streamlines the development of your internal tools with a user-friendly drag-and-drop interface and built-in support for JavaScript. App Builder integrates with popular services such as AWS and GitHub, allowing you to leverage data and seamlessly connect with external APIs and data stores. By integrating with Datadog's existing capabilities, App Builder provides a centralized context that enables you to take preventive actions or respond to ongoing incidents, all from within the same view that you use for troubleshooting.

{{< img src="/service_management/app_builder/app-builder.png" alt="An app in App Builder" style="width:100%;" >}}

## Configure App Builder actions

Datadog App Builder provides an [Action Catalog][1] of hundreds of actions across multiple integrations. The Action Catalog and the connection credentials for each integration are shared with [Datadog Workflow Automation][2]. If there isn't an integration that accomplishes your task, you can use generic actions such as the HTTP requests and JavaScript functions to perform any task that your app requires.

{{< img src="/service_management/app_builder/app-builder-actions.png" alt="Datadog App Builder provides an Action Catalog of hundreds of actions across multiple integrations." style="width:100%;" >}}

## Start with blueprints

Datadog provides you with preconfigured flows in the form of out-of-the-box [blueprints][3] to help you [get started][5].

Below are a few examples of what App Builder apps can do:
- Identify the most likely causes of a regression given a text description of an incident and the most recent 150 commits to a repo.
- Monitor your PagerDuty service status to get complete context while working on incidents.
- Allow users to manage their EC2 instances directly from a dashboard.
- Allow users to explore and view the content of an S3 bucket.
- Use a PagerDuty integration to see who is on-call for each team in an organization.
- Summarize the progress of each PR in a given repo.

{{< img src="/service_management/app_builder/app-builder-blueprints-1.png" alt="App blueprints" style="width:100%;" >}}

## Take action directly from dashboards

You can use your apps from the Apps page or [access them directly from within your dashboards][6]. Datadog Apps function as native dashboard integrations, allowing you to customize and take action on your data straight from your Dashboard.

{{< img src="/service_management/app_builder/app-builder-embedded-dashboard.png" alt="An app embedded in a dashboard" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#app-builder** channel on the [Datadog Community Slack][4].

[1]: https://app.datadoghq.com/app-builder/action-catalog
[2]: /service_management/workflows/
[3]: https://app.datadoghq.com/app-builder/blueprints
[4]: https://datadoghq.slack.com/
[5]: /service_management/app_builder/build/#build-an-app-from-a-blueprint
[6]: /service_management/app_builder/embedded_apps/#add-apps-to-your-dashboard
