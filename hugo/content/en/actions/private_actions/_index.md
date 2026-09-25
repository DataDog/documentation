---
title: Private Actions
description: Run actions against services in your private network from Datadog products, using a private action runner as the execution and authorization layer for on-premises actions.
disable_toc: false
aliases:
- service_management/workflows/private_actions/
- service_management/app_builder/private_actions/
further_reading:
- link: "/actions/private_actions/getting_started"
  tag: "Documentation"
  text: "Getting Started with Private Actions"
- link: "/actions/private_actions/set_up_agent_based"
  tag: "Documentation"
  text: "Set up a private action runner"
- link: "/actions/private_actions/enroll_runner"
  tag: "Documentation"
  text: "Enrollment and ownership"
- link: "/actions/connections"
  tag: "Documentation"
  text: "Connections"
- link: "/actions/private_actions/authorize_private_actions/"
  tag: "Documentation"
  text: "Authorize Private Actions"
---

## Overview

Private actions allow you to run actions against services in your private network, such as Kubernetes clusters, internal hosts, databases, and internal APIs, without exposing those services to the public internet. You run them through a private action runner that you deploy in your environment, either inside the Datadog Agent (recommended) or as a standalone runner. Datadog products that use private actions include Workflow Automation, App Builder, Datadog MCP, and Bits AI investigations.

Private actions rely on two layers:

- [**Private action runner**](#private-action-runner) executes the actions. It runs in your network, receives action tasks from Datadog, runs each task against the target service, and returns the result to Datadog.
- [**The authorization layer**](#authorization-models) is managed in Datadog. It defines which users and products can run which actions on which runners, and grants or denies each action before it reaches a runner. The actions a runner is allowed to run are also restricted on the Agent side, by the actions allowlist in the Agent configuration (`datadog.yaml`).

<div class="alert alert-danger">On US1-FED and US2-FED sites, the <a href="/actions/private_actions/set_up_standalone">standalone runner</a> is the supported private action runner and <a href="/actions/connections/">Connections</a> are the supported authorization model.</div>

## Private action runner

The private action runner is the component you deploy in your environment to run private actions. It opens an outbound connection to Datadog, polls for action tasks, runs each task against the target service, and returns the result.

The private action runner is available in the following forms:

**Runner in the Datadog Agent (Recommended)**: A component of the Datadog Agent that you enable with a single configuration flag. This option is recommended for new deployments on commercial Datadog sites, particularly if you already use the Agent and want to manage the runner through the Agent life cycle. For installation steps, see [Set up a private action runner in the Datadog Agent][1].

**Standalone runner**: A dedicated container that you install and manage independently of the Datadog Agent. On commercial Datadog sites, use this option when you need an integration that is not yet available in the Agent. The standalone runner is supported in maintenance mode. On US1-FED and US2-FED, it is the supported deployment option for Private Actions. For installation steps, see [Set up a standalone runner][2].

## Authorization models

Datadog offers two authorization models. The model a runner uses is set when the runner is enrolled, and it follows from the runner's ownership. For more information, see [Enrollment and ownership][3].

**Execution Policies** apply to runners in the Datadog Agent and are built for managing access at scale. Instead of creating a separate connection for each integration on each runner, you use Agent tags to target one or more sets of runners. Execution Policies also give you fine-grained control: you can allow or deny specific actions or sets of actions, and apply integration-specific scopes, such as the target Kubernetes namespaces for a Kubernetes action.

**Connections** are available for both the runner in the Agent and the standalone runner. They can be attached to at most a single runner. A connection can store credentials for a service. On US1-FED and US2-FED, Connections are the supported authorization model for Private Actions.

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
