---
title: Private Action Runner Reference
description: Reference tables for private action runner configuration settings, supported actions and integrations, and credential file formats.
further_reading:
- link: "actions/private_actions/"
  tag: "Documentation"
  text: "Private Actions Overview"
- link: "actions/private_actions/set_up_agent_based/"
  tag: "Documentation"
  text: "Set up a private action runner"
- link: "actions/private_actions/execution_policies/"
  tag: "Documentation"
  text: "Execution Policies"
- link: "actions/connections/private_action_credentials/"
  tag: "Documentation"
  text: "Handling private action credentials"
---

## Overview

This page is the reference for private action runners and covers the configuration settings, the actions and integrations each runner supports, and credential file formats. To learn more about Private Actions concepts and setup, see [Private Actions Overview][1].

## Runner configuration

The runner reads its settings from the `private_action_runner` section of its [configuration][2].

For how the enrollment settings (`self_enroll` and `api_key_only_enrollment`) fit into runner enrollment, see [Enrollment and ownership][3].

The same setting is named differently depending on how you install the runner. Host installs use environment variables, Helm uses camelCase keys under `privateActionRunner`, and the Datadog Operator uses snake_case keys under `private_action_runner`. Use this table to translate the common settings across install methods.

| Setting | Host (environment variable) | Helm (`privateActionRunner.*`) | Operator (`private_action_runner.*`) |
|---|---|---|---|
| Enable | `DD_PRIVATE_ACTION_RUNNER_ENABLED` | `enabled` | `enabled` |
| Self-enroll | `DD_PRIVATE_ACTION_RUNNER_SELF_ENROLL` | `selfEnroll` | `self_enroll` |
| Actions allowlist | `DD_PRIVATE_ACTION_RUNNER_ACTIONS_ALLOWLIST` (comma-separated) | `actionsAllowlist` (list) | `actions_allowlist` (list) |

## Supported actions and integrations

This matrix shows, for each integration, its availability in each runner type and whether it is authorizable through [Execution Policies][4].

<div class="alert alert-info">Availability in the Agent and authorization through Execution Policies are independent. An integration can run in the Agent without being authorizable through an Execution Policy.</div>

| Integration | Runner in the Agent | Authorizable through<br>Execution Policies | Standalone runner |
|---|:---:|:---:|:---:|
| Kubernetes | {{< X >}} | {{< X >}} | {{< X >}} |
| Remote Action (rshell + network path) | {{< X >}} | {{< X >}} | {{< X >}} |
| Script | {{< X >}} | {{< X >}} | {{< X >}} |
| HTTP | {{< X >}} |  | {{< X >}} |
| GitLab | {{< X >}} |  | {{< X >}} |
| Jenkins | {{< X >}} |  | {{< X >}} |
| MongoDB | {{< X >}} |  | {{< X >}} |
| PostgreSQL |  |  | {{< X >}} |
| Temporal | {{< X >}} |  | {{< X >}} |

- **Remote Action** is the integration family under the `com.datadoghq.remoteaction` prefix. It includes network path actions and the rshell bundle, whose `runCommand` action runs shell commands through a restricted shell.
- **Script** actions are limited to *predefined* scripts declared in the runner's `script-config.yaml`. To configure script actions (`runPredefinedScript` for Linux or `runPredefinedPowershellScript` for Windows), see [Run a script with a private action runner][5].

{{% collapse-content title="Available actions by runner type" level="h3" %}}

{{< partial name="actions/private_actions_allowlist.html" >}}

{{% /collapse-content %}}

## Credential file formats

Some integrations, such as HTTP, Jenkins, PostgreSQL, MongoDB, and Temporal, require credentials to run. Credentials are supplied to the runner as JSON files that you reference from a [connection][6]. Each integration has its own credential file structure and supported authentication methods.

For the full set of credential file formats and examples, see [Handling private action credentials][7].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/private_actions/
[2]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/private_action_runner.yaml
[3]: /actions/private_actions/enroll_runner/
[4]: /actions/private_actions/execution_policies/
[5]: /actions/private_actions/run_script/
[6]: /actions/connections/
[7]: /actions/connections/private_action_credentials/
