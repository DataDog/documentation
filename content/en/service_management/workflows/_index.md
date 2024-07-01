---
title: Workflow Automation
disable_toc: false
algolia:
  tags: ['workflow', 'workflows', 'workflow automation']
aliases:
- /workflows
further_reading:
- link: "/getting_started/workflow_automation/"
  tag: "Documentation"
  text: "Getting Started with Workflow Automation"
- link: "https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/"
  tag: "Blog"
  text: "Automate end-to-end processes and quickly respond to events with Datadog Workflows"
- link: "https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/"
  tag: "Blog"
  text: "Automate common security tasks and stay ahead of threats with Datadog Workflows and Cloud SIEM"
- link: "https://www.datadoghq.com/blog/azure-workflow-automation/"
  tag: "Blog"
  text: "Quickly remediate issues in your Azure applications with Datadog Workflow Automation"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Workflow Automation is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/852419580/rendition/1080p/file.mp4?loc=external&signature=fb7ae8df018e24c9f90954f62ff3217bc1b904b92e600f3d3eb3f5a9d143213e" poster="/images/poster/workflow_automation.png" >}}

Datadog Workflow Automation allows you to orchestrate and automate your end-to-end processes. Build workflows made up of [actions][1] that connect to your infrastructure and tools. These actions can also perform data and logical operations, allowing you to build complex flows with branches, decisions, and data operations.

## Configure workflow actions

Datadog Workflow Automation provides over 400+ actions across several tools, along with Workflow-specific actions such as the HTTP action and the JavaScript data operator. These actions allow you to perform any task required in your flow.

## Start with blueprints

Datadog provides you with preconfigured flows in the form of out of the box [blueprints][2]. Dozens of blueprints help you build processes around incident management, DevOps, change management, security, and remediation.

## Automate critical tasks

Trigger your workflows from monitors, security signals, or dashboards, or trigger them manually. This flexibility allows you to respond with the appropriate workflow at the point you become aware of an issue affecting the health of your system. Automating critical tasks with Datadog Workflow Automation helps keep your systems up and running by improving the time to resolution and reducing the possibility of errors.

## Workflows Overview dashboard

The Workflows Overview dashboard provides a high-level overview of your Datadog workflows and executions. To find the dashboard, go to your [Dashboard list][3] and search for `Workflows Overview`.

{{< img src="service_management/workflows/workflows-dashboard.png" alt="The Workflows Overview dashboard" style="width:100%;" >}}

## Examples

Below are a few examples of workflows you can build:
- Automate scaling of your AWS Auto Scaling Groups when monitors tracking critical metrics of these Auto Scaling Groups go into the alert state.
- Automatically create investigative notebooks of malicious IPs to be detected by Security Signals, and then block these IPs in CloudFlare with the click of a button.
- Execute workflows to roll back to stable versions of your application directly from the Dashboards you use to track the health of your systems.
- Manage feature flags by automatically updating your feature flag config files in GitHub and automating the pull request and merge process.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#workflows** channel on the [Datadog Community Slack][4].

[1]: /service_management/workflows/actions_catalog/
[2]: /workflows/build/#build-a-workflow-from-a-blueprint
[3]: https://app.datadoghq.com/dashboard/lists
[4]: https://datadoghq.slack.com/