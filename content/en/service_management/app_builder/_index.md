---
title: App Builder
kind: documentation
disable_toc: false
further_reading:
- link: "/service_management/workflows/actions_catalog/"
  tag: "Documentation"
  text: "Actions Catalog"
---

Datadog App Builder is a low-code application building platform that streamlines the development of your internal tools with a user-friendly drag-and-drop interface and built-in support for JavaScript. App Builder makes use of over 400 integrations with popular services such as AWS and GitHub, allowing you to leverage data and seamlessly connect with external APIs and data stores. By integrating with Datadog's existing capabilities, App Builder provides a centralized context, empowering you to take preventive actions or respond to ongoing incidents, all within the same view you use for troubleshooting.

{{< img src="/service_management/app_builder/app_builder.png" alt="An app in the app builder" style="width:100%;" >}}

## Configure App Builder actions

Datadog App Builder provides over 400+ actions across several integrations, along with generic actions such as an HTTP request action and JavaScript data operator. These actions allow you to perform any task required in your flow.

## Start with blueprints

Datadog provides you with preconfigured flows in the form of out of the box [blueprints][2] to help you get started.

## Take action directly from dashboards

Use your apps from the Apps page, or access them independently from dashboards. Datadog Apps function as native dashboard integrations, allowing you to customize and take action on your data straight from your Dashboard.

## Examples

Below are a few examples of apps you can build:
- Identify the most likely causes of a regression given a text description of an incident and the most recent 150 commits to a repo.
- Monitor your PagerDuty service status to get complete context while working on incidents.
- Allow users to manage their EC2 instances directly from a dashboard.
- Allow users to explore and view the content of an S3 bucket.
- Use a PagerDuty integration to see who is on-call for each team in an org.
- Summarize the progress of each PR in a given repo.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/workflows/actions_catalog/
[2]: https://app.datadoghq.com/app-builder/blueprints