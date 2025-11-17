---
title: Set Up the Datadog MCP Server
description: "Learn how to set up and configure the Datadog MCP Server to connect your AI agents to Datadog observability tools and data."
private: true
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-remote-mcp-server/"
  tag: "Blog"
  text: "Connect your AI agents to Datadog tools and context using the Datadog MCP Server"
- link: "bits_ai/mcp_server"
  tag: "Documentation"
  text: "Datadog MCP Server"
- link: "developers/ide_plugins/vscode/?tab=cursor"
  tag: "Documentation"
  text: "Datadog Extension for Cursor"
- link: "https://www.datadoghq.com/blog/datadog-cursor-extension/"
  tag: "Blog"
  text: "Debug live production issues with the Datadog Cursor extension"
- link: "https://www.datadoghq.com/blog/openai-datadog-ai-devops-agent/"
  tag: "Blog"
  text: "Datadog + OpenAI: Codex CLI integration for AI‑assisted DevOps"
---

{{< callout url="https://www.datadoghq.com/product-preview/datadog-mcp-server/" >}}
The Datadog MCP Server is in Preview. There is no charge for using the Datadog MCP Server during the Preview. If you're interested in this feature and need access, complete this form. Learn more about the MCP Server on the <a href="https://www.datadoghq.com/blog/datadog-remote-mcp-server/">Datadog blog</a>.
{{< /callout >}}

## Disclaimers

- The Datadog MCP Server is not supported for production use during the Preview.
- Only Datadog organizations that have been specifically allowlisted can use the Datadog MCP Server. It is not available to the general public.
- The Datadog MCP Server is not available for organizations that require HIPAA compliance.
- Datadog collects certain information about your usage of the Remote Datadog MCP Server, including how you interact with it, whether errors occurred while using it, what caused those errors, and user identifiers in accordance with the <a href="https://www.datadoghq.com/legal/privacy/" target="_blank">Datadog Privacy Policy</a> and Datadog's <a href="https://www.datadoghq.com/legal/eula/" target="_blank">EULA</a>. This data is used to help improve the server's performance and features, including transitions to and from the server and the applicable Datadog login page for accessing the Services, and context (for example, user prompts) leading to the use of MCP tools. The data is stored for 120 days.

## Overview

Datadog's managed MCP Server acts as a bridge between your observability data in Datadog and AI agents that support the [Model Context Protocol (MCP)][1]. Providing structured access to relevant Datadog contexts, features, and tools, the MCP Server lets you query and retrieve observability insights directly from AI-powered clients such as Cursor, OpenAI Codex, Claude Code, or your own AI agent.

This page provides instructions for connecting your AI agent to the Datadog MCP Server, lists the available tools, and includes example prompts.

This demo shows the Datadog MCP Server being used in Cursor and Claude Code (unmute for audio):

{{< img src="bits_ai/mcp_server/mcp_cursor_demo_3.mp4" alt="Demo of Datadog MCP Server in Cursor and Claude Code" video="true" >}}

## Client compatibility

The following AI clients are compatible with the Datadog MCP Server.

<div class="alert alert-info">The Datadog MCP Server is under significant development, and additional supported clients may become available.</div>

| Client | Developer | Notes |
|--------|------|------|
| [Cursor][8] | Anysphere | Datadog [Cursor & VS Code extension](#connect-in-cursor-and-vs-code) recommended. |
| [Claude Code][5] | Anthropic | |
| [Claude&nbsp;Desktop][6] | Anthropic | Limited support for remote authentication. Use [local binary authentication](?tab=localbinaryauthentication#connect-in-supported-ai-clients) as needed. |
| [Codex CLI][7] | OpenAI | |
| [VS Code][11] | Microsoft | Datadog [Cursor & VS Code extension](#connect-in-cursor-and-vs-code) recommended. |
| [Goose][9] | Block | |
| [Q CLI][10] | Amazon | For remote authentication, add `"oauthScopes": []` to the server [configuration](?tab=remoteauthentication#example-configurations). |
| [Kiro][22] | Amazon | |
| [Cline][18] | Cline Bot | Limited support for remote authentication. Use [local binary authentication](?tab=localbinaryauthentication#connect-in-supported-ai-clients) as needed. |

## Requirements

Datadog users must have the `Incidents Read` [permission][19] to use the MCP Server.

## Connect in Cursor and VS Code

Datadog's [Cursor and VS Code extension][12] includes built-in access to the managed Datadog MCP Server. Benefits include:

* No additional MCP Server setup after you install the extension and connect to Datadog.
* One-click transitions between multiple Datadog organizations.
* [Cursor only] Better fixes from **Fix in Chat** on Code Insights (issues from Error Tracking, Code Vulnerabilities, and Library Vulnerabilities), informed by context from the MCP Server.

To install the extension:

1. If you previously installed the Datadog MCP Server manually, remove it from the IDE's configuration to avoid conflicts. To find the MCP Server configuration:
   - Cursor: Go to **Cursor Settings** (`Shift` + `Cmd/Ctrl` + `J`) and select the **MCP** tab.
   - VS Code: Open the command palette (`Shift` + `Cmd/Ctrl` + `P`) and run `MCP: Open User Configuration`.
2. Install the Datadog extension following [these instructions][14]. If you have the extension installed already, make sure it's the latest version, as new features are released regularly.
3. Sign in to your Datadog account. If you have multiple accounts, use the account included in your Product Preview.
    {{< img src="bits_ai/mcp_server/ide_sign_in.png" alt="Sign in to Datadog from the IDE extension" style="width:70%;" >}}
4. **Restart the IDE.**
5. Confirm the Datadog MCP Server is available and the [tools](#available-tools) are listed in your IDE:
    - Cursor: Go to **Cursor Settings** (`Shift` + `Cmd/Ctrl` + `J`), and select the **MCP** tab.
    - VS Code: Open the chat panel, select agent mode, and click the **Configure Tools** button.
       {{< img src="bits_ai/mcp_server/vscode_configure_tools_button.png" alt="Configure Tools button in VS Code" style="width:70%;" >}}

## Connect in supported AI clients

The following instructions are for all [MCP-compatible clients](#client-compatibility). For Cursor or VS Code, use the [Datadog extension](#connect-in-cursor-and-vs-code) for built-in access to the Datadog MCP Server.

{{< tabs >}}
{{% tab "Remote authentication" %}}
This method uses the MCP specification's [Streamable HTTP][1] transport mechanism to connect to the MCP Server.

Point your AI agent to the MCP Server endpoint for your regional [Datadog site][2]. For example, if you're using `app.datadoghq.com` to access Datadog, use the endpoint for the US1 site.

If your organization uses a [custom sub-domain][3], use the endpoint that corresponds to your regional Datadog site. For example, if your custom sub-domain is `myorg.datadoghq.com`, use the US1 endpoint.

| Datadog Site | MCP Server Endpoint |
|--------|------|
| **US1** (`app.datadoghq.com`) | `https://mcp.datadoghq.com/api/unstable/mcp-server/mcp` |
| **US3** (`us3.datadoghq.com`) | `https://mcp.us3.datadoghq.com/api/unstable/mcp-server/mcp` |
| **US5** (`us5.datadoghq.com`) | `https://mcp.us5.datadoghq.com/api/unstable/mcp-server/mcp` |
| **EU1** (`app.datadoghq.eu`) | `https://mcp.datadoghq.eu/api/unstable/mcp-server/mcp` |
| **AP1** (`ap1.datadoghq.com`) | `https://mcp.ap1.datadoghq.com/api/unstable/mcp-server/mcp` |
| **AP2** (`ap2.datadoghq.com`) | `https://mcp.ap2.datadoghq.com/api/unstable/mcp-server/mcp` |

### Example configurations

These examples are for the US1 site:

* **Command line**: For Claude Code, run:
  ```bash
  claude mcp add --transport http datadog-mcp https://mcp.datadoghq.com/api/unstable/mcp-server/mcp
  ```

* **Configuration file**: Edit the configuration file for your AI agent:
  * Codex CLI: `~/.codex/config.toml`
  * Gemini CLI: `~/.gemini/settings.json`

  ```json
  {
    "mcpServers": {
      "datadog": {
        "type": "http",
        "url": "https://mcp.datadoghq.com/api/unstable/mcp-server/mcp"
      }
    }
  }
  ```
  * Amazon Q CLI: `~/.aws/amazonq/default.json`

  ```json
  {
    "mcpServers": {
      "datadog": {
        "type": "http",
        "url": "https://mcp.datadoghq.com/api/unstable/mcp-server/mcp",
        "oauthScopes": []
      }
    }
  }
  ```

[1]: https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http
[2]: /getting_started/site/
[3]: /account_management/multi_organization/#custom-sub-domains
{{% /tab %}}

{{% tab "Local binary authentication" %}}

This method uses the MCP specification's [stdio][1] transport mechanism to connect to the MCP Server.

Use this option if direct remote authentication is not available for you. After installation, you typically do not need to update the local binary to benefit from MCP Server updates, as the tools are remote.

1. Install the Datadog MCP Server binary:
    * macOS and Linux:
      ```bash
      curl -sSL https://coterm.datadoghq.com/mcp-cli/install.sh | bash
      ```

      This installs the MCP Server binary to `~/.local/bin/datadog_mcp_cli` and then you can use it like any other stdio MCP server.<br/><br/>

    * Windows: Download the [Windows version][2].

2. Run `datadog_mcp_cli login` manually to walk through the OAuth login flow.

    The MCP Server automatically starts the OAuth flow if a client needs it, but doing it manually lets you choose a [Datadog site][3] and avoid the AI client timing out.

3. Configure your AI client to use the Datadog MCP Server. Follow your client's configuration instructions, as MCP Server setup varies between third-party AI clients.

    For example, for Claude Code, add this to `~/.claude.json`, making sure to replace `<USERNAME>` in the command path:

      ```json
      {
        "mcpServers": {
          "datadog": {
            "type": "stdio",
            "command": "/Users/<USERNAME>/.local/bin/datadog_mcp_cli",
            "args": [],
            "env": {}
          }
        }
      }
      ```

    Alternatively, you can also configure Claude Code by running the following:
      ```bash
      claude mcp add datadog --scope user -- ~/.local/bin/datadog_mcp_cli
      ```

[1]: https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#stdio
[2]: https://coterm.datadoghq.com/mcp-cli/datadog_mcp_cli.exe
[3]: /getting_started/site/
{{% /tab %}}
{{< /tabs >}}

### Authentication

The MCP Server uses OAuth 2.0 for [authentication][2]. If you cannot go through the OAuth flow (for example, on a server), you can provide a Datadog [API key and application key][3] as `DD_API_KEY` and `DD_APPLICATION_KEY` HTTP headers. For example:

{{< code-block lang="json" >}}
{
  "mcpServers": {
    "datadog": {
      "type": "http",
      "url": "https://mcp.datadoghq.com/api/unstable/mcp-server/mcp",
      "headers": {
          "DD_API_KEY": "<YOUR_API_KEY>",
          "DD_APPLICATION_KEY": "<YOUR_APPLICATION_KEY>"
      }
    }
  }
}
{{< /code-block >}}

For security, use a scoped API key and application key from a [service account][23] that has only the required permissions.

### Test access to the MCP Server

1. Install the [MCP inspector][4], a developer tool for testing and debugging MCP servers.

    ```bash
    npx @modelcontextprotocol/inspector
    ```
2. In the inspector's web UI, for **Transport Type**, select **Streamable HTTP**.
3. For **URL**, enter the [MCP Server URL](?tab=remoteauthentication#connect-in-supported-ai-clients) for your regional Datadog site.
4. Click **Connect**, then go to **Tools** > **List Tools**.
5. Check if the [available tools](#available-tools) appear.

## Toolsets

The Datadog MCP Server supports _toolsets_, which allow you to use only the tools you need, saving valuable context window space. These toolsets are available:

- `core`: The default toolset
- `synthetics`: Tools for interacting with Datadog [Synthetic tests][21]

To use a toolset, include the `toolsets` query parameter in the endpoint URL when connecting to the MCP Server ([remote authentication](?tab=remote-authentication#connect-in-supported-ai-clients) only). For example:

- `https://mcp.datadoghq.com/api/unstable/mcp-server/mcp` retrieves only the core tools (this is the default if `toolsets` is not specified).
- `https://mcp.datadoghq.com/api/unstable/mcp-server/mcp?toolsets=synthetics` retrieves only Synthetic Testing-related tools.
- `https://mcp.datadoghq.com/api/unstable/mcp-server/mcp?toolsets=core,synthetics` retrieves both core and Synthetic Testing tools.

## Available tools

This section lists the tools available in the Datadog MCP Server and provides example prompts for using them.

<div class="alert alert-info">Datadog MCP Server tools are under significant development and are subject to change. Use <a href="https://docs.google.com/forms/d/e/1FAIpQLSeorvIrML3F4v74Zm5IIaQ_DyCMGqquIp7hXcycnCafx4htcg/viewform">this feedback form</a> to share any feedback, use cases, or issues encountered with your prompts and queries.</div>

### `search_datadog_docs`
*Toolset: **core***\
Returns AI-generated answers to Datadog questions, sourced from [Datadog documentation][15].
- How do you enable Datadog profiling in Python?
- What's the best way to correlate logs and traces?
- How does RUM auto-instrumentation work?

### `search_datadog_events`
*Toolset: **core***\
Searches events like monitor alerts, deployment notifications, infrastructure changes, security findings, and service status changes.

- Show me all deployment events from the last 24 hours.
- Find events related to our production environment with error status.
- Get events tagged with `service:api` from the past hour.

**Note**: See the [Event Management API][16] for more details.

### `get_datadog_incident`
*Toolset: **core***\
Retrieves detailed information about an incident.

- Get details for incident ABC123.
- What's the status of incident ABC123?
- Retrieve full information about the Redis incident from yesterday.

**Note**: The tool is operational, but does not include incident timeline data.

### `get_datadog_metric`
*Toolset: **core***\
Queries and analyzes historical or real-time metric data, supporting custom queries and aggregations.

- Show me CPU utilization metrics for all hosts in the last 4 hours.
- Get Redis latency metrics for the production environment.
- Display memory usage trends for our database servers.

### `search_datadog_monitors`
*Toolset: **core***\
Retrieves information about Datadog monitors, including their statuses, thresholds, and alert conditions.

- List all monitors that are currently alerting.
- Show me monitors related to our payment service.
- Find monitors tagged with `team:infrastructure`.

### `get_datadog_trace`
*Toolset: **core***\
Fetches a complete trace from Datadog APM using a trace ID.

- Get the complete trace for ID 7d5d747be160e280504c099d984bcfe0.
- Show me all spans for trace abc123 with timing information.
- Retrieve trace details including database queries for ID xyz789.

**Note**: Large traces with thousands of spans may be truncated (and indicated as such) without a way to retrieve all spans.

### `search_datadog_dashboards`
*Toolset: **core***\
Lists available Datadog dashboards and key details.

- Show me all available dashboards in our account.
- List dashboards related to infrastructure monitoring.
- Find shared dashboards for the engineering team.

**Note**: This tool lists relevant dashboards but provides limited detail about their contents.

### `search_datadog_hosts`
*Toolset: **core***\
Lists and provides information about monitored hosts, supporting filtering and searching.

- Show me all hosts in our production environment.
- List unhealthy hosts that haven't reported in the last hour.
- Get all hosts tagged with `role:database`.

### `search_datadog_incidents`
*Toolset: **core***\
Retrieves a list of Datadog incidents, including their state, severity, and metadata.

- Show me all active incidents by severity.
- List resolved incidents from the past week.
- Find incidents that are customer-impacting.

### `search_datadog_metrics`
*Toolset: **core***\
Lists available metrics, with options for filtering and metadata.

- Show me all available Redis metrics.
- List CPU-related metrics for our infrastructure.
- Find metrics tagged with `service:api`.

### `search_datadog_services`
*Toolset: **core***\
Lists services in Datadog's Software Catalog with details and team information.

- Show me all services in our microservices architecture.
- List services owned by the platform team.
- Find services related to payment processing.

### `search_datadog_spans`
*Toolset: **core***\
Retrieves spans from APM traces with filters such as service, time, resource, and so on.

- Show me spans with errors from the checkout service.
- Find slow database queries in the last 30 minutes.
- Get spans for failed API requests to our payment service.

### `search_datadog_logs`
*Toolset: **core***\
Searches logs with filters (time, query, service, host, storage tier, and so on) and returns log details. Renamed from `get_logs`.

- Show me error logs from the nginx service in the last hour.
- Find logs containing 'connection timeout' from our API service.
- Get all 500 status code logs from production.

### `search_datadog_rum_events`
*Toolset: **core***\
Search Datadog RUM events using advanced query syntax.

- Show JavaScript errors and console warnings in RUM.
- Find pages that are loading slowly (more than 3 seconds).
- Show recent user interactions on product detail pages.

### `get_synthetics_tests`
*Toolset: **synthetics***\
Searches Datadog Synthetic tests.

- Help me understand why the Synthetic test on endpoint `/v1/my/tested/endpoint` is failing.
- There is an outage; find all the failing Synthetic tests on the domain `api.mycompany.com`.
- Are Synthetic tests on my website `api.mycompany.com` still working in the past hour?

### `edit_synthetics_tests`
*Toolset: **synthetics***\
Edits Datadog Synthetic HTTP API tests.

- Improve the assertions of the Synthetic test defined on my endpoint `/v1/my/tested/endpoint`.
- Pause the test `aaa-bbb-ccc` and set the locations to only European locations.
- Add my team tag to the test `aaa-bbb-ccc`.

### `synthetics_test_wizard`
*Toolset: **synthetics***\
Preview and create Datadog Synthetics HTTP API Tests.

- Create Synthetics tests on every endpoint defined in this code file.
- Create a Synthetics test on `/path/to/endpoint`.
- Create a Synthetics test that checks if my domain `mycompany.com` stays up.

## Context efficiency

The Datadog MCP Server is optimized to provide responses in a way that AI agents get relevant context without being overloaded with unnecessary information. For example:

- Responses are truncated based on the estimated length of responses each tool provides. The tools respond to AI agents with instructions on how to request more information if the response was truncated.
- Most tools have a `max_tokens` parameter that enables AI agents to request less or more information.

## Track tool calls in Audit Trail

You can view information about calls made by MCP Server tools in Datadog's [Audit Trail][17]. Search or filter by the event name `MCP Server`.

## Feedback

The Datadog MCP Server is under significant development. During the Preview, use [this feedback form][20] to share any feedback, use cases, or issues encountered with your prompts and queries.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://modelcontextprotocol.io/
[2]: https://modelcontextprotocol.io/specification/draft/basic/authorization
[3]: /account_management/api-app-keys/
[4]: https://github.com/modelcontextprotocol/inspector
[5]: https://www.anthropic.com/claude-code
[6]: https://claude.ai/download
[7]: https://help.openai.com/en/articles/11096431-openai-codex-cli-getting-started
[8]: https://www.cursor.com/
[9]: https://github.com/block/goose
[10]: https://github.com/aws/amazon-q-developer-cli
[11]: https://code.visualstudio.com/
[12]: /developers/ide_plugins/vscode/
[13]: https://nodejs.org/en/about/previous-releases
[14]: /developers/ide_plugins/vscode/?tab=cursor#installation
[15]: /
[16]: /api/latest/events/
[17]: /account_management/audit_trail/
[18]: https://cline.bot/
[19]: /account_management/rbac/permissions/#case-and-incident-management
[20]: https://docs.google.com/forms/d/e/1FAIpQLSeorvIrML3F4v74Zm5IIaQ_DyCMGqquIp7hXcycnCafx4htcg/viewform
[21]: /synthetics/
[22]: https://kiro.dev/
[23]: /account_management/org_settings/service_accounts/
