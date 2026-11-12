---
title: Coding Agents
description: Protect coding agents such as Claude Code, Codex, and Cursor with AI Guard through Trajectory hooks.
private: true
further_reading:
- link: /security/ai_guard/setup/
  tag: Documentation
  text: Set Up AI Guard
- link: /security/ai_guard/policies/
  tag: Documentation
  text: Manage AI Guard Policies
- link: https://github.com/datadog-labs/trajectory
  tag: Source Code
  text: Trajectory
---

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">AI Guard isn't available in the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

{{< callout url="https://www.datadoghq.com/product-preview/coding-agent-security-guardrails/" header="false" >}}
AI Guard for coding agents is in Preview.
{{< /callout >}}

AI Guard can protect the coding agents that developers run on their computers, such as Claude Code, Codex, and Cursor. AI Guard evaluates the prompts, tool calls, and tool results of each coding agent session in real time, and can block unsafe actions before they run.

AI Guard treats the developer as trusted. AI Guard flags actions that don't match what the developer asked the coding agent to do, such as instructions hidden in files or web pages (indirect prompt injection), attempts to read or send credentials, destructive commands, and the installation of malicious packages.

## How AI Guard for coding agents works

AI Guard for coding agents runs inside [Trajectory][1], an open source tool from Datadog that connects to coding agents through their hooks.

1. Trajectory installs hooks in each coding agent that you select.
1. When the developer submits a prompt, or when the coding agent calls a tool or receives a tool result, the hook sends the recent conversation to AI Guard.
1. AI Guard evaluates the conversation using the settings in the applicable [policy](#configure-policies) and returns an `ALLOW` or `DENY` action, with the reason for it.
1. If blocking is turned on and the action is `DENY`, the hook stops the prompt or the tool call, and the developer sees the reason.

A block on a tool result can't undo the tool call that produced it. The block stops the coding agent from using the result.

Trajectory runs in observe mode, which records results without blocking, or in enforce mode, which can block actions. See the [Configuration options](#configuration-options) section.

## Supported coding agents

AI Guard supports these coding agents:

- Claude Code
- Codex
- Cursor
- GitHub Copilot CLI
- Kiro CLI

Kiro CLI can't stop a prompt. When AI Guard blocks a prompt, Kiro CLI instructs the model to refuse it.

AI Guard for coding agents supports the platforms that Trajectory supports. For agent versions and platform requirements, see [Supported Clients][3] in the Trajectory documentation.

## Supported features

AI Guard provides the following protections for coding agents:

- **Guardrails**: Checks each prompt and tool call for threats, such as prompt injection, credential theft, and destructive commands. AI Guard can block unsafe prompts and tool calls.
- **Supply chain protection**: Checks each package that a coding agent installs with [Supply Chain Firewall][2], and can block malicious packages. Protection for coding agent extensions, such as skills, is in development.
- **Sensitive data redaction**: Detects secrets, such as API keys and passwords, in coding agent sessions. This feature is monitoring only: AI Guard reports secrets, but doesn't block or redact them. Blocking secrets is in development.

Guardrails and supply chain protection block actions only after you [turn on blocking](#turn-on-blocking).

## Prerequisites

AI Guard for coding agents doesn't use the Datadog Agent or the Datadog SDK. Trajectory sends evaluations to Datadog directly from each developer computer.

1. Confirm you have the AI Guard [permissions][4].
1. [Create an API key and an application key][5]. In addition to the `ai_guard_evaluate` scope, add the `appsec_vm_read` scope to the application key. Without this scope, AI Guard skips supply chain protection.

## Install and enable AI Guard for coding agents {#install}

{{< tabs >}}
{{% tab "Individual developers" %}}

1. Set your API key and application key in environment variables:

   ```bash
   export DD_API_KEY=<YOUR_API_KEY>
   export DD_APP_KEY=<YOUR_APPLICATION_KEY>
   ```

1. Run the Trajectory installer in observe mode, with the unredacted privacy mode:

   ```bash
   bash <(curl -fsSL https://raw.githubusercontent.com/datadog-labs/trajectory/main/install.sh) --security-mode observe --security-privacy unredacted
   ```

   When prompted, select your Datadog site. The installer stores both keys in the operating system keychain, and turns on AI Guard for each supported coding agent it finds: Claude Code, Codex, Cursor, GitHub Copilot CLI, and Kiro CLI.

1. Restart your coding agents.

If you already use Trajectory, run the same command. The installer keeps your Trajectory configuration and adds AI Guard for coding agents.

To set other options at installation time, see the [Configuration options](#configuration-options) section.

{{% /tab %}}
{{% tab "Managed fleets (MDM)" %}}

To deploy AI Guard for coding agents with an MDM or UEM product, such as Jamf Pro or Microsoft Intune, follow the [Managed Endpoint Administrator Guide][1].

[1]: https://github.com/datadog-labs/trajectory/blob/main/docs/MANAGED-ENDPOINTS.md
{{% /tab %}}
{{< /tabs >}}

### Enable AI Guard without the installer

To turn on AI Guard with your own tooling, for example from a secrets vault, store both keys in the keychain and run the setup command:

```bash
<COMMAND_THAT_PRINTS_YOUR_API_KEY> | trajectory config set-secret dd_api_key --stdin
<COMMAND_THAT_PRINTS_YOUR_APPLICATION_KEY> | trajectory config set-secret dd_app_key --stdin
trajectory plugins security setup --mode observe --clients cc,codex,cursor
```

Replace the `--clients` value with the client IDs of the coding agents you want to protect:

| Coding agent       | Client ID |
|--------------------|-----------|
| Claude Code        | `cc`      |
| Codex              | `codex`   |
| Cursor             | `cursor`  |
| GitHub Copilot CLI | `copilot` |
| Kiro CLI           | `kiro`    |

## Configuration options {#configuration-options}

You can set the following options when you run the installer, or change them later with the Trajectory CLI. For managed fleets, set them in your managed configuration. See the [Managed Endpoint Administrator Guide][6].

### Mode {#mode}

The mode controls whether AI Guard can block coding agent actions:
- `observe` (default): AI Guard evaluates each action and records the result, but doesn't block anything. Use this mode to review results and adjust your policies before you turn on blocking.
- `enforce`: AI Guard can block actions. Blocking also requires the policy enforcement mode to be {{< ui >}}Block unsafe{{< /ui >}}. See the [Turn on blocking](#turn-on-blocking) section.

| When               | Flag or command                     |
|--------------------|-------------------------------------|
| At installation    | `--security-mode <MODE>`            |
| After installation | `trajectory plugins security setup` |

To change the mode after installation, run the following command. Replace `<CLIENT_IDS>` with the [client IDs](#enable-ai-guard-without-the-installer) of the coding agents you protect, and add `--yes` to confirm `enforce`:

```bash
trajectory plugins security setup --mode <MODE> --clients <CLIENT_IDS>
```

### Privacy mode {#privacy-mode}

The privacy mode controls which content Trajectory stores in Datadog with each evaluation result:
- `coding_agent` (default): Trajectory removes message content, and keeps only metadata such as the action, the reason, and the attack categories.
- `unredacted`: Trajectory stores the full prompts and tool content.

| When               | Flag or command                                  |
|--------------------|--------------------------------------------------|
| At installation    | `--security-privacy <PRIVACY_MODE>`              |
| After installation | `trajectory plugins modules evaluator configure` |

To change the privacy mode after installation, run:

```bash
trajectory plugins modules evaluator configure agent-security ai_guard --privacy-mode <PRIVACY_MODE>
```

## Verify the installation {#verify}

1. Run `trajectory plugins security status` to check that AI Guard is turned on, and in which mode.
1. Run `trajectory doctor` to check the Trajectory installation, including the keys. If Trajectory can't read the keys, evaluations fail and the coding agent continues without protection.
1. Start a session in a protected coding agent, then confirm that its evaluations appear on the AI Guard [{{< ui >}}Investigate{{< /ui >}}][7] tab.

## Configure policies {#configure-policies}

Coding agents have their own AI Guard policies, separate from the policies for custom agents. Coding agent policies have the same [policy settings][8] as custom agent policies, but their scope is a coding agent, such as Claude Code or Codex, instead of a service and environment.

To manage coding agent policies, select {{< ui >}}Coding Agents{{< /ui >}} on the AI Guard {{< ui >}}Policies{{< /ui >}} tab, then [edit or create a policy][9]. Policies range from least to most specific:

1. Default policy, which applies to every coding agent
1. Policy for a specific coding agent

When more than one policy matches a request, AI Guard applies the most specific one. Inheritance works the same as for custom agent policies. See [Policy scope and inheritance][10].

For [tools policies][11], use the tool name that the coding agent uses, for example `Bash` for the shell tool in Claude Code. For [sensitive data scanning][12], redaction is monitoring only: AI Guard reports findings, but Trajectory doesn't redact the data that the coding agent sends to the model.

## Turn on blocking {#turn-on-blocking}

After you review the results in observe mode and adjust your policies:

1. In the coding agent policy, set {{< ui >}}Enforcement mode{{< /ui >}} to {{< ui >}}Block unsafe{{< /ui >}}. See [Edit or create a policy][9].
1. On each developer computer, set the [mode](#mode) to `enforce`.

Trajectory handles blocked requests in each coding agent, so blocking doesn't require changes to the coding agents.

## View results {#view-results}

To view coding agent evaluations, go to the AI Guard [{{< ui >}}Investigate{{< /ui >}}][7] tab and filter on `@ai_guard.coding_agent:*`. To keep every evaluation, [create a retention filter for AI Guard spans][13]. To restrict who can view the evaluations, see [Limit access to AI Guard spans][14].

## Disable AI Guard for coding agents {#disable}

To turn off AI Guard for coding agents and remove its hooks, run the following command with the [client IDs](#enable-ai-guard-without-the-installer) of the coding agents you protect. Trajectory observability continues to work.

```bash
trajectory plugins security disable --clients cc,codex,cursor --remove-hooks
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/datadog-labs/trajectory
[2]: /security/code_security/software_composition_analysis/supply_chain_firewall/
[3]: https://github.com/datadog-labs/trajectory/blob/main/docs/SUPPORTED-CLIENTS.md
[4]: /security/ai_guard/setup/#permissions
[5]: /security/ai_guard/setup/#create-keys
[6]: https://github.com/datadog-labs/trajectory/blob/main/docs/MANAGED-ENDPOINTS.md
[7]: https://app.datadoghq.com/security/ai-guard/
[8]: /security/ai_guard/policies/#policy-settings
[9]: /security/ai_guard/policies/#edit-or-create-a-policy
[10]: /security/ai_guard/policies/#policy-scope-and-inheritance
[11]: /security/ai_guard/policies/#tools-policies
[12]: /security/ai_guard/policies/#sensitive-data-scanning
[13]: /security/ai_guard/setup/#retention-filter
[14]: /security/ai_guard/setup/#limit-access
