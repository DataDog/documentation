---
title: Execution Policies
description: Control which Datadog Agents your team can target with private actions and which actions they can run, using Execution Policies.
disable_toc: false
further_reading:
- link: "/actions/private_actions/"
  tag: "Documentation"
  text: "Private Actions Overview"
- link: "/actions/private_actions/enroll_runner/"
  tag: "Documentation"
  text: "Enrollment and ownership"
- link: "/actions/private_actions/authorize_private_actions/"
  tag: "Documentation"
  text: "Authorize private actions"
- link: "/actions/connections/"
  tag: "Documentation"
  text: "Connections"
---

## Overview

Execution Policies let you control who, where, and what actions your team can run. Each Execution Policy is a single allow or deny rule for a set of actions, together with the Agents it applies to. You select those Agents by Agent tags. Execution Policies give you two main advantages when you authorize private actions:

- **Manage access at scale**: With [Connections][1], you create one connection per integration on each runner, which becomes hard to manage across a large fleet. Execution Policies let you control access to many runners at once by selecting Agents with tags. A single policy can also list more than one set of target Agents, so the same rule can cover several teams or environments without being duplicated.
- **Fine-grained control**: You can allow or deny specific actions or sets of actions, and apply integration-specific scopes, such as limiting a Kubernetes policy to specific target namespaces.

Execution Policies apply to private action runners running **inside the Datadog Agent** that were enrolled as *ownerless*. An ownerless runner is enrolled with an API key that has the Private Action Runner capability, rather than being tied to a specific user. For how a runner becomes ownerless, see [Enrollment and ownership][2].

## Prerequisites

- A private action runner running **in the Datadog Agent** enrolled as ownerless (using an API key with the Private Action Runner capability).
- The `ExecutionGroupWrite` permission, which allows you to create, update, and delete Execution Policies. See [Permissions](#permissions).

## Permissions

Creating, updating, and deleting Execution Policies requires the `ExecutionGroupWrite` permission.

- The default **Datadog Admin** role includes this permission.
- To grant it to other users, add it to a [custom role][3] and assign that role to the users or teams who manage Execution Policies.

This permission controls who can **manage** Execution Policies. To control who can **use** a specific Execution Policy to run private actions, see that policy's [Access](#access) settings.

## Policy structure

An Execution Policy is a single allow or deny rule for a set of private actions. It is made up of components, including the actions it covers and the target Agents it applies to.

The [Targets](#targets) and [Access](#access) sections describe those components in detail. To create an Execution Policy with all of its components, see the [Create an Execution Policy](#create-an-execution-policy) section.

{{% collapse-content title="Targets" level="h3" id="targets" %}}

Targets are the tag selectors that choose which Agents (running a private action runner) an Execution Policy applies to. A policy can define more than one target, so the same rule can cover more than one set of Agents without duplicating the policy. For example, you can define one target per team or per environment.

Each target is a set of tags:

- Tags are matched with **AND** semantics. An Agent must carry **all** of the tags in a target to match it.
- To match every Agent that has a private action runner enabled, use a wildcard `*` by itself as a target.
- Partial or patterned wildcards such as `env:*` or `*:prod`, and combining `*` with other tags, are **not supported**.
- Optionally, name a target to help distinguish multiple targets on the same policy.

As you edit a target's tags, Datadog shows a live count of how many Agents match it.

An Execution Policy with no targets is valid, but has no effect. It never matches an Agent, so it never authorizes anything. Datadog labels these policies as "targets nothing" so you know to complete or remove them.

{{% /collapse-content %}}

{{% collapse-content title="Access" level="h3" id="access" %}}

Execution Policies have **Access** settings that control who can view and manage them, and who a policy applies to. Access works alongside the [`ExecutionGroupWrite` permission](#permissions). The permission decides who can manage Execution Policies at all, while Access decides which specific policies each user can view, edit, or be governed by.

Execution Policies do not store credentials. Access controls targeting and authorization only.

| Access level | Can view | Can edit | Policy applies to them |
|---|:---:|:---:|:---:|
| **Viewer** | Yes | No | No |
| **Resolver** | Yes | No | Yes |
| **Editor** | Yes | Yes | Yes |

Whether a policy "applies to" a user is what connects Access to authorization. An **Allow** policy grants its actions only to the users it applies to, and a **Deny** policy restricts only the users it applies to. A **Viewer** can see the policy but is never granted or restricted by it.

When you create an Execution Policy, you become its Editor. If a policy has no Access settings, it applies to everyone in your organization.

{{% /collapse-content %}}

## Create an Execution Policy

1. Go to [**Actions > Execution Policies**][4] and click on **Create Execution Policy**.
2. Enter a **Name** (for example, `Read-only Kubernetes`) or use the auto-generated one.
3. Set the **Effect** to **Allow** or **Deny**.
4. Under **Actions**, choose an integration and the actions to include. You can select specific actions, select whole bundles, or use the special **All actions** / **All read-only** selectors.
5. Optionally set a scope. For example, for Kubernetes, set **Target Namespaces** to limit the policy to specific namespaces.
6. Under **Targets**, add one or more tags to select the Agents this policy applies to. An Agent must carry all the tags in a target to match it. To target every Agent that has an ownerless private action runner enabled, use a wildcard `*` on its own. Add more than one target to apply the same policy to more than one set of Agents. For more information, see the [Targets](#targets) section.
7. Under **Access**, set who can view, edit, and who the policy applies to. For more information, see the [Access](#access) section.
8. Click on **Create**.

## Use an Execution Policy in a workflow

When you configure a private action step in a workflow, you can target an Agent directly instead of selecting a connection:

1. In the step's connection picker, choose **Target** instead of **Connection**.
2. Select how to identify the Agent:
    - **Hostname**: for a private action runner on a specific Datadog Agent host.
    - **Orch Cluster ID**: for a private action runner in a Kubernetes Cluster Agent.
3. Enter the hostname or orchestration cluster ID of the target Agent.

This creates a virtual connection for the step, identified by the target Agent only; it carries no credentials. When the workflow runs, the action executes only if an Execution Policy authorizes it for that target and the requesting user.

## Supported integrations

Execution Policies authorize actions for the following integrations:

- **Kubernetes** (`com.datadoghq.kubernetes.*`)
- **Remote Action** (`com.datadoghq.remoteaction.*`), which includes the rshell bundle (the `runCommand` action) and network path actions.
- **Script** (`com.datadoghq.script.*`).

The [Private Action Runner Reference][5] shows which actions each runner type supports. If your integration isn't authorizable through Execution Policies, use [Connections][1] instead.

## Default Execution Policies

Datadog provisions default Execution Policies in your organization so that read-only actions work as soon as a runner enrolls. No setup of your own is required. They:

- Target every Agent that runs a private action runner (target selector `*`).
- Grant **read-only Kubernetes** and **read-only Remote Action** actions.
- Let **everyone in your organization** run those read-only actions. Users who have the `ExecutionGroupWrite` permission, which the Datadog Admin role includes by default, can also edit them.

The default Execution Policies cover read-only actions only. To run write-capable actions, or to scope access to specific Agents, namespaces, teams, or users, see [Create an Execution Policy](#create-an-execution-policy).

## Authorization workflow

Because authorization happens in Datadog before a task is dispatched, the runner only executes actions that have already been authorized. When a private action is requested against a runner in the Datadog Agent:

1. Datadog identifies the **target Agent** (by hostname or orchestration cluster ID) and its tags.
2. Datadog finds the Execution Policies whose **Targets** match those tags.
3. Datadog evaluates the matching **Policies** for the requested action and the requesting user.
4. If a policy allows the action and no policy denies it, the task is dispatched to the Agent, which runs it. Otherwise the action is denied and never reaches the Agent.

The evaluation follows two rules:

- **Default deny**: If no policy explicitly allows the action, it is denied.
- **Deny overrides allow**: If any matching policy denies the action, it is denied, even if another policy allows it.

Execution Policies do not store credentials. They answer *where* actions can run, *what* can run, and *who* can run it.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/connections/
[2]: /actions/private_actions/enroll_runner/
[3]: /account_management/rbac/
[4]: https://app.datadoghq.com/actions/execution-policies
[5]: /actions/private_actions/reference/
