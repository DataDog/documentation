---
title: Authorize Private Actions
description: "Learn how Datadog authorizes private actions using Execution Policies and Connections."
disable_toc: false
further_reading:
- link: "actions/private_actions/"
  tag: "Documentation"
  text: "Private Actions Overview"
- link: "actions/private_actions/enroll_runner/"
  tag: "Documentation"
  text: "Enrollment and ownership"
- link: "actions/private_actions/set_up_agent_based/"
  tag: "Documentation"
  text: "Set up a private action runner"
- link: "actions/private_actions/execution_policies/"
  tag: "Documentation"
  text: "Execution Policies"
- link: "actions/connections/"
  tag: "Documentation"
  text: "Connections"
---

## Overview

When your workflows and apps use private actions, Datadog decides whether the action is allowed, and then your **private action runner** runs it. Before a task is sent to a runner, Datadog checks whether the requesting user is permitted to act on that runner. If it isn't allowed, the task is never dispatched.

This page explains how that authorization decision is made. It covers the models Datadog uses to allow or deny an action, and which model applies to your runner.

## Find your authorization model

A runner is authorized using one of two models: [**Execution Policies**](#execution-policies) or [**Connections**](#connections). The model is determined by the runner's ownership, set once when the runner is enrolled. A given runner uses exactly one of these models for its entire lifetime; you cannot mix the two on the same runner. Because ownership is set per runner, a single Agent-based fleet can include both ownerless and owned runners, each authorized by its own model.

- **Runner in the Datadog Agent** depends on how it was enrolled. An ownerless Agent runner uses [Execution Policies](#execution-policies); an owned Agent runner uses [Connections](#connections).
- **Standalone runner** is always owned, so it always uses [Connections](#connections).

For how enrollment sets a runner's ownership, see [Enrollment and ownership][1].

## Compare the two models

|   | Execution Policies | Connections |
|---|---|---|
| **Works with** | Runners in the Datadog Agent only | Both standalone runners and runners in the Datadog Agent |
| **How access is granted** | Agent tags target one or more sets of runners, so one policy manages access across a fleet instead of a separate connection per integration per runner | A connection stores credentials and pairs them with a single runner |
| **Credentials** | Execution Policies store no credentials; access is granted by Agent tags. Actions that require credentials (for example HTTP, GitLab, and MongoDB) are not supported. | The connection holds the credentials used to run the action |
| **Control** | Fine-grained: allow or deny specific actions or sets of actions, plus integration-specific scopes such as the target Kubernetes namespaces for a Kubernetes action | Per-runner: a connection targets one specific runner |

## Execution Policies

**Execution Policies** are an authorization model for runners in the Datadog Agent. Each policy manages access across one or more sets of runners at once. Instead of a separate connection per integration per runner, you use **Agent tags** to define the target Agents. You then attach an allow or deny rule to them.

Execution Policies also provide fine-grained control. A policy can allow or deny specific actions or sets of actions. It can also apply integration-specific scopes, such as the target Kubernetes namespaces for a Kubernetes action. Access is granted through Agent tags rather than stored credentials, so Execution Policies store no credentials and are used by ownerless runners in the Agent.

To learn more about Execution Policies and how to set them up (targets, rules, access control, and using Execution Policies in workflows), see [Execution Policies][2].

## Connections

Connections work for both standalone runners and runners in the Datadog Agent, and are the model used by owned runners.

A connection does two things:

- **It references the credentials** needed to run an action against your service. The credentials themselves (for example an API token, or a username and password) are stored locally with the runner, in a credential file on its host or container; the connection points to them.
- **It pairs those credentials with a single runner.** A connection targets one runner, so the credentials are only ever used by the runner you intend.

To use a connection in a workflow or app, you need the appropriate permission for that connection. Access to a connection can be restricted so that only the people who need it can use it in their workflows and apps.

For the full setup instructions (creating, editing, and restricting connections, connection identifier tags, and connection groups), see [Connections][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/private_actions/enroll_runner/
[2]: /actions/private_actions/execution_policies/
[3]: /actions/connections/
