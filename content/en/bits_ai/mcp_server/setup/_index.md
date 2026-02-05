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
- link: "developers/ide_plugins/vscode/?tab=cursor"
  tag: "Documentation"
  text: "Datadog Extension for Cursor"
---

{{< callout url="https://www.datadoghq.com/product-preview/datadog-mcp-server/" >}}
The Datadog MCP Server is in Preview. There is no charge for using the Datadog MCP Server during the Preview, but pricing may change when the feature becomes generally available. If you're interested in the MCP server and need access, complete this form.
{{< /callout >}}

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
| [Kiro][22] | Amazon | |
| [Kiro CLI][10] | Amazon | |
| [Cline][17] | Cline Bot | Limited support for remote authentication. Use [local binary authentication](?tab=localbinaryauthentication#connect-in-supported-ai-clients) as needed. |

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
5. Confirm the Datadog MCP Server is available and the [tools][20] are listed in your IDE:
    - Cursor: Go to **Cursor Settings** (`Shift` + `Cmd/Ctrl` + `J`), and select the **MCP** tab.
    - VS Code: Open the chat panel, select agent mode, and click the **Configure Tools** button.
       {{< img src="bits_ai/mcp_server/vscode_configure_tools_button.png" alt="Configure Tools button in VS Code" style="width:70%;" >}}

## Connect in supported AI clients

The following instructions are for all [MCP-compatible clients][21]. For Cursor or VS Code, use the [Datadog extension](#connect-in-cursor-and-vs-code) for built-in access to the Datadog MCP Server.

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
  * Kiro CLI: `~/.kiro/settings/mcp.json`

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
5. Check if the [available tools][20] appear.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://modelcontextprotocol.io/specification/draft/basic/authorization
[3]: /account_management/api-app-keys/
[4]: https://github.com/modelcontextprotocol/inspector
[5]: https://www.anthropic.com/claude-code
[6]: https://claude.ai/download
[7]: https://help.openai.com/en/articles/11096431-openai-codex-cli-getting-started
[8]: https://www.cursor.com/
[9]: https://github.com/block/goose
[10]: https://kiro.dev/cli/
[11]: https://code.visualstudio.com/
[12]: /developers/ide_plugins/vscode/
[14]: /developers/ide_plugins/vscode/?tab=cursor#installation
[17]: https://cline.bot/
[20]: /bits_ai/mcp_server#available-tools
[22]: https://kiro.dev/
[23]: /account_management/org_settings/service_accounts/
