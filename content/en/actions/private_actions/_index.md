---
title: Private Actions Overview
description: Allow workflows and apps to interact with private network services using private action runners with secure authentication.
disable_toc: false
aliases:
- service_management/workflows/private_actions/
- service_management/app_builder/private_actions/
further_reading:
- link: "service_management/app_builder/connections"
  tag: "Documentation"
  text: "App Builder Connections"
- link: "service_management/workflows/connections"
  tag: "Documentation"
  text: "Workflow Connections"
- link: "actions/private_actions/use_private_actions"
  tag: "Documentation"
  text: "Use Private Actions"
- link: "actions/private_actions/run_script"
  tag: "Documentation"
  text: "Run a Script with the Private Action Runner"
- link: "actions/private_actions/private_action_credentials"
  tag: "Documentation"
  text: "Handling Private Action Credentials"
- link: "https://www.datadoghq.com/blog/private-actions/"
  tag: "Blog"
  text: "Remediate Kubernetes incidents faster using private actions in your apps and workflows"
- link: "https://www.datadoghq.com/blog/pm-app-automation/"
  tag: "Blog"
  text: "How we created a single app to automate repetitive tasks with Datadog Workflow Automation, Datastore, and App Builder"
---

Private actions allow your Datadog workflows and apps to interact with services hosted on your private network without exposing them to the public internet. To use private actions, you must install a private action runner on a host in your network and pair the runner with a [connection][1].

The recommended way to install a private action runner is through the [Datadog Agent][2] (version `7.77.0` or later). This method supports Linux, Windows, and Kubernetes environments. Alternatively, you can install the runner as a standalone Docker container or [Kubernetes][3] deployment. See [Use Private Actions][4] for installation instructions.

<div class="alert alert-danger">To install a private action runner, your organization must have <a href="/remote_configuration">Remote Configuration</a> enabled.</div>

When you first start the runner, it generates a private key for authentication with Datadog's servers. This private key is never accessible by Datadog and ensures you exclusive access. Datadog uses a public key derived from the private key as the means to authenticate specific runners.

## How it works

The private action runner continuously polls for tasks from your Datadog account, executes them by interacting with your internal service, and reports the result back to Datadog.

{{< img src="service_management/private_action_runner_-_diagram_workflow.png" alt="Overview diagram illustrating how Private actions work" style="width:90%;" >}}

## Monitor your Private Action Runners with Datadog Metrics

While setting up your Private Action Runners, you can enable observability metrics to monitor your runners' health and private action usage. These metrics can be used in Datadog products like Dashboards and Monitors. To get started quickly, you can use the provided [out-of-the-box Dashboard][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/workflows/connections/
[2]: /agent/
[3]: https://github.com/DataDog/helm-charts/tree/main/charts/private-action-runner
[4]: /actions/private_actions/use_private_actions
[5]: https://app.datadoghq.com/dash/integration/private_actions_runner
