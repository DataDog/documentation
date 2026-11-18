---
title: Execution Policies
description: Control who can run which actions, and where, using Execution Policies for private actions and Slack actions.
disable_toc: false
aliases:
- /actions/private_actions/execution_policies/
further_reading:
- link: "/actions/private_actions/"
  tag: "Documentation"
  text: "Private Actions Overview"
- link: "/actions/private_actions/authorize_private_actions/"
  tag: "Documentation"
  text: "Authorize private actions"
- link: "/actions/connections/"
  tag: "Documentation"
  text: "Connections"
---

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Execution Policies are not supported for your <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

Execution Policies let you control who can run which actions, and where. Each Execution Policy is a single allow or deny rule for a set of actions, together with the targets it applies to. Execution Policies store no credentials. They control authorization, not authentication.

Execution Policies authorize the following types of actions:

Private actions
: Actions that run on a [private action runner][1] inside the Datadog Agent. Policies target Agents, which you select by Agent tags. Execution Policies apply only to runners enrolled as *ownerless*. An ownerless runner is enrolled with an API key that has the Private Action Runner capability, rather than tied to a specific user. See [Enrollment and ownership][2].

Slack actions
: Slack actions that run in the Datadog cloud. Policies target Slack workspaces and private channels. Public channels don't require a policy.

Execution Policies give you two main advantages:

- **Manage access at scale**: With [Connections][3], you create one connection per integration on each private action runner. That approach becomes hard to manage across a large fleet. An Execution Policy controls access to many targets at once. A single policy can also list more than one target, so the same rule can cover several teams or environments without being duplicated.
- **Fine-grained control**: Allow or deny specific actions or sets of actions. Limit a policy to specific targets, such as Kubernetes namespaces or Slack channels.

## Prerequisites

- The **Execution Groups Write** (`ExecutionGroupWrite`) permission. See the [Permissions](#permissions) section.
- For private actions: a private action runner running in the Datadog Agent, enrolled as ownerless.
- For Slack actions: the [Slack integration][4] installed for your Slack workspace.

## Permissions

Creating, updating, and deleting Execution Policies requires the **Execution Groups Write** (`ExecutionGroupWrite`) permission.

- The default **Datadog Admin** role includes this permission.
- To grant it to other users, add it to a [custom role][5] and assign that role to the users or teams who manage Execution Policies.

This permission controls who can manage Execution Policies. To control who can use a specific Execution Policy, see that policy's [Access](#access) settings.

## Policy structure

An Execution Policy is a single allow or deny rule made up of the following components:

Effect
: **Allow** or **Deny**. New policies default to **Allow**.

Actions
: The actions the policy covers, from a single integration. You can select specific actions, select whole bundles, or use the selectors that cover all actions or all read-only actions.

Targets
: Where the policy applies. Targets depend on the type of action. See the [Targets](#targets) section.

Access
: Who can view and edit the policy, and who the policy applies to. See the [Access](#access) section.

### Targets

Targets choose where an Execution Policy applies. A policy can define more than one target, so the same rule can cover more than one set of resources without duplicating the policy.

{{% collapse-content title="Private actions: Agents" level="h4" id="targets-private-actions" %}}

For private actions, a target is a set of Agent tags that selects which Agents (running a private action runner) the policy applies to. For example, you can define one target per team or per environment.

- Tags are matched with AND semantics. An Agent must carry all of the tags in a target to match it.
- To match every Agent that has a private action runner enabled, use a wildcard `*` by itself as a target.
- Partial or patterned wildcards such as `env:*` or `*:prod`, and combining `*` with other tags, are not supported.
- Optionally, name a target to help distinguish multiple targets on the same policy.

As you edit a target's tags, Datadog shows a live count of how many Agents match it.

Some integrations also support a scope that limits the policy further. For example, for Kubernetes, set **Target Namespaces** to limit the policy to specific namespaces.

An Execution Policy with no targets is valid, but has no effect. It never matches an Agent, so it never authorizes anything. Datadog labels these policies as "targets nothing" so you know to complete or remove them.

{{% /collapse-content %}}

{{% collapse-content title="Slack actions: Workspaces and channels" level="h4" id="targets-slack" %}}

For Slack actions, a policy targets Slack workspaces and private channels:

Workspaces
: The Slack workspaces the policy applies to. Select one or more workspaces, or **All workspaces**. A policy with no workspaces is inactive.

Channels
: The private channels the policy applies to, matched by channel name. Enter an exact channel name, such as `incident-response`, or use `*` to match any sequence of characters, such as `incident-*`. Leave **Channels** empty to match all private channels in the selected workspaces.

A policy can cover only Slack actions that target a channel.

{{% /collapse-content %}}

### Access

Execution Policies have **Access** settings that control who can view and manage them, and who a policy applies to. Access works alongside the [`ExecutionGroupWrite` permission](#permissions). The permission decides who can manage Execution Policies at all, while Access decides which specific policies each user can view, edit, or be governed by.

| Access level | Can view | Can edit | Policy applies to them |
|---|:---:|:---:|:---:|
| **Viewer** | Yes | No | No |
| **Resolver** | Yes | No | Yes |
| **Editor** | Yes | Yes | Yes |

Whether a policy "applies to" a user is what connects Access to authorization. An **Allow** policy grants its actions only to the users it applies to, and a **Deny** policy restricts only the users it applies to. A **Viewer** can see the policy but is never granted or restricted by it.

When you create an Execution Policy, you become its Editor. To apply the policy to others, click **Edit access** and grant **Resolver** or **Editor** access to users, teams, or your organization.

## Create an Execution Policy

1. Go to [**Actions > Execution Policies**][6] and click **Create Execution Policy**.
2. Enter a **Name** (for example, `read-only-kubernetes`) or use the auto-generated one.
3. Set the **Effect** to **Allow** or **Deny**.
4. Under **Actions**, select the **Integration**, then select the actions to include.
5. Set the targets for the integration:
    - **Private actions**: Optionally, set a scope, such as **Target Namespaces** for Kubernetes. Under **Targets**, add one or more tags to select the Agents this policy applies to. See the [Private actions: Agents](#targets-private-actions) section.
    - **Slack actions**: Under **Workspaces**, select one or more Slack workspaces, or **All workspaces**. Under **Channels**, enter channel names or patterns, or leave the field empty. See the [Slack actions: Workspaces and channels](#targets-slack) section.
6. Under **Access**, click **Edit access** and set who can view and edit the policy, and who it applies to. See the [Access](#access) section.
7. Click **Create**.

To see policies for one integration on the Execution Policies page, select it in the **Integration** facet.

## Use an Execution Policy in a workflow

Only the workflow owner can turn on Execution Policies for a workflow.

1. Open a workflow that you own.
1. Click the cog (**Settings**) icon, then click **Edit permissions**.
1. Under **Execution Policies**, turn on **Enable actions to run using Execution Policies**.
1. Click **Save**.

<div class="alert alert-warning">If a workflow runs as its owner, its editors can run any action that the owner's policies allow. To limit this, set the workflow's <a href="/actions/workflows/access_and_auth/#workflow-identity">Run as</a> identity to <strong>Initiator</strong> or <strong>Service Account</strong>.</div>

### Target an Agent from a private action step

When you configure a private action step in a workflow, you can target an Agent directly instead of selecting a connection:

1. In the step's connection picker, choose **Target** instead of **Connection**.
2. Select how to identify the Agent:
    - **Hostname**: Use for a private action runner on a specific Datadog Agent host.
    - **Orch Cluster ID**: Use for a private action runner in a Kubernetes Cluster Agent.
3. Enter the hostname or orchestration cluster ID of the target Agent.

Targeting an Agent creates a virtual connection for the step, identified by the target Agent only. The virtual connection carries no credentials. When the workflow runs, the action executes only if an Execution Policy authorizes it for that target and the requesting user.

### Target a private Slack channel from a Slack step

In a Slack step, select the workspace and enter a private channel that an Execution Policy allows you to use.

When Execution Policies are off for the workflow, Slack steps that target a private channel show **Enable Execution Policies to target private Slack channels**. If you're the workflow owner, click **Enable**. Otherwise, contact the workflow owner.

## Supported integrations

Execution Policies authorize actions for the following integrations:

| Integration | Type | Targets |
|---|---|---|
| **Kubernetes** (`com.datadoghq.kubernetes.*`) | Private actions | Agents, with optional Target Namespaces |
| **Remote Action** (`com.datadoghq.remoteaction.*`), including the rshell bundle (the `runCommand` action) and network path actions | Private actions | Agents |
| **Script** (`com.datadoghq.script.*`) | Private actions | Agents |
| **Slack** | Slack actions | Workspaces and private channels |

The [Private Action Runner Reference][7] shows which private actions each runner type supports. If your integration isn't authorizable through Execution Policies, use [Connections][3] instead.

## Default Execution Policies

For private actions, Datadog provisions default Execution Policies in your organization so that read-only actions work as soon as a runner enrolls. No setup of your own is required. They:

- Target every Agent that runs a private action runner (target selector `*`).
- Grant read-only Kubernetes and read-only Remote Action actions.
- Let everyone in your organization run those read-only actions. Users who have the `ExecutionGroupWrite` permission, which the Datadog Admin role includes by default, can also edit them.

The default Execution Policies cover read-only private actions only. To run write-capable actions, or to scope access to specific Agents, namespaces, teams, or users, see the [Create an Execution Policy](#create-an-execution-policy) section.

## Authorization workflow

Authorization happens in Datadog before an action runs. Every evaluation follows two rules:

- **Default deny**: If no policy explicitly allows the action, it is denied.
- **Deny overrides allow**: If any matching policy denies the action, it is denied, even if another policy allows it.

### Private actions

Because authorization happens before a task is dispatched, the runner executes only actions that have already been authorized. When a private action is requested against a runner in the Datadog Agent:

1. Datadog identifies the target Agent (by hostname or orchestration cluster ID) and its tags.
2. Datadog finds the Execution Policies whose **Targets** match those tags.
3. Datadog evaluates the matching policies for the requested action and the requesting user.
4. If a policy allows the action and no policy denies it, the task is dispatched to the Agent, which runs it. Otherwise, the action is denied and never reaches the Agent.

### Slack actions

When a Slack action runs:

1. Datadog resolves the target workspace and channel.
2. If the channel is public, the action runs. Datadog doesn't check policies.
3. If the channel is private, Datadog evaluates the Execution Policies for that action, workspace, and channel, and for the identity running the action.
4. If a policy allows the action and no policy denies it, the action runs. Otherwise, the action is denied.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/private_actions/
[2]: /actions/private_actions/enroll_runner/
[3]: /actions/connections/
[4]: /integrations/slack/
[5]: /account_management/rbac/
[6]: https://app.datadoghq.com/actions/execution-policies
[7]: /actions/private_actions/reference/
