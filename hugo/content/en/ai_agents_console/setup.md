---
title: Set Up Agent Console
description: Connect coding agents, knowledge agents, and productivity tools to Datadog Agent Console, and map user identities across tools.
further_reading:
  - link: '/ai_agents_console/'
    tag: 'Documentation'
    text: 'Agent Console'
  - link: '/integrations/anthropic-usage-and-costs/'
    tag: 'Documentation'
    text: 'Anthropic Usage and Costs integration'
  - link: '/integrations/openai-codex/'
    tag: 'Documentation'
    text: 'OpenAI Codex integration'
  - link: '/integrations/openai/'
    tag: 'Documentation'
    text: 'OpenAI integration'
  - link: '/integrations/cursor/'
    tag: 'Documentation'
    text: 'Cursor integration'
  - link: "https://github.com/datadog-labs/trajectory"
    tag: "Source Code"
    text: "Trajectory"
---

{{< callout url="#" btn_hidden="true" header="Preview">}}
Agent Console is available to all Datadog customers in Preview.
{{< /callout >}}

To set up [Agent Console][1], connect the AI tools you want to monitor, optionally connect productivity tools, and map user identities across tools. The {{< ui >}}Setup{{< /ui >}} page in Agent Console {{< ui >}}Settings{{< /ui >}} tracks your progress through each step.

{{< img src="/ai_agents_console/setup_agent_console.png" alt="Agent Console Settings Setup page with a progress bar and steps to validate your data, map identities, connect your first agent, and connect productivity tools" style="width:100%;" >}}

## Permissions

Agent Console access is controlled by the following role permissions. Assign them to roles in [Organization Settings > Roles][2].

| Permission | Description |
|------------|-------------|
| `agent_console_read` | View Agent Console, including Overview, My Usage, Usage, and Settings. Users without this permission can't open Agent Console. |
| `agent_console_write` | Change Agent Console configuration, such as identity mapping and integration setup. |

## Connect AI tools

Select the AI tools to connect from the {{< ui >}}Set up your AI tools{{< /ui >}} page, which appears the first time you open Agent Console. Connect at least one tool to start seeing data. You can add more tools later.

{{< img src="/ai_agents_console/agent_console_onboarding.png" alt="Set up your AI tools page with cards for Trajectory, Cursor, Anthropic Products, GitHub Copilot, Codex, Microsoft Copilot, ChatGPT Work, and Another Integration" style="width:100%;" >}}

### Anthropic products

To monitor Claude Code, Claude Chat, Claude Cowork, and Claude Design, set up the [Anthropic Usage and Costs][3] integration. The integration collects daily spend and user analytics for each Claude product.

The Anthropic Usage and Costs integration doesn't support Claude Team plans. If your organization uses a Team plan, send Claude Code telemetry to Datadog with [OpenTelemetry](#claude-code-with-opentelemetry) instead.

### Claude Code with OpenTelemetry

Use OpenTelemetry (OTLP) to send Claude Code telemetry directly to Datadog. Data collected this way appears on the {{< ui >}}Claude Code (OTel){{< /ui >}} card in Agent Console.

To set up Agent Console for Claude Code across your organization, your IT team can use a Mobile Device Management (MDM) system or [server-managed settings][4] to distribute the Claude Code settings file across all managed devices.

{{< tabs >}}
{{% tab "Send directly to Datadog" %}}

1. Make sure that your [Logs configuration][1] includes a catch-all [index][2], or an index that covers `service:claude-code`.
2. Generate a [Datadog API key][3].
3. Set the following environment variables in your Claude Code settings file (for example, `~/.claude/settings.json`):

   ```json
   {
     "env": {
       "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
       "OTEL_LOGS_EXPORTER": "otlp",
       "OTEL_EXPORTER_OTLP_LOGS_PROTOCOL": "http/protobuf",
       "OTEL_EXPORTER_OTLP_LOGS_ENDPOINT": "{{< region-param key="otlp_logs_endpoint" >}}",
       "OTEL_METRICS_EXPORTER": "otlp",
       "OTEL_EXPORTER_OTLP_METRICS_PROTOCOL": "http/protobuf",
       "OTEL_EXPORTER_OTLP_METRICS_ENDPOINT": "{{< region-param key="otlp_metrics_endpoint" >}}",
       "OTEL_EXPORTER_OTLP_HEADERS": "dd-api-key=<DATADOG_API_KEY>"
     }
   }
   ```

   Replace `<DATADOG_API_KEY>` with your Datadog API key.
4. Restart Claude Code.

[1]: /logs/log_configuration/
[2]: /logs/log_configuration/indexes/
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Forward through the Datadog Agent" %}}

1. Make sure that your [Logs configuration][1] includes a catch-all [index][2], or an index that covers `service:claude-code`.
2. [Install the Datadog Agent][3].
3. Configure your Datadog Agent to enable the OpenTelemetry Collector:
   ```yaml
   otlp_config:
     receiver:
       protocols:
         grpc:
           endpoint: 0.0.0.0:4317
     logs:
       enabled: true
   otelCollector:
     enabled: true
   ```
4. Set the following environment variables in your Claude Code settings file (for example, `~/.claude/settings.json`):
   ```json
   {
     "env": {
       "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
       "OTEL_METRICS_EXPORTER": "otlp",
       "OTEL_LOGS_EXPORTER": "otlp",
       "OTEL_EXPORTER_OTLP_ENDPOINT": "http://127.0.0.1:4317",
       "OTEL_EXPORTER_OTLP_PROTOCOL": "grpc",
       "OTEL_METRIC_EXPORT_INTERVAL": "10000"
     }
   }
   ```
5. Restart Claude Code.

[1]: /logs/log_configuration/
[2]: /logs/log_configuration/indexes/
[3]: /agent/?tab=Host-based
{{% /tab %}}
{{< /tabs >}}

After you restart Claude Code, metrics (usage, cost, latency, errors) appear in Agent Console within a few minutes.

### Codex

To monitor Codex, set up the [OpenAI Codex][5] integration. The integration collects daily usage, credits, code attribution, and review analytics.

### ChatGPT Work

To monitor ChatGPT Work, set up the [OpenAI][12] integration. The integration collects activity, token, and estimated cost analytics.

### Cursor

To monitor Cursor, set up the [Cursor][6] integration using the Datadog Extension for Cursor. The integration collects spend metrics and user analytics once a day.

### GitHub Copilot

To monitor GitHub Copilot, set up the [GitHub Copilot][7] integration. The integration collects spend metrics and user analytics once a day.

### Microsoft Copilot 365

{{< callout url="#" btn_hidden="true" header="Preview">}}
Microsoft Copilot 365 support is in Preview. To request access, contact your Datadog account team.
{{< /callout >}}

The Microsoft Copilot integration collects daily Microsoft 365 Copilot adoption data and metadata-only interaction analytics.

### Other coding and desktop agents with Trajectory

[Trajectory][8] is an open source tool that captures sessions from more than 30 coding and desktop agents, such as Claude Code, Claude Desktop, Codex CLI, Cursor, Cline, Windsurf, and Zed, and sends them to Datadog. For the full list and version requirements, see [Supported Clients][9].

Trajectory session data powers the {{< ui >}}Tasks{{< /ui >}}, {{< ui >}}Skills{{< /ui >}}, {{< ui >}}Tools{{< /ui >}}, and {{< ui >}}Sessions{{< /ui >}} views in Agent Console.

{{< tabs >}}
{{% tab "Individual developers" %}}

Run the installer to install Trajectory for the current user:

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/datadog-labs/trajectory/main/install.sh)
```

The installer downloads the latest Trajectory release for your platform, runs `trajectory setup`, and connects the coding agents it finds. When prompted, enter a [Datadog API key][1] to send data to Datadog.

To configure the Datadog destination later, run:

```bash
trajectory publish destination configure
```

To upgrade Trajectory, rerun the installer.

[1]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Managed fleets (MDM)" %}}

To deploy Trajectory to developer computers with an MDM or UEM product such as Jamf Pro or Microsoft Intune, follow the [Managed Endpoint Administrator Guide][1]. The guide covers package preparation, policy deployment, coding agent selection, and verification.

[1]: https://github.com/datadog-labs/trajectory/blob/main/docs/MANAGED-ENDPOINTS.md
{{% /tab %}}
{{< /tabs >}}

### Request an integration

If the tool you want to monitor isn't listed, click {{< ui >}}Request an Integration{{< /ui >}} on the {{< ui >}}Set up your AI tools{{< /ui >}} page.

## Connect productivity tools

Optionally, connect productivity tools so Agent Console can show merged pull requests, time to merge, cost per pull request, and resolved issues alongside AI spend.

- **GitHub**: Set up the [GitHub][10] integration to collect pull request data.
- **Jira**: Set up the [Jira][11] integration to collect issue data.

## Map identities

Each AI tool identifies users differently, for example by email address, GitHub login, or Microsoft user principal name (UPN). Upload an identity mapping table so that usage and spend from every tool are attributed to the right person.

1. In Agent Console, go to {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Identity Mapping{{< /ui >}}.
2. Prepare a CSV file with one row per person and the following columns:

   | Column | Requirement |
   |--------|-------------|
   | `email` | Required |
   | `github_login` | Required if you use GitHub |
   | `microsoft_upn` | Optional |
   | `jira_account_id` | Optional |
   | `datadog_handle` | Optional |

   Separate multiple email aliases, GitHub logins, or Jira account IDs with semicolons. The first email is the canonical email.

   Choose any column with unique values, such as `email`, as the primary identifier. You can also add your own column for this purpose, such as an employee ID.
3. Upload the CSV file (maximum 10 MiB), preview the mapping, and save it.

{{< img src="/ai_agents_console/agent_console_identity_mapping.png" alt="Set up identity mappings dialog showing the required and optional CSV columns and a CSV upload area" style="width:100%;" >}}

## Validate your data

After you connect your tools, open the [Agent Console][1] and check that each connected integration shows as active on the {{< ui >}}Overview{{< /ui >}} tab. Most integrations collect data once a day, so data can take up to 24 hours to appear.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[2]: https://app.datadoghq.com/organization-settings/roles
[3]: /integrations/anthropic-usage-and-costs/
[4]: https://code.claude.com/docs/en/server-managed-settings
[5]: /integrations/openai-codex/
[6]: /integrations/cursor/?tab=datadogextensionforcursor
[7]: /integrations/github-copilot/
[8]: https://github.com/datadog-labs/trajectory
[9]: https://github.com/datadog-labs/trajectory/blob/main/docs/SUPPORTED-CLIENTS.md
[10]: /integrations/github/
[11]: /integrations/jira/
[12]: /integrations/openai/?tab=apikey
