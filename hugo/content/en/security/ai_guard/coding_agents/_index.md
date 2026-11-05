---
title: Coding Agent Runtime Protection
description: Protect coding agents such as Claude Code, Codex, and Cursor against prompt injection, credential theft, destructive commands, and malicious packages with AI Guard.
further_reading:
- link: /security/ai_guard/coding_agents/setup/
  tag: Documentation
  text: Set Up Coding Agent Runtime Protection
- link: /security/ai_guard/
  tag: Documentation
  text: AI Guard
- link: /ai_agents_console/
  tag: Documentation
  text: Agent Console
- link: https://github.com/datadog-labs/trajectory
  tag: Source Code
  text: Trajectory
---

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">AI Guard isn't available in the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

{{< callout url="https://www.datadoghq.com/product-preview/coding-agent-security-guardrails/" header="Join the Preview!">}}
Coding Agent Runtime Protection is in Preview. Use this form to request access.
{{< /callout >}}

Coding Agent Runtime Protection uses [AI Guard][1] to secure the coding agents that developers run on their computers, such as Claude Code, Codex, and Cursor. It evaluates the prompts, tool calls, and tool results of each coding agent session in real time, and can block unsafe actions before they run.

Coding agents read untrusted content, such as repository files, web pages, package metadata, and tool output, and they can run commands with the permissions of the developer. Coding Agent Runtime Protection helps you detect and stop attacks that use this access.

## Threats that AI Guard detects

AI Guard treats the developer as trusted. It flags actions that do not match what the developer asked the coding agent to do, such as:

- **Indirect prompt injection**: Instructions hidden in files, web pages, tool output, or skills that try to take control of the coding agent.
- **Credential access and data exfiltration**: Attempts to read secrets, such as cloud credentials or SSH keys, or to send data to an external destination.
- **Destructive commands**: Commands that delete data, damage the environment, or use resources in an abusive way.
- **Malicious execution**: Attempts to download and run untrusted code.
- **Privilege escalation**: Attempts to get more permissions than the task needs.
- **Persistence**: Changes to agent configuration, hooks, or shell profiles that keep an attacker's access across sessions.
- **Malicious packages**: Installation of packages that the Datadog Supply Chain Firewall identifies as malicious. See [Supported coding agents](#supported-coding-agents).

AI Guard can also detect sensitive data, such as secrets and personally identifiable information (PII), in coding agent sessions. See [Sensitive data scanning][2].

## How it works

Coding Agent Runtime Protection runs inside [Trajectory][3], an open source tool from Datadog that connects to coding agents through their hooks.

1. Trajectory installs hooks in each coding agent that you select.
1. When the developer submits a prompt, or when the coding agent calls a tool or receives a tool result, the hook sends the recent conversation to the AI Guard evaluation API.
1. AI Guard evaluates the conversation against your [policies][4] and returns an action: `ALLOW`, `DENY`, or `ABORT`.
1. If blocking is enabled and the action is `DENY` or `ABORT`, the hook stops the prompt or the tool call. The developer sees a message that explains why AI Guard blocked the action.
1. Trajectory sends the evaluation results to Datadog, where you can investigate them on the [AI Guard page][5].

### What AI Guard evaluates

AI Guard evaluates:
- Prompts that the developer submits
- Tool calls, such as shell commands, file operations, and MCP tool calls, before they run
- Tool results, after the tool runs
- Messages from the assistant

A block on a tool result can't undo the tool call that produced it. The block stops the coding agent from using the result.

### Monitoring and blocking

Coding Agent Runtime Protection has two modes:
- **Observe**: AI Guard evaluates each action and records the result, but doesn't block anything. Use this mode to review results and adjust your policies before you enable blocking.
- **Enforce**: AI Guard can block actions. Blocking also requires a [blocking policy][6] for the coding agent in your AI Guard settings.

If an evaluation fails or times out, the coding agent continues with the action (fail-open). This behavior keeps a network or service problem from stopping developer work.

## Supported coding agents

| Agent              | Guardrails      | Supply chain protection | Sensitive data redaction |
|--------------------|-----------------|-------------------------|--------------------------|
| Claude Code        | Full            | Full                    | Monitoring only          |
| Codex              | Full            | Full                    | Monitoring only          |
| Cursor             | Full            | Full                    | Monitoring only          |
| GitHub Copilot CLI | Full            | Full                    | Monitoring only          |
| Kiro CLI           | Full¹           | Full                    | Monitoring only          |
| Antigravity CLI    | Monitoring only | Monitoring only         | Monitoring only          |

¹ Kiro CLI can't stop a prompt. When AI Guard blocks a prompt, Kiro CLI instructs the model to refuse it.

<div class="alert alert-info">Supply chain protection checks the packages that a coding agent installs. Skill scanning, which checks extensions such as skills, is in development.</div>

Coding Agent Runtime Protection supports the platforms that Trajectory supports. For agent versions and platform requirements, see [Supported Clients][7] in the Trajectory documentation.

## Data and privacy

Trajectory sends the recent conversation of each coding agent session to AI Guard for evaluation, including prompts, tool calls, and tool results. By default, Trajectory removes message content from the evaluation results that it stores in Datadog, and keeps only the metadata, such as the action, the reason, and the detected threat categories. To store the full message content, see [Set Up Coding Agent Runtime Protection][8].

To restrict who can view AI Guard evaluations, see [Limit access to AI Guard spans][9].

## Next steps

To install and configure Coding Agent Runtime Protection, see [Set Up Coding Agent Runtime Protection][8].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/ai_guard/
[2]: /security/ai_guard/coding_agents/setup/#sensitive-data-scanning
[3]: https://github.com/datadog-labs/trajectory
[4]: /security/ai_guard/coding_agents/setup/#configure-policies
[5]: https://app.datadoghq.com/security/ai-guard/
[6]: /security/ai_guard/coding_agents/setup/#blocking-policy
[7]: https://github.com/datadog-labs/trajectory/blob/main/docs/SUPPORTED-CLIENTS.md
[8]: /security/ai_guard/coding_agents/setup/
[9]: /security/ai_guard/setup/#limit-access
