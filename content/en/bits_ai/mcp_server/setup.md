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

{{< callout url="https://www.datadoghq.com/product-preview/datadog-mcp-server/" >}}
The Datadog MCP Server is in Preview. There is no charge for using the Datadog MCP Server during the Preview, but pricing may change when the feature becomes generally available. If you're interested in the MCP server and need access, complete this form.
{{< /callout >}}

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

#### Remote authentication

Point your AI agent to the MCP Server endpoint for your regional [Datadog site][1]. For example, if you're using `app.datadoghq.com`, use the US1 endpoint.

| Datadog Site | MCP Server Endpoint |
|--------|------|
| **US1** (`app.datadoghq.com`) | `https://mcp.datadoghq.com/api/unstable/mcp-server/mcp` |
| **US3** (`us3.datadoghq.com`) | `https://mcp.us3.datadoghq.com/api/unstable/mcp-server/mcp` |
| **US5** (`us5.datadoghq.com`) | `https://mcp.us5.datadoghq.com/api/unstable/mcp-server/mcp` |
| **EU1** (`app.datadoghq.eu`) | `https://mcp.datadoghq.eu/api/unstable/mcp-server/mcp` |
| **AP1** (`ap1.datadoghq.com`) | `https://mcp.ap1.datadoghq.com/api/unstable/mcp-server/mcp` |
| **AP2** (`ap2.datadoghq.com`) | `https://mcp.ap2.datadoghq.com/api/unstable/mcp-server/mcp` |

* **Command line**: Run (use the endpoint for your site from the table above):
  ```bash
  claude mcp add --transport http datadog-mcp https://mcp.datadoghq.com/api/unstable/mcp-server/mcp
  ```

* **Configuration file**: Add to `~/.claude.json`:
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

#### Local binary authentication

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

{{% tab "Claude Desktop" %}}

Claude Desktop has limited support for remote authentication. Use **local binary authentication** for reliable setup.

1. Install the Datadog MCP Server binary:

   - macOS and Linux: Install the binary to `~/.local/bin/datadog_mcp_cli`:

      ```bash
      curl -sSL https://coterm.datadoghq.com/mcp-cli/install.sh | bash
      ```

   - Windows: Download the [Windows version][1].

2. Run `datadog_mcp_cli login` manually to walk through the OAuth login flow and choose a [Datadog site][2].

3. Configure Claude Desktop to use the Datadog MCP Server. Add to your Claude Desktop configuration (location varies by OS) with the `stdio` transport pointing to `datadog_mcp_cli`:
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

[1]: https://coterm.datadoghq.com/mcp-cli/datadog_mcp_cli.exe
[2]: /getting_started/site/

{{% /tab %}}

{{% tab "Codex" %}}

Point your AI agent to the MCP Server endpoint for your regional [Datadog site][1]. For example, if you're using `app.datadoghq.com`, use the US1 endpoint.

| Datadog Site | MCP Server Endpoint |
|--------|------|
| **US1** (`app.datadoghq.com`) | `https://mcp.datadoghq.com/api/unstable/mcp-server/mcp` |
| **US3** (`us3.datadoghq.com`) | `https://mcp.us3.datadoghq.com/api/unstable/mcp-server/mcp` |
| **US5** (`us5.datadoghq.com`) | `https://mcp.us5.datadoghq.com/api/unstable/mcp-server/mcp` |
| **EU1** (`app.datadoghq.eu`) | `https://mcp.datadoghq.eu/api/unstable/mcp-server/mcp` |
| **AP1** (`ap1.datadoghq.com`) | `https://mcp.ap1.datadoghq.com/api/unstable/mcp-server/mcp` |
| **AP2** (`ap2.datadoghq.com`) | `https://mcp.ap2.datadoghq.com/api/unstable/mcp-server/mcp` |

Edit `~/.codex/config.toml` (or your Codex CLI configuration file) to add the Datadog MCP Server with HTTP transport and the endpoint URL for your site.

Example JSON-style configuration (US1):

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

[1]: /getting_started/site/

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

{{% tab "Other" %}}

The following clients can connect to the Datadog MCP Server: [Goose][1], [Kiro][2], [Kiro CLI][3], [Cline][4], and other MCP-compatible clients. Use **remote authentication** when your client supports it. For Cline or when remote authentication is unreliable, use **local binary authentication**.

#### Remote authentication

Point your AI agent to the MCP Server endpoint for your regional [Datadog site][5]. For example, if you're using `app.datadoghq.com`, use the US1 endpoint.

| Datadog Site | MCP Server Endpoint |
|--------|------|
| **US1** (`app.datadoghq.com`) | `https://mcp.datadoghq.com/api/unstable/mcp-server/mcp` |
| **US3** (`us3.datadoghq.com`) | `https://mcp.us3.datadoghq.com/api/unstable/mcp-server/mcp` |
| **US5** (`us5.datadoghq.com`) | `https://mcp.us5.datadoghq.com/api/unstable/mcp-server/mcp` |
| **EU1** (`app.datadoghq.eu`) | `https://mcp.datadoghq.eu/api/unstable/mcp-server/mcp` |
| **AP1** (`ap1.datadoghq.com`) | `https://mcp.ap1.datadoghq.com/api/unstable/mcp-server/mcp` |
| **AP2** (`ap2.datadoghq.com`) | `https://mcp.ap2.datadoghq.com/api/unstable/mcp-server/mcp` |

Add the Datadog MCP Server to your client's configuration using the HTTP transport and the endpoint above. Example config file locations:

| Client | Configuration file |
|--------|---------------------|
| Gemini CLI | `~/.gemini/settings.json` |
| Kiro CLI | `~/.kiro/settings/mcp.json` |

Example JSON configuration (US1):

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

#### Local binary authentication

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
| [Claude&nbsp;Desktop][5] | Anthropic | Limited support for remote authentication. Use [local binary authentication](?tab=claude-desktop#installation) as needed. |
| [Codex CLI][6] | OpenAI | |
| [VS Code][7] | Microsoft | Datadog [Cursor & VS Code extension][16] recommended. |
| [Goose][8], [Kiro][9], [Kiro CLI][10], [Cline][11] | Various | See the **Other** tab above. Use local binary authentication for Cline if remote auth is unreliable. |

<div class="alert alert-info">The Datadog MCP Server is under significant development, and additional supported clients may become available.</div>

## Authentication

The MCP Server uses OAuth 2.0 for [authentication][14]. If you cannot go through the OAuth flow (for example, on a server), you can provide a Datadog [API key and application key][1] as `DD_API_KEY` and `DD_APPLICATION_KEY` HTTP headers.

For example, based on your selected [Datadog site][17] ({{< region-param key="dd_site_name" >}}):

```json
{
  "mcpServers": {
    "datadog": {
      "type": "http",
      "url": "{{< region-param key="mcp_server_endpoint" >}}",
      "headers": {
          "DD_API_KEY": "<YOUR_API_KEY>",
          "DD_APPLICATION_KEY": "<YOUR_APPLICATION_KEY>"
      }
    }
  }
}
```

For security, use a scoped API key and application key from a [service account][13] that has only the required permissions.

## Test access to the MCP Server

1. Install the [MCP inspector][2], a developer tool for testing and debugging MCP servers.

   ```bash
   npx @modelcontextprotocol/inspector
   ```
2. In the inspector's web UI, for **Transport Type**, select **Streamable HTTP**.
3. For **URL**, enter the MCP Server endpoint for your regional Datadog site. For example, for {{< region-param key="dd_site_name" >}}: `{{< region-param key="mcp_server_endpoint" >}}`
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