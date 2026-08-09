---
title: Private Actions Overview
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
- link: "actions/private_actions/execution_policies"
  tag: "Documentation"
  text: "Execution Policies"
- link: "actions/connections"
  tag: "Documentation"
  text: "Connections"
---

Private actions allow you to run actions against services in your private network, such as Kubernetes
clusters, internal hosts, databases, and internal APIs, without exposing those services to the public
internet. You run them through a private action runner that you deploy in your environment, either
inside the Datadog Agent (recommended) or as a standalone runner. Datadog products that use private
actions include Workflow Automation, App Builder, Datadog MCP, and Bits AI investigations.

To go from zero to running your first private action, see [Get started with private actions][8].

Private actions rely on two layers:

- **The authorization layer** is managed in Datadog. It defines which users and products can run which
  actions on which runners, and grants or denies each action before it reaches a runner. The actions a
  runner is allowed to run are also restricted on the Agent side, by the actions allowlist in the Agent
  configuration (`datadog.yaml`).
- **Private action runner** executes the actions. It runs in your network, receives action tasks
  from Datadog, runs each task against the target service, and returns the result to Datadog. 
For how authorization works, see [How private actions are authorized](#how-private-actions-are-authorized).

## The private action runner

The private action runner is the component you deploy in your environment to run private actions. It opens
an outbound connection to Datadog, polls for action tasks, runs each task against the target service, and
returns the result. 

## Choose how to run the runner

The private action runner is available in two forms: a standalone runner that you deploy and manage
yourself, or a runner built into the Datadog Agent.

| | Runner in the Datadog Agent | Standalone runner |
|---|---|---|
| **What it is** | A component of the Datadog Agent, turned on with a single configuration flag. | A dedicated container you can install and manage independently of the Datadog Agent. |
| **Best when** | You already run the Datadog Agent and want to manage the runner through the Agent life cycle. | You need an integration that is not yet available in the Agent. |
| **Status** | Recommended for new deployments. | Supported (maintenance mode). |

For most users, running the private action runner in the Datadog Agent is the recommended path. For
installation steps, see [Set up a private action runner in the Datadog Agent][1] or
[Set up a standalone runner][7].

## How private actions are authorized

Datadog offers two authorization models. The model a runner uses is set when the runner is enrolled, and
it follows from the runner's ownership. For details, see [Enrollment and ownership][2].

- **Execution Policies** apply to runners in the Datadog Agent and are built for managing access at scale.
  Instead of creating a separate connection for each integration on each runner, you use Agent tags to
  target one or more sets of runners. Execution Policies also give you fine-grained control: you can allow
  or deny specific actions or sets of actions, and apply integration-specific scopes, such as the target
  Kubernetes namespaces for a Kubernetes action.
- **Connections** are available for both the runner in the Agent and the standalone runner. They can be
  attached to at most a single runner. A connection can store credentials for a service.

To compare the two models and decide which one applies to your runner, see [Authorize private actions][3].

## Choose your setup

- To use the recommended, Agent-managed setup with fleet-wide access control, run the runner in the
  Datadog Agent and authorize it with Execution Policies. Start with:
    1. [Set up a private action runner][1]
    2. then [Execution Policies][4].
- Or use Connections with a runner in the Agent or a standalone runner. See [Connections][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/private_actions/set_up_agent_based/
[2]: /actions/private_actions/enroll_runner/
[3]: /actions/private_actions/authorize_private_actions/
[4]: /actions/private_actions/execution_policies/
[5]: /actions/connections/
[7]: /actions/private_actions/set_up_standalone/
[8]: /actions/private_actions/getting_started/
