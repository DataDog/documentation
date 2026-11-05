---
title: Set Up Coding Agent Runtime Protection
description: Install Trajectory, enable AI Guard for your coding agents, and configure policies for each coding agent.
further_reading:
- link: /security/ai_guard/coding_agents/
  tag: Documentation
  text: Coding Agent Runtime Protection
- link: /security/ai_guard/setup/
  tag: Documentation
  text: Set Up AI Guard
- link: /ai_agents_console/setup/
  tag: Documentation
  text: Set Up Agent Console
---

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">AI Guard isn't available in the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

{{< callout url="https://www.datadoghq.com/product-preview/coding-agent-security-guardrails/" header="Join the Preview!">}}
Coding Agent Runtime Protection is in Preview. Use this form to request access.
{{< /callout >}}

Complete the following steps to set up [Coding Agent Runtime Protection][1]. Start in observe mode, review the results, then enable blocking.

## 1. Check prerequisites

- Your Datadog organization has access to the Coding Agent Runtime Protection Preview.
- You have the following Datadog permissions. An admin may need to create a role with these permissions and assign it to you:

  | Permission                                                | Type  | Description                                                                                                         |
  |-----------------------------------------------------------|-------|---------------------------------------------------------------------------------------------------------------------|
  | **AI Guard Evaluate** (`ai_guard_evaluate`)               | Write | Required to create an application key with the `ai_guard_evaluate` scope.                                           |
  | **AI Guard View** (`ai_guard_view`)                       | Read  | Required to view AI Guard evaluations, signals, and settings.                                                       |
  | **AI Guard Write** (`ai_guard_write`)                     | Write | Required to change AI Guard policies.                                                                               |
  | **Vulnerability Management Read** (`appsec_vm_read`)      | Read  | Required to create an application key with the `appsec_vm_read` scope, which supply chain protection uses.          |

- Each developer computer runs a coding agent and a platform that Trajectory supports. See [Supported Clients][2] in the Trajectory documentation.

## 2. Create API and application keys {#create-keys}

Follow the instructions at [API and Application Keys][3] to create:
- An API key.
- An application key with the `ai_guard_evaluate` and `appsec_vm_read` [scopes][4].

<div class="alert alert-info">If the application key doesn't have the <code>appsec_vm_read</code> scope, AI Guard skips supply chain protection. Other evaluations still run.</div>

Trajectory stores both keys in the operating system keychain of each developer computer.

## 3. Install Trajectory and enable protection {#install}

{{< tabs >}}
{{% tab "Individual developers" %}}

1. Set your application key in an environment variable:

   ```bash
   export DD_APP_KEY=<YOUR_APPLICATION_KEY>
   ```

1. Run the installer in observe mode:

   ```bash
   bash <(curl -fsSL https://raw.githubusercontent.com/datadog-labs/trajectory/main/install.sh) --security-mode observe
   ```

   The installer downloads the latest Trajectory release, runs `trajectory setup`, and connects the coding agents it finds. When prompted, enter your Datadog site and your API key. The installer then stores the application key and enables protection for each supported coding agent it finds: Claude Code, Codex, Cursor, GitHub Copilot CLI, and Kiro CLI.

1. To protect Antigravity CLI, run:

   ```bash
   trajectory plugins security setup --clients agy
   ```

1. Restart your coding agents.

<div class="alert alert-warning">If you don't set <code>--security-mode observe</code>, the installer enables protection in enforce mode, which can block actions immediately.</div>

### If you already use Trajectory

If you installed Trajectory for [Agent Console][1], run the installer again with the same command. The installer keeps your Trajectory configuration and adds Coding Agent Runtime Protection.

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

To preview the changes before you apply them, run `trajectory plugins security install-plan --clients <CLIENT_IDS>`.

[1]: /ai_agents_console/setup/#other-coding-and-desktop-agents-with-trajectory
{{% /tab %}}
{{% tab "Managed fleets (MDM)" %}}

To deploy Coding Agent Runtime Protection to developer computers with an MDM or UEM product, such as Jamf Pro or Microsoft Intune, follow the [Managed Endpoint Administrator Guide][1]. The guide covers package preparation, key provisioning, policy deployment, coding agent selection, and verification.

[1]: https://github.com/datadog-labs/trajectory/blob/main/docs/MANAGED-ENDPOINTS.md
{{% /tab %}}
{{< /tabs >}}

### Store full message content

By default, Trajectory removes message content from the evaluation results that it stores in Datadog. To store the full prompts and tool content, add `--security-privacy unredacted` to the installer command, or run:

```bash
trajectory plugins modules evaluator configure agent-security ai_guard --privacy-mode unredacted
```

## 4. Verify the installation {#verify}

1. Check that protection is enabled, and in which mode:

   ```bash
   trajectory plugins security status
   ```

1. Check the Trajectory installation, including the keys:

   ```bash
   trajectory doctor
   ```

1. Start a session in a protected coding agent, then confirm that evaluations appear on the [AI Guard page][5].

<div class="alert alert-info">If Trajectory can't read the keys, evaluations fail and the coding agent continues without protection. <code>trajectory doctor</code> reports this problem.</div>

## 5. Configure policies {#configure-policies}

Coding agents have their own AI Guard policies, separate from the policies for custom agents. Changes to coding agent policies don't affect your custom agents, and the reverse is also true.

### Configure coding agent policies {#coding-agent-policies}

On the {{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Services{{< /ui >}}][6] page, select {{< ui >}}Coding Agents{{< /ui >}}. For each policy, you determine:
- [{{< ui >}}Enforcement mode{{< /ui >}}](#blocking-policy): Monitor only, or block unsafe requests
- [{{< ui >}}Custom rules{{< /ui >}}](#custom-rules): Keywords and regular expressions that AI Guard always flags as unsafe
- [{{< ui >}}Sensitive data scanning{{< /ui >}}](#sensitive-data-scanning): Whether AI Guard scans for sensitive data
- [{{< ui >}}Evaluation context{{< /ui >}}](#evaluation-context): Additional information about how your developers use coding agents, which AI Guard uses to reduce false positives

Beside {{< ui >}}Default policy{{< /ui >}}, click {{< ui >}}Edit{{< /ui >}} to set AI Guard's default behavior for all coding agents. To override the default behavior for one coding agent, click {{< ui >}}Add Coding Agent Policy{{< /ui >}}, select the coding agent, such as Claude Code or Codex, then configure the more specialized policy.

Coding agent policies use the following precedence, with more specific settings taking priority:
- **Organization-wide**: Apply a default policy to all coding agents.
- **Per coding agent**: Override the organization default for a specific coding agent.

#### Blocking policy {#blocking-policy}

By default, AI Guard evaluates coding agent actions and returns an action (`ALLOW`, `DENY`, or `ABORT`) but doesn't block them. To block unsafe actions, both of the following are required:
- The blocking policy for the coding agent is set to block unsafe requests.
- Trajectory runs in enforce mode on the developer computer. See [Enable blocking](#enable-blocking).

#### Custom rules {#custom-rules}

Custom rules flag messages that match a keyword or a regular expression as unsafe. Unlike [evaluation sensitivity](#evaluation-sensitivity) and [evaluation context](#evaluation-context), custom rules are deterministic: a message that matches a rule is always flagged. Custom rules require an exact match, so they don't detect variations of the content you want to block.

AI Guard checks custom rules against the last message in each evaluation call, including prompts, assistant responses, tool call arguments, and tool call results. When a message matches a rule, AI Guard returns `DENY` with the `regexp-blocked` attack category, and the `reason` names the rule that matched. Whether AI Guard blocks the action depends on the [blocking policy](#blocking-policy).

When you create or edit a policy, add rules under {{< ui >}}Custom Rules{{< /ui >}}:
- {{< ui >}}Keywords{{< /ui >}}: Words or phrases to flag. Matching ignores case and matches whole words only. For example, `confidential` matches `Confidential` but not `confidentiality`. All keywords combined are limited to 1,000 characters.
- {{< ui >}}Regular expressions{{< /ui >}}: Click {{< ui >}}Add an Expression{{< /ui >}}, then enter a name and a pattern. Each pattern is limited to 1,000 characters, and uses the [Sensitive Data Scanner regex syntax][7]. The name is optional, but Datadog recommends it: AI Guard displays it when a rule matches.

A coding agent policy inherits the custom rules of the default policy. To replace them, turn on the {{< ui >}}Overridden{{< /ui >}} toggle. The inherited rules stay in the form, so you can keep, edit, or remove them. The policy doesn't merge its rules with the default rules.

#### Sensitive data scanning {#sensitive-data-scanning}

AI Guard can detect personally identifiable information (PII), such as email addresses and phone numbers, and secrets, such as API keys and tokens, in coding agent sessions. When you create or edit a policy, you can enable or disable sensitive data scanning.

When scanning is enabled, AI Guard scans the last message in each evaluation call, including prompts, assistant responses, tool call arguments, and tool call results. Findings appear on the evaluation for visibility.

<div class="alert alert-info">For coding agents, sensitive data redaction is monitoring only: AI Guard reports sensitive data findings, but Trajectory doesn't redact the data that the coding agent sends to the model.</div>

To customize which [scanning rules][8] AI Guard uses, go to {{< ui >}}Security{{< /ui >}} > {{< ui >}}Sensitive Data Scanner{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}} > [{{< ui >}}AI Guard{{< /ui >}}][9].

#### Evaluation context {#evaluation-context}

You can give AI Guard additional context about how your developers use coding agents, such as the type of projects they work on and the operations they run. AI Guard uses this context to distinguish expected developer work from genuine threats, which helps reduce false positives.

To add evaluation context, edit the default policy or a coding agent policy, then enter your context in the {{< ui >}}Evaluation context{{< /ui >}} field (up to 1,000 characters). For example:

```text
Developers in this organization maintain infrastructure code. Running terraform plan and kubectl get commands against staging clusters is expected.
```

Evaluation context follows the same precedence as the other policy settings: organization-wide, then per coding agent.

### Block specific tools {#block-specific-tools}

You can configure AI Guard to block specific tools for a coding agent. Go to {{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Tool Blocklist{{< /ui >}}][10] and select {{< ui >}}Coding Agents{{< /ui >}}. Click {{< ui >}}Add Tool Blocking Configuration{{< /ui >}}, select the coding agent and the tool, and choose whether AI Guard follows the coding agent policy or blocks all requests for the tool.

Use the tool name that the coding agent uses, for example `Bash` for the shell tool in Claude Code.

### Evaluation sensitivity {#evaluation-sensitivity}

AI Guard assigns a confidence score to each threat category it detects. You can control the minimum confidence score required for AI Guard to flag a threat for each coding agent by going to {{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Evaluation Sensitivity{{< /ui >}}][11] and selecting {{< ui >}}Coding Agents{{< /ui >}}.

Evaluation sensitivity is a value between 0.0 and 1.0, with a default of 0.5.
- A **lower** value **increases** sensitivity: AI Guard flags threats even when the confidence is low, surfacing more potential attacks but also more false positives.
- A **higher** value **decreases** sensitivity: AI Guard only flags threats when the confidence is high, reducing noise but potentially missing some attacks.

## 6. Enable blocking {#enable-blocking}

After you review the results in observe mode and adjust your policies:

1. Set the [blocking policy](#blocking-policy) for your coding agents to block unsafe requests.
1. On each developer computer, switch Trajectory to enforce mode:

   ```bash
   trajectory plugins security setup --mode enforce --clients cc,codex,cursor --yes
   ```

   Replace the `--clients` value with the [client IDs](#install) of the coding agents you protect. The `--yes` flag confirms that Trajectory can block actions.

For managed fleets, set the mode in your managed configuration. See the [Managed Endpoint Administrator Guide][12].

## 7. View results {#view-results}

To view coding agent evaluations, go to the [AI Guard page][5] and filter on `@ai_guard.coding_agent:*`. Each evaluation shows the coding agent, the action, the reason, and the detected threat categories.

To keep all AI Guard evaluations, create the [custom retention filter][13] for AI Guard spans. To get alerts on blocked actions, set up [Datadog Monitors][14].

## Disable protection {#disable}

To disable Coding Agent Runtime Protection and remove its hooks, run:

```bash
trajectory plugins security disable --clients cc,codex,cursor --remove-hooks
```

Replace the `--clients` value with the [client IDs](#install) of the coding agents you protect. Trajectory observability continues to work.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/ai_guard/coding_agents/
[2]: https://github.com/datadog-labs/trajectory/blob/main/docs/SUPPORTED-CLIENTS.md
[3]: /account_management/api-app-keys/
[4]: /account_management/api-app-keys/#scopes
[5]: https://app.datadoghq.com/security/ai-guard/
[6]: https://app.datadoghq.com/security/ai-guard/settings/services
[7]: /security/sensitive_data_scanner/scanning_rules/custom_rules/
[8]: /security/sensitive_data_scanner/scanning_rules/
[9]: https://app.datadoghq.com/sensitive-data-scanner/configuration/ai-guard
[10]: https://app.datadoghq.com/security/ai-guard/settings/tools
[11]: https://app.datadoghq.com/security/ai-guard/settings/evaluation-sensitivity
[12]: https://github.com/datadog-labs/trajectory/blob/main/docs/MANAGED-ENDPOINTS.md
[13]: /security/ai_guard/setup/#retention-filter
[14]: /security/ai_guard/onboarding/#set-up-datadog-monitors
