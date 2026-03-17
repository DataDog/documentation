---
title: Set Up the Datadog MCP Server
description: "Learn how to connect your AI agent to the Datadog MCP Server."
algolia:
  tags: ["mcp", "mcp server", "setup"]
  rank: 75
further_reading:
- link: "bits_ai/mcp_server"
  tag: "Documentation"
  text: "Datadog MCP Server"
- link: "ide_plugins/vscode/?tab=cursor"
  tag: "Documentation"
  text: "Datadog Extension for Cursor"
---

This page explains how to set up and configure the Datadog MCP Server, which lets you retrieve telemetry insights and manage platform features directly from AI-powered clients.

## Installation

Select your client to see setup instructions:

{{< tabs >}}
{{% tab "Cursor" %}}

Datadog's [Cursor and VS Code extension][1] includes built-in access to the managed Datadog MCP Server. Benefits include:

* No additional MCP Server setup after you install the extension and connect to Datadog.
* One-click transitions between multiple Datadog organizations.
* Better fixes from **Fix in Chat** on Code Insights (issues from Error Tracking, Code Vulnerabilities, and Library Vulnerabilities), informed by context from the MCP Server.

To install the extension:

1. If you previously installed the Datadog MCP Server manually, remove it from the IDE's configuration to avoid conflicts. Go to **Cursor Settings** (`Shift` + `Cmd/Ctrl` + `J`) and select the **MCP** tab.
2. Install the Datadog extension following [these instructions][2]. If you have the extension installed already, make sure it's the latest version, as new features are released regularly.
3. Sign in to your Datadog account.
   {{< img src="bits_ai/mcp_server/ide_sign_in.png" alt="Sign in to Datadog from the IDE extension" style="width:70%;" >}}
4. **Restart the IDE.**
5. Confirm the Datadog MCP Server is available and the [tools][3] are listed: Go to **Cursor Settings** (`Shift` + `Cmd/Ctrl` + `J`), and select the **MCP** tab.

[1]: /ide_plugins/vscode/
[2]: /ide_plugins/vscode/?tab=cursor#installation
[3]: /bits_ai/mcp_server#available-tools

{{% /tab %}}

{{% tab "Claude Code" %}}

You can connect Claude Code to the Datadog MCP Server using remote authentication (HTTP) or local binary authentication (stdio).

### Remote authentication

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Point your AI agent to the MCP Server endpoint for your regional [Datadog site][1]. For example, the endpoint for your selected site ({{< region-param key="dd_site_name" >}}) is: <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

* **Command line**: Run:
  <pre><code>claude mcp add --transport http datadog-mcp {{< region-param key="mcp_server_endpoint" >}}
  </code></pre>

* **Configuration file**: Add to `~/.claude.json`:
  <pre><code>{
    "mcpServers": {
      "datadog": {
        "type": "http",
        "url": "{{< region-param key="mcp_server_endpoint" >}}"
      }
    }
  }
  </code></pre>

[1]: /getting_started/site/
{{< /site-region >}}

{{< site-region region="gov" >}}
Point your AI agent to the MCP Server endpoint for your regional [Datadog site][1].

<div class="alert alert-danger">Datadog MCP Server is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>

[1]: /getting_started/site/
{{< /site-region >}}

### Local binary authentication

Use this option if remote authentication is not available. After installation, you typically do not need to update the local binary to benefit from MCP Server updates, as the tools are remote.

1. Install the Datadog MCP Server binary (macOS and Linux):
   ```bash
   curl -sSL https://coterm.datadoghq.com/mcp-cli/install.sh | bash
   ```
   This installs the binary to `~/.local/bin/datadog_mcp_cli`.

2. Run `datadog_mcp_cli login` manually to walk through the OAuth login flow and choose a [Datadog site][1].

3. Configure Claude Code. Add to `~/.claude.json` (replace `<USERNAME>` with your username):
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
   Or run: `claude mcp add datadog --scope user -- ~/.local/bin/datadog_mcp_cli`

[1]: /getting_started/site/
{{% /tab %}}

{{% tab "Claude" %}}

Connect Claude (including Claude Cowork) to the Datadog MCP Server by adding it as a **custom connector** with the remote MCP URL.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Follow the [Claude help center guide on custom connectors][1] to add a new custom connector.
2. When prompted for a URL, enter the Datadog MCP Server endpoint for your [Datadog site][2] ({{< region-param key="dd_site_name" >}}):
   <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>
3. Complete the OAuth login flow when prompted.

[1]: https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp
[2]: /getting_started/site/
{{< /site-region >}}

{{< site-region region="gov" >}}
Point your AI agent to the MCP Server endpoint for your regional [Datadog site][1].

<div class="alert alert-danger">Datadog MCP Server is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>

[1]: /getting_started/site/
{{< /site-region >}}

{{% /tab %}}

{{% tab "Codex" %}}

You can connect Codex CLI to the Datadog MCP Server using HTTP transport.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Point your AI agent to the MCP Server endpoint for your regional [Datadog site][1]. For example, the endpoint for your selected site ({{< region-param key="dd_site_name" >}}) is: <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Edit `~/.codex/config.toml` (or your Codex CLI configuration file) to add the Datadog MCP Server with HTTP transport and the endpoint URL for your site. Example configuration ({{< region-param key="dd_site_name" >}}):

   <pre><code>[mcp_servers.datadog]
   url = "{{< region-param key="mcp_server_endpoint" >}}"
   </code></pre>

2. Log in to the Datadog MCP Server by running:

   ```bash
   codex mcp login datadog
   ```

   This opens your browser to complete the OAuth flow. Codex stores the resulting credentials so you don't need to log in again until the token expires.

[1]: /getting_started/site/
{{< /site-region >}}

{{< site-region region="gov" >}}
Point your AI agent to the MCP Server endpoint for your regional [Datadog site][1].

<div class="alert alert-danger">Datadog MCP Server is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>

[1]: /getting_started/site/
{{< /site-region >}}
{{% /tab %}}

{{% tab "VS Code" %}}

Datadog's [Cursor and VS Code extension][1] includes built-in access to the managed Datadog MCP Server. Benefits include:

* No additional MCP Server setup after you install the extension and connect to Datadog.
* One-click transitions between multiple Datadog organizations.

To install the extension:

1. If you previously installed the Datadog MCP Server manually, remove it from the IDE's configuration to avoid conflicts. Open the command palette (`Shift` + `Cmd/Ctrl` + `P`) and run `MCP: Open User Configuration`.
2. Install the Datadog extension following [these instructions][2]. If you have the extension installed already, make sure it's the latest version.
3. Sign in to your Datadog account.
4. **Restart the IDE.**
5. Confirm the Datadog MCP Server is available and the [tools][3] are listed: Open the chat panel, select agent mode, and click the **Configure Tools** button.
   {{< img src="bits_ai/mcp_server/vscode_configure_tools_button.png" alt="Configure Tools button in VS Code" style="width:70%;" >}}

[1]: /ide_plugins/vscode/
[2]: /ide_plugins/vscode/?tab=vscode#installation
[3]: /bits_ai/mcp_server#available-tools

{{% /tab %}}

{{% tab "JetBrains IDEs" %}}

JetBrains offers the [Junie][1] and [AI Assistant][2] plugins for their range of IDEs. Alternately, many developers use an agent CLI, such as Claude Code or Codex, alongside their IDE. The sections below describe how to configure the Datadog MCP Server for use by these AI tools.


#### Junie

To configure the Datadog MCP Server with Junie, navigate to the IDE settings. Go to **Tools** > **Junie** > **MCP Settings** and add the following block:

<pre><code>{
  "mcpServers": {
    "datadog": {
      "type": "http",
      "url": "{{< region-param key="mcp_server_endpoint" >}}"
    }
  }
}
</code></pre>

You are prompted to login through OAuth. The status indicator in the settings displays a green tick when the connection is successful.

#### AI Assistant

To configure the Datadog MCP Server with AI Assistant, navigate to the IDE settings. Go to **Tools** > **AI Assistant** > **Model Context Protocol (MCP)** and add the following block:

<pre><code>{
  "mcpServers": {
    "datadog": {
      "url": "{{< region-param key="mcp_server_endpoint" >}}"
      "headers": {
        "DD_API_KEY": "your API key",
        "DD_APPLICATION_KEY": "your APP key"
      }
    }
  }
}
</code></pre>

The status indicator in the settings displays a green tick when the connection is successful.

#### Agent CLIs

Many developers use an agent CLI such as Claude Code or Codex alongside their JetBrains IDE. See the configuration for those CLI tools:
- [Claude Code][4]
- [Codex][5]

The [Datadog plugin][3] integrates with these agent CLIs. For an uninterrupted experience, install the plugin at the same time as you configure the Datadog MCP Server.

[1]: https://plugins.jetbrains.com/plugin/26104-junie-the-ai-coding-agent-by-jetbrains
[2]: https://plugins.jetbrains.com/plugin/22282-jetbrains-ai-assistant
[3]: /ide_plugins/idea/
[4]: /bits_ai/mcp_server/setup/?tab=claudecode
[5]: /bits_ai/mcp_server/setup/?tab=codex

{{% /tab %}}

{{% tab "Other" %}}

The following clients can connect to the Datadog MCP Server: [Goose][1], [Kiro][2], [Kiro CLI][3], [Cline][4], and other MCP-compatible clients. Use **remote authentication** when your client supports it. For Cline or when remote authentication is unreliable, use **local binary authentication**.

### Remote authentication

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Point your AI agent to the MCP Server endpoint for your regional [Datadog site][1]. For example, the endpoint for your selected site ({{< region-param key="dd_site_name" >}}) is: <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

Add the Datadog MCP Server to your client's configuration using the HTTP transport and the endpoint above. Example config file locations:

| Client | Configuration file |
|--------|---------------------|
| Gemini CLI | `~/.gemini/settings.json` |
| Kiro CLI | `~/.kiro/settings/mcp.json` |

Example JSON configuration ({{< region-param key="dd_site_name" >}}):

<pre><code>{
  "mcpServers": {
    "datadog": {
      "type": "http",
      "url": "{{< region-param key="mcp_server_endpoint" >}}"
    }
  }
}
</code></pre>

[1]: /getting_started/site/
{{< /site-region >}}

{{< site-region region="gov" >}}
Point your AI agent to the MCP Server endpoint for your regional [Datadog site][1].

<div class="alert alert-danger">Datadog MCP Server is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>

[1]: /getting_started/site/
{{< /site-region >}}

### Local binary authentication

Local authentication is recommended for Cline and when remote authentication is unreliable.

1. Install the Datadog MCP Server binary:

   - macOS and Linux: Install the binary to `~/.local/bin/datadog_mcp_cli`:

      ```bash
      curl -sSL https://coterm.datadoghq.com/mcp-cli/install.sh | bash
      ```

   - Windows: Download the [Windows version][6].

2. Run `datadog_mcp_cli login` manually to walk through the OAuth login flow and choose a [Datadog site][5].

3. Configure your AI client to use the stdio transport with `datadog_mcp_cli` as the command. Example:
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
   On Windows, replace the `command` path with the location of the downloaded `.exe` file (for example, `C:\Users\<USERNAME>\bin\datadog_mcp_cli.exe`).

[1]: https://github.com/block/goose
[2]: https://kiro.dev/
[3]: https://kiro.dev/cli/
[4]: https://cline.bot/
[5]: /getting_started/site/
[6]: https://coterm.datadoghq.com/mcp-cli/datadog_mcp_cli.exe

{{% /tab %}}
{{< /tabs >}}

## Supported clients

| Client | Developer | Notes |
|--------|------|------|
| [Cursor][3] | Cursor | Datadog [Cursor & VS Code extension][15] recommended. |
| [Claude Code][4] | Anthropic | |
| [Claude][19] | Anthropic | Use [custom connector setup](?tab=claude#installation). Includes Claude Cowork. |
| [Codex CLI][6] | OpenAI | |
| [VS Code][7] | Microsoft | Datadog [Cursor & VS Code extension][16] recommended. |
| [JetBrains IDEs][18] | JetBrains | [Datadog plugin][18] recommended. |
| [Goose][8], [Kiro][9], [Kiro CLI][10], [Cline][11] | Various | See the **Other** tab above. Use local binary authentication for Cline if remote authentication is unreliable. |

<div class="alert alert-info">The Datadog MCP Server is under significant development, and additional supported clients may become available.</div>

## Authentication

The MCP Server uses OAuth 2.0 for [authentication][14]. If you cannot go through the OAuth flow (for example, on a server), you can provide a Datadog [API key and application key][1] as `DD_API_KEY` and `DD_APPLICATION_KEY` HTTP headers.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
For example, based on your selected [Datadog site][17] ({{< region-param key="dd_site_name" >}}):

<pre><code>{
  "mcpServers": {
    "datadog": {
      "type": "http",
      "url": "{{< region-param key="mcp_server_endpoint" >}}",
      "headers": {
          "DD_API_KEY": "&lt;YOUR_API_KEY&gt;",
          "DD_APPLICATION_KEY": "&lt;YOUR_APPLICATION_KEY&gt;"
      }
    }
  }
}
</code></pre>

[17]: /getting_started/site/#navigate-the-datadog-documentation-by-site
{{< /site-region >}}

For security, use a scoped API key and application key from a [service account][13] that has only the required permissions.

## Test access to the MCP Server

1. Install the [MCP inspector][2], a developer tool for testing and debugging MCP servers.

   ```bash
   npx @modelcontextprotocol/inspector
   ```
2. In the inspector's web UI, for **Transport Type**, select **Streamable HTTP**.
3. For **URL**, enter the MCP Server endpoint for your regional Datadog site. 
   {{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
   For example, for {{< region-param key="dd_site_name" >}}: <code>{{< region-param key="mcp_server_endpoint" >}}</code>
   {{< /site-region >}}
4. Click **Connect**, then go to **Tools** > **List Tools**.
5. Check if the [available tools][12] appear.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/api-app-keys/
[2]: https://github.com/modelcontextprotocol/inspector
[3]: https://cursor.com
[4]: https://claude.com/product/claude-code
[5]: https://claude.com/download
[6]: https://chatgpt.com/codex
[7]: https://code.visualstudio.com/
[8]: https://github.com/block/goose
[9]: https://kiro.dev/
[10]: https://kiro.dev/cli/
[11]: https://cline.bot/
[12]: /bits_ai/mcp_server#available-tools
[13]: /account_management/org_settings/service_accounts/
[14]: https://modelcontextprotocol.io/specification/draft/basic/authorization
[15]: /ide_plugins/vscode/?tab=cursor
[16]: /ide_plugins/vscode/
[17]: /getting_started/site/#navigate-the-datadog-documentation-by-site
[18]: /ide_plugins/idea/
[19]: https://claude.ai