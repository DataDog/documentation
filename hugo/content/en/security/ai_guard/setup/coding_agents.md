---
title: Coding Agents
description: Protect coding agents such as Claude Code, Codex, and Cursor with AI Guard through Trajectory hooks.
further_reading:
- link: /security/ai_guard/setup/
  tag: Documentation
  text: Set Up AI Guard
- link: /security/ai_guard/
  tag: Documentation
  text: AI Guard
- link: https://github.com/datadog-labs/trajectory
  tag: Source Code
  text: Trajectory
---

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">AI Guard isn't available in the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

{{< callout url="https://www.datadoghq.com/product-preview/coding-agent-security-guardrails/" header="Join the Preview!">}}
Coding Agent Runtime Protection is in Preview. Use this form to request access.
{{< /callout >}}

AI Guard can protect the coding agents that developers run on their computers, such as Claude Code, Codex, and Cursor. It evaluates the prompts, tool calls, and tool results of each coding agent session in real time, and can block unsafe actions before they run.

AI Guard treats the developer as trusted. It flags actions that don't match what the developer asked the coding agent to do, such as instructions hidden in files or web pages (indirect prompt injection), attempts to read or send credentials, destructive commands, and the installation of malicious packages.

## How it works

Coding agent protection runs inside [Trajectory][1], an open source tool from Datadog that connects to coding agents through their hooks.

1. Trajectory installs hooks in each coding agent that you select.
1. When the developer submits a prompt, or when the coding agent calls a tool or receives a tool result, the hook sends the recent conversation to AI Guard.
1. AI Guard evaluates the conversation against your [policies](#configure-policies) and returns an action: `ALLOW`, `DENY`, or `ABORT`.
1. If blocking is enabled and the action is `DENY` or `ABORT`, the hook stops the prompt or the tool call, and the developer sees the reason.

A block on a tool result can't undo the tool call that produced it. The block stops the coding agent from using the result.

Trajectory runs in observe mode, which records results without blocking, or in enforce mode, which can block actions. See [Configuration options](#configuration-options).

If an evaluation fails or times out, the coding agent continues with the action (fail-open).

## Supported coding agents

| Agent              | Guardrails¹     | Supply chain protection² | Sensitive data redaction³ |
|--------------------|-----------------|--------------------------|---------------------------|
| Claude Code        | Full            | Full                     | Monitoring only           |
| Codex              | Full            | Full                     | Monitoring only           |
| Cursor             | Full            | Full                     | Monitoring only           |
| GitHub Copilot CLI | Full            | Full                     | Monitoring only           |
| Kiro CLI           | Full⁴           | Full                     | Monitoring only           |
| Antigravity CLI    | Monitoring only | Monitoring only          | Monitoring only           |

¹ Guardrails evaluate prompts and tool calls.

² Supply chain protection analyzes package installations with [Supply Chain Firewall][16]. Skill scanning, which checks extensions such as skills, is in development.

³ Sensitive data redaction detects and blocks secrets.

⁴ Kiro CLI can't stop a prompt. When AI Guard blocks a prompt, Kiro CLI instructs the model to refuse it.

Coding agent protection supports the platforms that Trajectory supports. For agent versions and platform requirements, see [Supported Clients][2] in the Trajectory documentation.

## Prerequisites

1. Complete the [prerequisites][3] for AI Guard.
1. [Create an API key and an application key][4]. In addition to the `ai_guard_evaluate` scope, add the `appsec_vm_read` scope to the application key. Without this scope, AI Guard skips supply chain protection.

## Install and enable protection {#install}

{{< tabs >}}
{{% tab "Individual developers" %}}

1. Set your application key in an environment variable:

   ```bash
   export DD_APP_KEY=<YOUR_APPLICATION_KEY>
   ```

1. Run the Trajectory installer in observe mode:

   ```bash
   bash <(curl -fsSL https://raw.githubusercontent.com/datadog-labs/trajectory/main/install.sh) --security-mode observe
   ```

   When prompted, enter your Datadog site and your API key. The installer stores both keys in the operating system keychain, and enables protection for each supported coding agent it finds: Claude Code, Codex, Cursor, GitHub Copilot CLI, and Kiro CLI.

1. To protect Antigravity CLI, run `trajectory plugins security setup --clients agy`.
1. Restart your coding agents.

If you already use Trajectory, run the same command. The installer keeps your Trajectory configuration and adds coding agent protection.

To set other options at installation time, see [Configuration options](#configuration-options).

{{% /tab %}}
{{% tab "Managed fleets (MDM)" %}}

To deploy coding agent protection with an MDM or UEM product, such as Jamf Pro or Microsoft Intune, follow the [Managed Endpoint Administrator Guide][1].

[1]: https://github.com/datadog-labs/trajectory/blob/main/docs/MANAGED-ENDPOINTS.md
{{% /tab %}}
{{< /tabs >}}

### Enable protection without the installer

To enable protection with your own tooling, for example from a secrets vault, store both keys in the keychain and run the setup command:

```bash
<COMMAND_THAT_PRINTS_YOUR_API_KEY> | trajectory config set-secret dd_api_key --stdin
<COMMAND_THAT_PRINTS_YOUR_APPLICATION_KEY> | trajectory config set-secret dd_app_key --stdin
trajectory plugins security setup --mode observe --clients cc,codex,cursor
```

Replace the `--clients` value with the coding agents you want to protect:

| Coding agent       | Client ID |
|--------------------|-----------|
| Claude Code        | `cc`      |
| Codex              | `codex`   |
| Cursor             | `cursor`  |
| GitHub Copilot CLI | `copilot` |
| Kiro CLI           | `kiro`    |
| Antigravity CLI    | `agy`     |

## Configuration options {#configuration-options}

You can set the following options when you run the installer, or change them later with the Trajectory CLI. For managed fleets, set them in your managed configuration. See the [Managed Endpoint Administrator Guide][15].

### Mode {#mode}

The mode controls whether coding agent protection can block actions:
- `observe`: AI Guard evaluates each action and records the result, but doesn't block anything. Use this mode to review results and adjust your policies before you enable blocking.
- `enforce`: AI Guard can block actions. Blocking also requires a [blocking policy][7]. See [Enable blocking](#enable-blocking).

| When                   | How to set the mode                                                                             | Default   |
|------------------------|-------------------------------------------------------------------------------------------------|-----------|
| At installation        | Add `--security-mode <MODE>` to the installer command.                                          | `enforce` |
| After installation     | Run `trajectory plugins security setup --mode <MODE> --clients <CLIENT_IDS>`. Add `--yes` to confirm `enforce`. | `observe` |

Replace `<CLIENT_IDS>` with the [client IDs](#enable-protection-without-the-installer) of the coding agents you protect.

### Privacy mode {#privacy-mode}

The privacy mode controls which content Trajectory stores in Datadog with each evaluation result:
- `coding_agent`: Trajectory removes message content, and keeps only metadata such as the action, the reason, and the threat categories.
- `unredacted`: Trajectory stores the full prompts and tool content.

| When                   | How to set the privacy mode                                                                     | Default        |
|------------------------|-------------------------------------------------------------------------------------------------|----------------|
| At installation        | Add `--security-privacy <PRIVACY_MODE>` to the installer command.                               | `coding_agent` |
| After installation     | Run `trajectory plugins modules evaluator configure agent-security ai_guard --privacy-mode <PRIVACY_MODE>`. | `coding_agent` |

## Verify the installation {#verify}

1. Run `trajectory plugins security status` to check that protection is enabled, and in which mode.
1. Run `trajectory doctor` to check the Trajectory installation, including the keys. If Trajectory can't read the keys, evaluations fail and the coding agent continues without protection.
1. Start a session in a protected coding agent, then confirm that evaluations appear on the [AI Guard page][5].

## Configure policies {#configure-policies}

Coding agents have their own AI Guard policies, separate from the policies for custom agents. Coding agent policies use the same settings as [service policies][6], but they apply to a coding agent, such as Claude Code or Codex, instead of a service and environment:
- [Blocking policy][7]
- [Custom rules][8]
- [Sensitive data scanning][9]
- [Evaluation context][10]
- [Tool blocking][11]
- [Evaluation sensitivity][12]

To configure them, select {{< ui >}}Coding Agents{{< /ui >}} on the AI Guard {{< ui >}}Settings{{< /ui >}} pages. Coding agent policies use the following precedence, with more specific settings taking priority:
- **Organization-wide**: Apply a default policy to all coding agents.
- **Per coding agent**: Override the organization default for a specific coding agent.

For tool blocking, use the tool name that the coding agent uses, for example `Bash` for the shell tool in Claude Code. For sensitive data scanning, redaction is monitoring only: AI Guard reports findings, but Trajectory doesn't redact the data that the coding agent sends to the model.

## Enable blocking {#enable-blocking}

After you review the results in observe mode and adjust your policies:

1. Set the [blocking policy][7] for your coding agents to block unsafe requests.
1. On each developer computer, set the [mode](#mode) to `enforce`.

## View results {#view-results}

To view coding agent evaluations, go to the [AI Guard page][5] and filter on `@ai_guard.coding_agent:*`. To keep all evaluations, create the AI Guard [retention filter][13]. To restrict who can view them, see [Limit access to AI Guard spans][14].

## Disable protection {#disable}

To disable coding agent protection and remove its hooks, run the following command with the [client IDs](#enable-protection-without-the-installer) of the coding agents you protect. Trajectory observability continues to work.

```bash
trajectory plugins security disable --clients cc,codex,cursor --remove-hooks
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/datadog-labs/trajectory
[2]: https://github.com/datadog-labs/trajectory/blob/main/docs/SUPPORTED-CLIENTS.md
[3]: /security/ai_guard/setup/#1-check-prerequisites
[4]: /security/ai_guard/setup/#create-keys
[5]: https://app.datadoghq.com/security/ai-guard/
[6]: /security/ai_guard/setup/#service-policies
[7]: /security/ai_guard/setup/#blocking-policy
[8]: /security/ai_guard/setup/#custom-rules
[9]: /security/ai_guard/setup/#sensitive-data-scanning
[10]: /security/ai_guard/setup/#evaluation-context
[11]: /security/ai_guard/setup/#block-specific-tools
[12]: /security/ai_guard/setup/#evaluation-sensitivity
[13]: /security/ai_guard/setup/#retention-filter
[14]: /security/ai_guard/setup/#limit-access
[15]: https://github.com/datadog-labs/trajectory/blob/main/docs/MANAGED-ENDPOINTS.md
[16]: /security/code_security/software_composition_analysis/supply_chain_firewall/
