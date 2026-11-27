---
title: Use Slack in Actions
description: Run Slack actions from workflows, apps, and the Action Catalog, and control access to private Slack channels with Slack execution policies.
disable_toc: false
further_reading:
- link: "/integrations/slack/"
  tag: "Documentation"
  text: "Slack integration"
- link: "/integrations/guide/slack-actions/"
  tag: "Documentation"
  text: "Slack Actions"
- link: "/actions/execution_policies/"
  tag: "Documentation"
  text: "Execution Policies"
- link: "/actions/workflows/access_and_auth/"
  tag: "Documentation"
  text: "Access and authentication for workflows"
- link: "/actions/connections/"
  tag: "Documentation"
  text: "Connections"
---

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Slack execution policies are not supported for your <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}). Slack actions can't act on private channels on this site.</div>
{{< /site-region >}}

## Overview

Slack actions let you send messages, read channel history, manage channels, and more from [Workflow Automation][1], [App Builder][2], and the [Action Catalog][3].

- **Public channels**: Slack actions work without extra setup.
- **Private channels**: An admin authorizes access with a **Slack execution policy**. The policy names the actions, workspaces, and channels it covers, and the users it applies to.

Slack actions run in the Datadog cloud, not on a private action runner. Slack execution policies use the same allow and deny model as private actions, but they select Slack workspaces and channels instead of Agents. For how policies are structured and evaluated, see [Execution Policies][4].

## Authentication

Slack actions use the credentials from the [Slack integration tile][5], so you don't need to create a separate connection.

Slack execution policies don't change how actions authenticate. They control which users can run which actions on which private channels.

## Prerequisites

- The [Slack integration][5] installed for your Slack workspace.
- The Datadog app invited to each private channel that your actions target. In the channel, run `/invite @Datadog`. Slack doesn't let apps join private channels on their own. Without the app, actions on a private channel fail, even when a policy allows them. For more information, see [Configure which Slack channels can receive notifications][9].
- To create, update, or delete Slack execution policies: the **Execution Groups Write** (`ExecutionGroupWrite`) permission. The default **Datadog Admin** role includes this permission. To grant it to other users, add it to a [custom role][6].

## How Slack execution policies work

When a Slack action runs:

1. Datadog resolves the target workspace and channel, and looks up the channel's current name.
2. If the channel is public, the action runs. Datadog doesn't check policies.
3. If the channel is private, Datadog evaluates the Slack execution policies for that action, workspace, and channel name. In a workflow, Datadog checks policies for the workflow's [**Run as**][8] identity. Elsewhere, it checks policies for the user running the action.
4. The action runs only if a policy allows it and no policy denies it.

The evaluation follows two rules:

- **Default deny**: If no policy explicitly allows the action, it is denied.
- **Deny overrides allow**: If any matching policy denies the action, it is denied, even if another policy allows it.

A default policy allows a set of older Slack actions on all private channels. See [Default Slack execution policy](#default-slack-execution-policy).

## Policy structure

A Slack execution policy is a single allow or deny rule made up of the following components:

Effect
: **Allow** or **Deny**. New policies default to **Allow**.

Actions
: The Slack actions the policy covers. Select specific actions, **Select all** to cover every eligible Slack action (including actions added later), or **Select all read-only**. Only Slack actions that target a channel can be covered by a policy.

Workspaces
: The Slack workspaces the policy applies to. Select one or more workspaces, or **All workspaces**. A policy with no workspaces is inactive.

Channels
: The private channels the policy applies to, by channel name or pattern. Leave empty to apply the policy to all private channels in the selected workspaces. See [Channels](#channels).

Access
: Who can view and edit the policy, and who the policy applies to. See [Access](#access).

{{% collapse-content title="Channels" level="h3" id="channels" %}}

Slack execution policies apply only to private channels. Channel selectors match the channel's current **name** at the time the action runs. If a channel is renamed, policies match its new name, even if a workflow refers to the channel by ID.

- Enter an exact channel name, such as `incident-response`.
- Use `*` to match any sequence of characters, such as `incident-*`. `*` is the only wildcard. All other characters are matched literally.
- Use Slack UserIDs to target Slack Users
- Leave **Channels** empty to match all private channels in the selected workspaces.

Selectors follow these rules:

- Matching is case-sensitive. Slack channel names are lowercase, so use lowercase selectors.
- Selectors can contain letters, numbers, `_`, `.`, `-`, and `*`. Don't include a leading `#`.
- Each selector can be up to 80 characters. A policy can have up to 100 selectors.

{{% /collapse-content %}}

{{% collapse-content title="Access" level="h3" id="access" %}}

Slack execution policies have **Access** settings that control who can view and manage them, and who a policy applies to. The **Execution Groups Write** permission decides who can manage policies at all. Access decides which specific policies each user can view, edit, or be governed by.

Slack execution policies do not store credentials. Access controls authorization only.

| Access level | Can view | Can edit | Policy applies to them |
|---|:---:|:---:|:---:|
| **Viewer** | Yes | No | No |
| **Resolver** | Yes | No | Yes |
| **Editor** | Yes | Yes | Yes |

To run Slack actions on private channels, a user needs at least **Resolver** access to an **Allow** policy that covers the action and channel. A **Viewer** can see the policy but is never granted or restricted by it.

When you create a Slack execution policy, you become its Editor and everyone else in your organization gets Viewer access. Until you change its access, the policy applies only to you. To apply it to others, click **Edit access** and grant **Resolver** or **Editor** access to users, teams, or your organization.

{{% /collapse-content %}}

## Create a Slack execution policy

1. Go to [**Actions > Execution Policies**][7] and click **Create Execution Policy**.
2. Enter a **Name** (for example, `read-incident-channels`) or use the auto-generated one.
3. Set the **Effect** to **Allow** or **Deny**.
4. Under **Actions**, select **Slack** as the **Integration**, then select the actions to include. For more information, see [Policy structure](#policy-structure).
5. Under **Workspaces**, select one or more Slack workspaces, or **All workspaces**.
6. Under **Channels**, enter channel names or patterns, such as `incident-*`, or leave the field empty to cover all private channels. For more information, see [Channels](#channels).
7. Under **Access**, click **Edit access** and grant **Resolver** access to the users or teams the policy applies to. For more information, see [Access](#access).
8. Click **Create**.

To see only Slack policies on the Execution Policies page, select **Slack** in the **Integration** facet.

## Run Slack actions on private channels

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">Slack execution policies are not supported for your <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}). Slack actions can't act on private channels on this site.</div>
{{< /site-region >}}

### From the Action Catalog

1. In the [Action Catalog][3], search for and click an eligible Slack action, such as **Conversations history**.
2. Select the **Workspace**, and enter a private channel name or ID in **Channel**. A Slack execution policy must allow you to use the channel.
3. Click **Run**. The output appears under **Run results**.

### In a workflow

Only the workflow owner can turn on execution policies for a workflow.

1. Open a workflow that you own.
1. Click the cog (**Settings**) icon, then click **Edit permissions**.
1. Under **Execution Policies**, turn on **Enable actions to run using Execution Policies**.
1. Click **Save**.

You can also turn on execution policies from a Slack step. If execution policies are off, a Slack step that targets a private channel shows the message **Enable Execution Policies to target private Slack channels**. If you're the workflow owner, click **Enable**. Otherwise, contact the workflow owner.

If execution policies are off, Slack steps in the workflow can act only on public channels. The exception is the actions covered by the [default Slack execution policy](#default-slack-execution-policy).

Execution policies don't control who can view action outputs. Anyone who can view a workflow's runs can see the private channel content that its Slack steps return. Restrict access to workflows that read from private channels.

<div class="alert alert-warning">If a workflow runs as its owner, its editors can run Slack actions on any private channel the owner's policies allow. To limit this, set the workflow's <a href="/actions/workflows/access_and_auth/#workflow-identity">Run as</a> identity to <strong>Initiator</strong> or <strong>Service Account</strong>.</div>

## Default Slack execution policy

Some Slack actions could reach private channels before Slack execution policies were available. To keep them working, your organization has a default policy named **Datadog Default Slack Policy**. It allows the following actions on all workspaces and all private channels:

- Send message
- Make a decision
- Send block kit message
- Prompt user with modal
- Set channel topic
- Archive channel
- Add Datadog App to channel
- Add reactions
- Get reactions

Everyone in your organization has **Resolver** access to the default policy, so it applies to all users. These actions work on private channels in workflows, apps, and the Action Catalog, even when execution policies are off for a workflow.

To restrict these actions on private channels, edit the default policy or create a **Deny** policy. Users with the **Execution Groups Write** permission can edit or delete the default policy.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/workflows/
[2]: /actions/app_builder/
[3]: /actions/actions_catalog/
[4]: /actions/execution_policies/
[5]: /integrations/slack/
[6]: /account_management/rbac/
[7]: https://app.datadoghq.com/actions/execution-policies?integration=slack
[8]: /actions/workflows/access_and_auth/#workflow-identity
[9]: /integrations/slack/#configure-which-slack-channels-can-receive-notifications
