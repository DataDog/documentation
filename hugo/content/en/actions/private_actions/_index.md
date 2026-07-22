---
title: Private Actions
description: Allow workflows and apps to interact with private network services using private action runners with secure authentication.
aliases:
- service_management/workflows/private_actions/
- service_management/app_builder/private_actions/
further_reading:
- link: "actions/connections"
  tag: "Documentation"
  text: "App Builder Connections"
- link: "actions/connections"
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

## Overview

Private actions allow you to run actions against services hosted on your private network without exposing them to the public internet. Datadog products that use private actions include Workflow Automation, App Builder, Datadog MCP, and Bits AI investigations.

Private actions rely on two layers:

- The **authorization layer** is managed in Datadog. It defines which users and products can run which actions on which runners, and grants or denies each action before it reaches a runner. The actions a runner is allowed to run are also restricted on the Agent side, by the actions allowlist in the Agent configuration (`datadog.yaml`).
- The **execution layer** is the private action runner. It runs in your network, receives action tasks from Datadog, runs each task against the target service, and returns the result to Datadog.

## Private action runner

The private action runner is the component you deploy in your environment to run private actions. It opens an outbound connection to Datadog, continuously polls for action tasks, runs each task against your internal service, and reports the result back to Datadog.

<!-- {{< img src="actions/private_actions/private_action_runner_-_diagram_workflow.png" alt="Overview diagram illustrating how Private actions work" style="width:90%;" >}} -->

The private action runner is available in two forms: a standalone runner that you deploy and manage yourself and a runner built into the Datadog Agent.


| | Runner in the Datadog Agent | Standalone runner |
|---|---|---|
| **What it is** | A component of the Datadog Agent, turned on with a single configuration flag. | A dedicated binary you can install and manage independently of the Datadog Agent. |
| **Best when** | You already run the Datadog Agent and want to manage the runner through the Agent lifecycle. | You need an integration that is not yet available in the Agent. |
| **Status** | Recommended for new deployments. | Supported (maintenance mode). |

<div class="alert alert-tip">The recommended path for most users is to run the private action runner in the Datadog Agent.</div>

## Authorization

Private actions are authorized through either Connections or Execution Groups, depending on the runner type and the level of access control you need. The authorization model a runner uses is determined when the runner is enrolled and is based on the runner's ownership. Datadog offers two authorization models:

- **Connections** are available for both the standalone runner and the runner in the Agent. They can be attached to only one runner. A connection can store credentials for a service.
- **Execution Groups** apply to runners in the Datadog Agent and are built for managing access at scale. Instead of creating a separate connection for each integration on each runner, you use Agent tags to target many runners at once. Execution Groups also give you fine-grained control: you can allow or deny specific actions or sets of actions, and apply integration-specific scopes, such as the target Kubernetes namespaces for a Kubernetes action.

<!-- ## Monitor your Private Action Runners with Datadog Metrics

While setting up your Private Action Runners, you can enable observability metrics to monitor your runners' health and private action usage. These metrics can be used in Datadog products like Dashboards and Monitors. To get started quickly, you can use the provided [out-of-the-box Dashboard][5]. -->

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
