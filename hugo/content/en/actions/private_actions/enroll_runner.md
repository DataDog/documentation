---
title: Enrollment and Ownership
description: How a private action runner enrolls with Datadog, how enrollment sets the runner's ownership, and how ownership determines which authorization model the runner uses.
further_reading:
- link: "actions/private_actions/set_up_agent_based"
  tag: "Documentation"
  text: "Set up a private action runner"
- link: "actions/private_actions/authorize_private_actions"
  tag: "Documentation"
  text: "Authorize private actions"
- link: "actions/private_actions/execution_policies"
  tag: "Documentation"
  text: "Execution Policies"
---

## Overview

When a private action runner starts, it enrolls with your Datadog organization. It registers itself and receives an identity that it uses to authenticate on every request. Enrollment also sets the runner's **ownership**, and ownership determines which authorization model the runner uses for the rest of its life. Because you can't change a runner's ownership without re-enrolling it, choose your enrollment method deliberately before you deploy.

Enrollment applies to both runner forms. Ownerless enrollment, and the Execution Policies authorization that follows from it, apply only to a runner in the Datadog Agent. A standalone runner is always owned.

## The enrollment process

1. You start the runner with a set of credentials and a configuration that enables it.
2. The runner registers with Datadog. By default (`self_enroll: true`), it does this automatically on startup, with no manual step.
3. Datadog issues the runner an identity: a unique runner identifier and a key pair. The runner keeps this identity and reuses it on later restarts.
4. The runner uses its identity to authenticate with Datadog and to verify the tasks it receives.

To pre-provision a runner's identity yourself instead of using self-enrollment, see [Configuration options](#configuration-options).

## Enrollment types and ownership

You enroll a runner in one of two ways. The credential you enroll with sets the runner's ownership, and ownership determines the authorization model. A single runner is authorized by one model, not both. Ownership is set once, at enrollment, and stays fixed for the life of the runner. To change it, re-enroll the runner with the other credential type. Decide which model you want before you deploy, then enroll with the matching credential. To compare the two models in detail, see [Authorize private actions][5].

| Enroll with | Runner ownership | Authorization model |
|---|---|---|
| An **API key** that has the Private Action Runner capability | Ownerless | [Execution Policies][1] |
| An **API key** and an **Application key** | Owned | [Connections][2] |

### Ownerless runners

A runner enrolled with an **API key that has the Private Action Runner capability** is **ownerless**: it has no individual owner. Ownerless runners are authorized with [Execution Policies][1], which control access by Agent tags across your fleet. Ownerless enrollment applies to runners in the Datadog Agent.

The **Private Action Runner** capability is shown with a badge, similar to Remote Configuration. Managing it requires the API key permissions **API Keys Read** (`api_keys_read`) and **API Keys Write** (`api_keys_write`). For more information, see [API and application key permissions][9].

To enroll an ownerless runner:

1. In Datadog, navigate to [**Organization Settings > API Keys**][3].
2. Create or select an API key and enable the **Private Action Runner** capability.
3. Configure the runner with that API key and enable API-key-only enrollment. For the deployment steps and the required Agent version, see [Set up a private action runner in the Datadog Agent][4].

On Kubernetes, store the API key in a secret that the runner reads:

```bash
kubectl create secret generic datadog-secret \
  --from-literal api-key=<DD_API_KEY>
```

### Owned runners

A runner enrolled with an application key is **owned**: the enrolling user becomes the runner's owner. Owned runners are authorized with [Connections][2]. During enrollment, Datadog creates connections for the integrations in the runner's allowlist, so the runner is ready to use with those integrations.

Owned enrollment is the generally available path and works for both the standalone runner and the runner in the Datadog Agent.

On Kubernetes, store the API key and application key in a secret that the runner reads:

```bash
kubectl create secret generic datadog-secret \
  --from-literal api-key=<DD_API_KEY> \
  --from-literal app-key=<DD_APP_KEY>
```

## Manage access to owned runners

This section applies to **owned** runners only. An ownerless runner has no individual owner; who can run actions against it is controlled by [Execution Policies][1] instead.

Use [role-based access control (RBAC)][6] to control access to an owned runner. You can set permissions on the runner to restrict modifications or prevent new connections from being attached. By default, only the runner's creator has Editor access; the creator can grant access to additional users, service accounts, roles, or teams. To see the list of permissions that apply to private action runners, see [Datadog Role Permissions][7].

### Permission levels

**Viewer**
: Can view the runner and the connections attached to it.

**Contributor**
: Can view and contribute to the runner by attaching new connections to it.

**Editor**
: Can view, contribute (attach new connections), and edit the runner.

### Set permissions on a runner

1. Navigate to the Edit page of the runner.
2. In the **Who Has Access?** section, click **Edit access**.
3. Select a user, service account, role, or team from the dropdown menu, then click **Add**. The selected principal appears at the bottom of the dialog box.
4. Next to the principal name, select your desired permission from the dropdown menu.
5. To remove access from a principal, select **Remove access** from the permissions dropdown menu.
6. Click **Done** to finalize the permissions setup.
7. Click **Save** to apply the new permissions to the runner.

## Configuration options

The settings below control enrollment. For the complete list of runner settings and their defaults, see the [private action runner reference][8].

| Setting | Purpose |
|---|---|
| `self_enroll` | Enroll automatically on startup. Enabled by default. |
| `api_key_only_enrollment` | Enroll as an ownerless runner using an API key with the Private Action Runner capability. |
| `actions_allowlist` | The actions the runner is allowed to run. For owned runners, Datadog creates connections for these integrations during enrollment. |

### Identity storage on Kubernetes

A runner in the Datadog Agent keeps its identity so it survives restarts. Where the identity is stored depends on the runner:

- **Cluster Agent runner:** stores its identity in a Kubernetes secret, so the identity is shared across Cluster Agent replicas. When installed with Helm or the Datadog Operator, the default secret name is `datadog-private-action-runner-identity`.
- **Node Agent runner:** stores its identity in a file. On Kubernetes, back that path with a persistent volume so the identity survives pod restarts.

## Runner identity and task authentication

Enrollment gives each runner a private key that Datadog never has access to. Datadog authenticates the runner using the corresponding public key, so only your runners can pick up your organization's tasks.

Datadog signs every task it dispatches, and the runner verifies the signature before running the task.

## Rotating private runner credentials

To rotate the credentials of a private runner without redeploying, run `/opt/datadog-agent/embedded/bin/privateactionrunner rotate-identity` on a host or node Agent, or `/opt/datadog-agent/bin/datadog-cluster-agent rotate-par-identity` for the Cluster Agent.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/private_actions/execution_policies/
[2]: /actions/connections/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /actions/private_actions/set_up_agent_based/
[5]: /actions/private_actions/authorize_private_actions/
[6]: /account_management/rbac/
[7]: /account_management/rbac/permissions/#app-builder--workflow-automation
[8]: /actions/private_actions/reference/
[9]: /account_management/rbac/permissions/#api-and-application-keys
