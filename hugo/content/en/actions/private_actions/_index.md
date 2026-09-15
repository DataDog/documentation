---
title: Private Actions
description: Run actions against services in your private network from Datadog products, using a private action runner as the execution and authorization layer for on-premises actions.
disable_toc: false
aliases:
- service_management/workflows/private_actions/
- service_management/app_builder/private_actions/
further_reading:
- link: "actions/private_actions/set_up_agent_based"
  tag: "Documentation"
  text: "Set up a private action runner"
- link: "actions/private_actions/enroll_runner"
  tag: "Documentation"
  text: "Enrollment and ownership"
- link: "/actions/private_actions/authorize_private_actions/"
  tag: "Documentation"
  text: "Authorize Private Actions"
---

## Overview

Private actions allow you to run actions against services in your private network, such as Kubernetes clusters, internal hosts, databases, and internal APIs, without exposing those services to the public internet. You run them through a private action runner that you deploy in your environment, either inside the Datadog Agent (recommended) or as a standalone runner. Datadog products that use private actions include Workflow Automation, App Builder, Datadog MCP, and Bits AI investigations.

Private actions rely on two layers:

- [**Private action runner**](#private-action-runner) executes the actions. It runs in your network, receives action tasks from Datadog, runs each task against the target service, and returns the result to Datadog.
- [**The authorization layer**](#authorization-models) is managed in Datadog. It defines which users and products can run which actions on which runners, and grants or denies each action before it reaches a runner. The actions a runner is allowed to run are also restricted on the Agent side, by the actions allowlist in the Agent configuration (`datadog.yaml`).

## Private action runner

The private action runner is the component you deploy in your environment to run private actions. It opens an outbound connection to Datadog, polls for action tasks, runs each task against the target service, and returns the result.

The private action runner is available in two forms: a standalone runner that you deploy and manage yourself, or a runner built into the Datadog Agent.

| | Runner in the Datadog Agent | Standalone runner |
|---|---|---|
| **What it is** | A component of the Datadog Agent, turned on with a single configuration flag. | A dedicated container you can install and manage independently of the Datadog Agent. |
| **Best when** | You already run the Datadog Agent and want to manage the runner through the Agent life cycle. | You need an integration that is not yet available in the Agent. |
| **Status** | Recommended for new deployments. | Supported (maintenance mode). |

<div class="alert alert-tip">Datadog recommends running the private action runner in the Datadog Agent</div>

For installation steps, see [Set up a private action runner in the Datadog Agent][1] or [Set up a standalone runner][2].

## Authorization models

Datadog offers two authorization models. The model a runner uses is set when the runner is enrolled, and it follows from the runner's ownership. For more information, see [Enrollment and ownership][3].

- **Execution Policies** apply to runners in the Datadog Agent and are built for managing access at scale. Instead of creating a separate connection for each integration on each runner, you use Agent tags to target one or more sets of runners. Execution Policies also give you fine-grained control: you can allow or deny specific actions or sets of actions, and apply integration-specific scopes, such as the target Kubernetes namespaces for a Kubernetes action.
- **Connections** are available for both the runner in the Agent and the standalone runner. They can be attached to at most a single runner. A connection can store credentials for a service.

To compare the two models and decide which one applies to your runner, see [Authorize private actions][4].

## Next steps

- **New to private actions**: Follow [Getting started with private actions][7] to deploy a runner and run your first action.
- **You have a runner in the Datadog Agent and want fleet-wide access control**: Authorize it with [Execution Policies][5].
- **You have a runner in the Agent or a standalone runner and want to authorize a single runner**: Authorize it with [Connections][6].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/private_actions/set_up_agent_based/
[2]: /actions/private_actions/set_up_standalone/
[3]: /actions/private_actions/enroll_runner/
[4]: /actions/private_actions/authorize_private_actions/
[5]: /actions/private_actions/execution_policies/
[6]: /actions/connections/
[7]: /actions/private_actions/getting_started/
