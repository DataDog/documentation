---
title: Private Actions Reference
description: Reference tables for private action runners, including runner configuration settings, the field-name crosswalk across host, Helm, and Operator installs, the supported actions and integrations matrix, and credential file formats.
disable_toc: false
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

This page is the single-source lookup for private action runners: the configuration settings you can set, the
actions and integrations each runner supports, and where to find credential file formats. For concepts and setup,
start with the [Private Actions Overview][1] and [Set up a private action runner][2].

## Runner configuration

The runner reads its settings from the `private_action_runner` section of its [configuration][8].
For how the enrollment settings (`self_enroll` and `api_key_only_enrollment`) fit into runner enrollment, see [Enrollment and ownership][7].

### Field-name crosswalk

The same setting is named differently depending on how you install the runner. Host installs use environment variables,
Helm uses camelCase keys under `privateActionRunner`, and the Datadog Operator uses snake_case keys under
`private_action_runner`. Use this table to translate the common settings across install methods.

| Setting | Host (environment variable) | Helm (`privateActionRunner.*`) | Operator (`private_action_runner.*`) |
|---|---|---|---|
| Enable | `DD_PRIVATE_ACTION_RUNNER_ENABLED` | `enabled` | `enabled` |
| Self-enroll | `DD_PRIVATE_ACTION_RUNNER_SELF_ENROLL` | `selfEnroll` | `self_enroll` |
| Actions allowlist | `DD_PRIVATE_ACTION_RUNNER_ACTIONS_ALLOWLIST` (comma-separated) | `actionsAllowlist` (list) | `actions_allowlist` (list) |

## Supported actions and integrations

The following matrix shows, for each integration, whether it is available in the runner in the Datadog Agent, available
in the standalone runner, and authorizable through [Execution Policies][3].

| Integration | Runner in the Agent | Authorizable through Execution Policies | Standalone runner |
|---|:---:|:---:|:---:|
| Kubernetes | Yes | Yes | Yes |
| Remote Action (rshell + network path) | Yes | Yes | Yes |
| Script | Yes | Yes | Yes |
| HTTP | Yes | No | Yes |
| GitLab | Yes | No | Yes |
| Jenkins | Yes | No | Yes |
| MongoDB | Yes | No | Yes |
| PostgreSQL | No | No | Yes |
| Temporal | Yes | No | Yes |

**"Available in the Agent" and "authorizable through Execution Policies" are different things.** The first column tells you
whether the integration can run in the runner in the Agent at all. The second column tells you whether that integration
can be authorized through an Execution Policy. An integration can be available in the Agent while not being authorizable
through Execution Policies today. Integrations that are authorizable through Execution Policies are **Kubernetes** and
**Remote Action** (the rshell `runCommand` action and network path actions).

Notes:

- **Remote Action** is the integration family under the `com.datadoghq.remoteaction` prefix. It includes the rshell
  bundle, whose `runCommand` action runs shell commands through the restricted shell (rshell), and network path actions.
- **Script** actions are limited to *predefined* scripts declared in the runner's
  `script-config.yaml`. See [Run a script with a private action runner][4].

### Available actions by runner type

{{% collapse-content title="Available actions by runner type" level="p" %}}

{{< partial name="actions/private_actions_allowlist.html" >}}

{{% /collapse-content %}}

**Note:** to configure script actions (`runPredefinedScript` for Linux or
`runPredefinedPowershellScript` for Windows), see [Run a script with a private action runner][4].

## Credential file formats

Some integrations, such as HTTP, Jenkins, PostgreSQL, MongoDB, and Temporal, require credentials to run. Credentials are
supplied to the runner as JSON files that you reference from a connection. Each integration has its own credential file
structure and supported authentication methods.

For the full set of credential file formats and examples, see [Handling private action credentials][5].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/private_actions/
[2]: /actions/private_actions/set_up_agent_based/
[3]: /actions/private_actions/execution_policies/
[4]: /actions/private_actions/run_script/
[5]: /actions/connections/private_action_credentials/
[6]: /actions/connections/
[7]: /actions/private_actions/enroll_runner/
[8]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/private_action_runner.yaml
