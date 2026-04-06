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

Learn how to set up and configure the Datadog MCP Server, which lets you retrieve telemetry insights and manage platform features directly from AI-powered clients. Select your client:

{{< tabs >}}
{{% tab "Cursor" %}}

Datadog's [Cursor and VS Code extension][1] includes built-in access to the managed Datadog MCP Server.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Install the extension (omit `--profile` and profile name to install to the default Cursor profile):
    ```shell
    cursor --install-extension datadog.datadog-vscode --profile <PROFILE_NAME>
    ```
   Alternatively, install the [Datadog extension][2]. If you have the extension installed already, make sure it's the latest version.
1. Sign in to your Datadog account.
   {{< img src="bits_ai/mcp_server/ide_sign_in.png" alt="Sign in to Datadog from the IDE extension" style="width:70%;" >}}
1. **Restart the IDE.**
1. Confirm the Datadog MCP Server is available and the [tools][3] are listed: Go to **Cursor Settings** (`Shift` + `Cmd/Ctrl` + `J`), select the **Tools & MCP** tab, and expand the extension's tools list.
1. If you previously installed the Datadog MCP Server manually, remove it from the IDE's configuration to avoid conflicts.
1. Verify that you have the required [permissions](#required-permissions) for the Datadog resources you want to access.

[2]: /ide_plugins/vscode/?tab=cursor#installation
[3]: /bits_ai/mcp_server#available-tools
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Datadog MCP Server is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /ide_plugins/vscode/
{{% /tab %}}

{{% tab "Claude Code" %}}

Point your AI agent to the MCP Server endpoint for your regional [Datadog site][1]. For the correct instructions, use the **Datadog Site** selector on the right side of this documentation page to select your site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Selected endpoint ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Run in terminal:
    <pre><code>claude mcp add --transport http datadog-mcp {{< region-param key="mcp_server_endpoint" >}}</code></pre>

   Alternatively, add to `~/.claude.json`:
    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
         }
       }
    }</code></pre>

1. To enable [product-specific tools][2], include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and LLM Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Verify that you have the required [permissions](#required-permissions) for the Datadog resources you want to access.

<div class="alert alert-info">If remote authentication is not available, use <a href="#local-binary-authentication">local binary authentication</a> instead.</div>

[1]: /getting_started/site/
[2]: /bits_ai/mcp_server#toolsets
{{< /site-region >}}

{{< site-region region="gov" >}}

<div class="alert alert-danger">Datadog MCP Server is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

[1]: /getting_started/site/
{{% /tab %}}

{{% tab "Claude" %}}

Connect Claude (including Claude Cowork) to the Datadog MCP Server by adding it as a **custom connector** with the remote MCP URL.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Follow the Claude help center guide on [custom connectors][1] to add a new custom connector.

1. When prompted for a URL, enter the Datadog MCP Server endpoint for your [Datadog site][2] ({{< region-param key="dd_site_name" >}}). For the correct instructions, use the **Datadog Site** selector on the right side of this documentation page to select your site.
   <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>

   To enable [product-specific tools][3], include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and LLM Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Complete the OAuth login flow when prompted.

1. Verify that you have the required [permissions](#required-permissions) for the Datadog resources you want to access.

[1]: https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp
[2]: /getting_started/site/
[3]: /bits_ai/mcp_server#toolsets
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Datadog MCP Server is not supported for your selected <a href="/getting_started/site/">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "Codex" %}}

Point your AI agent to the MCP Server endpoint for your regional [Datadog site][1]. For the correct instructions, use the **Datadog Site** selector on the right side of this documentation page to select your site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Selected endpoint ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Edit `~/.codex/config.toml` (or your Codex CLI configuration file) to add the Datadog MCP Server with HTTP transport and the endpoint URL for your site. For example:

   <pre><code>[mcp_servers.datadog]
   url = "{{< region-param key="mcp_server_endpoint" >}}"
   </code></pre>

   To enable [product-specific tools][2], include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and LLM Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Log in to the Datadog MCP Server:

   ```shell
   codex mcp login datadog
   ```

   This opens your browser to complete the OAuth flow. Codex stores the resulting credentials so you don't need to log in again until the token expires.

1. Verify that you have the required [permissions](#required-permissions) for the Datadog resources you want to access.

[2]: /bits_ai/mcp_server#toolsets
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Datadog MCP Server is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /getting_started/site/
{{% /tab %}}

{{% tab "Warp" %}}

[Warp][1] is an agentic terminal with built-in MCP support. Point the Warp agent to the MCP Server endpoint for your regional [Datadog site][2]. For the correct instructions, use the **Datadog Site** selector on the right side of this documentation page to select your site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Selected endpoint ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. In the Warp app, go to **Settings** > **MCP Servers** and click **+ Add**.

1. Paste the following configuration:

    <pre><code>{
      "Datadog": {
        "url": "{{< region-param key="mcp_server_endpoint" >}}"
      }
    }</code></pre>

    To enable [product-specific tools][3], include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and LLM Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Click **Start** on the Datadog server. Warp opens your browser to complete the OAuth login flow. Credentials are stored securely on your device and reused for future sessions.

1. Verify that you have the required [permissions](#required-permissions) for the Datadog resources you want to access.

[1]: https://www.warp.dev/
[2]: /getting_started/site/
[3]: /bits_ai/mcp_server#toolsets
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Datadog MCP Server is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "VS Code" %}}

Datadog's [Cursor and VS Code extension][1] includes built-in access to the managed Datadog MCP Server.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Install the extension (omit `--profile` and profile name to install to the default VS Code profile):
    ```shell
    code --install-extension datadog.datadog-vscode --profile <PROFILE_NAME>
    ```
   Alternatively, install the [Datadog extension][2]. If you have the extension installed already, make sure it's the latest version.
1. Sign in to your Datadog account.
1. **Restart the IDE.**
1. Confirm the Datadog MCP Server is available and the [tools][3] are listed: Open the chat panel, select agent mode, and click the **Configure Tools** button.
   {{< img src="bits_ai/mcp_server/vscode_configure_tools_button.png" alt="Configure Tools button in VS Code" style="width:70%;" >}}
1. If you previously installed the Datadog MCP Server manually, remove it from the IDE's configuration to avoid conflicts. Open the command palette (`Shift` + `Cmd/Ctrl` + `P`) and run `MCP: Open User Configuration`.
1. Verify that you have the required [permissions](#required-permissions) for the Datadog resources you want to access.

[2]: /ide_plugins/vscode/?tab=vscode#installation
[3]: /bits_ai/mcp_server#available-tools
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Datadog MCP Server is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /ide_plugins/vscode/
{{% /tab %}}

{{% tab "JetBrains IDEs" %}}

JetBrains offers the [Junie][1] and [AI Assistant][2] plugins for their range of IDEs. GitHub offers the [Copilot][4] plugin. Alternatively, many developers use an agent CLI, such as Claude Code or Codex, alongside their IDE.

Point your plugin to the MCP Server endpoint for your regional [Datadog site][3]. For the correct instructions, use the **Datadog Site** selector on the right side of this documentation page to select your site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Selected endpoint ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

{{% collapse-content title="Junie" level="h4" expanded=false id="jetbrains-junie" %}}
1. Go to **Tools** > **Junie** > **MCP Settings** and add the following block:

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }
    </code></pre>

1. To enable [product-specific tools][1], include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and LLM Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. You are prompted to login through OAuth. The status indicator in the settings displays a green tick when the connection is successful.

1. Verify that you have the required [permissions](#required-permissions) for the Datadog resources you want to access.

[1]: /bits_ai/mcp_server#toolsets
{{% /collapse-content %}}

{{% collapse-content title="JetBrains AI Assistant" level="h4" expanded=false id="jetbrains-ai-assistant" %}}
1. Go to **Tools** > **AI Assistant** > **Model Context Protocol (MCP)** and add the following block:

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
          "headers": {
            "DD_API_KEY": "&lt;YOUR_API_KEY&gt;",
            "DD_APPLICATION_KEY": "&lt;YOUR_APP_KEY&gt;"
          }
        }
      }
    }
    </code></pre>

1. To enable [product-specific tools][1], include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and LLM Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. The status indicator in the settings displays a green tick when the connection is successful.

1. Verify that you have the required [permissions](#required-permissions) for the Datadog resources you want to access.

[1]: /bits_ai/mcp_server#toolsets
{{% /collapse-content %}}

{{% collapse-content title="GitHub Copilot" level="h4" expanded=false id="github-copilot" %}}
1. Go to **Tools** > **GitHub Copilot** > **Model Context Protocol (MCP)** and add the following block:

    <pre><code>{
      "servers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }
    </code></pre>

1. To enable [product-specific tools][1], include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and LLM Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Click the `Start` element that appears in the editor to start the server. You are prompted to log in through OAuth.

1. Verify that you have the required [permissions](#required-permissions) for the Datadog resources you want to access.

[1]: /bits_ai/mcp_server#toolsets
{{% /collapse-content %}}

{{% collapse-content title="Agent CLIs" level="h4" expanded=false id="jetbrains-agent-clis" %}}
Many developers use an agent CLI such as Claude Code or Codex alongside their JetBrains IDE. See the configuration for those CLI tools:
- [Claude Code][4]
- [Codex][5]

The [Datadog plugin for JetBrains IDEs][3] integrates with these agent CLIs. For an uninterrupted experience, install the plugin at the same time as you configure the Datadog MCP Server.

[3]: /ide_plugins/idea/
[4]: /bits_ai/mcp_server/setup/?tab=claudecode
[5]: /bits_ai/mcp_server/setup/?tab=codex
{{% /collapse-content %}}
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Datadog MCP Server is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://plugins.jetbrains.com/plugin/26104-junie-the-ai-coding-agent-by-jetbrains
[2]: https://plugins.jetbrains.com/plugin/22282-jetbrains-ai-assistant
[3]: /getting_started/site/
[4]: https://plugins.jetbrains.com/plugin/17718-github-copilot--your-ai-pair-programmer
{{% /tab %}}

{{% tab "Kiro" %}}

Point your AI agent to the MCP Server endpoint for your regional [Datadog site][3]. For the correct instructions, use the **Datadog Site** selector on the right side of this documentation page to select your site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Selected endpoint ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Add the following to your [Kiro MCP configuration file][2] (`~/.kiro/settings/mcp.json` for user-scoped configuration):

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. To enable [product-specific tools][1], include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and LLM Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Verify that you have the required [permissions](#required-permissions) for the Datadog resources you want to access.

[1]: /bits_ai/mcp_server#toolsets
[2]: https://kiro.dev/docs/mcp/configuration/
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Datadog MCP Server is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[3]: /getting_started/site/
{{% /tab %}}

{{% tab "Other" %}}

For most other [supported clients](#supported-clients), use these instructions for remote authentication. For Cline or when remote authentication is unreliable or not available, use [local binary authentication](#local-binary-authentication).

Point your AI agent to the MCP Server endpoint for your regional [Datadog site][1]. For the correct instructions, use the **Datadog Site** selector on the right side of this documentation page to select your site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Selected endpoint ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Add the Datadog MCP Server to your client's configuration file using the HTTP transport and your site's endpoint URL. For example:

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. To enable [product-specific tools][1], include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and LLM Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Verify that you have the required [permissions](#required-permissions) for the Datadog resources you want to access.

Example configuration file location:

| Client | Configuration file |
|--------|---------------------|
| Gemini CLI | `~/.gemini/settings.json` |

[1]: /bits_ai/mcp_server#toolsets
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Datadog MCP Server is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

[1]: /getting_started/site/
{{% /tab %}}
{{< /tabs >}}

## Supported clients

| Client | Developer | Notes |
|--------|------|------|
| [Cursor][3] | Cursor | Datadog [Cursor & VS Code extension][15] recommended. |
| [Claude Code][4] | Anthropic | |
| [Claude][19] | Anthropic | Use [custom connector setup](?tab=claude#installation). Includes Claude Cowork. |
| [Codex CLI][6] | OpenAI | |
| [Warp][28] | Warp | |
| [VS Code][7] | Microsoft | Datadog [Cursor & VS Code extension][16] recommended. |
| [JetBrains IDEs][18] | JetBrains | [Datadog plugin][18] recommended. |
| [Kiro][9], [Kiro CLI][10] | Amazon Web Services | |
| [Goose][8], [Cline][11] | Various | See the **Other** tab above. Use local binary authentication for Cline if remote authentication is unreliable. |

<div class="alert alert-info">The Datadog MCP Server is under significant development, and additional supported clients may become available.</div>

## Required permissions

MCP Server tools require the following [Datadog user role permissions][22]:

| Permission | Required for |
|------------|-------------|
| <code style="white-space:nowrap">mcp_read</code> | Tools that read data from Datadog (for example, querying monitors, searching logs, retrieving dashboards) |
| <code style="white-space:nowrap">mcp_write</code> | Tools that create or modify resources in Datadog (for example, creating monitors, muting hosts) |

In addition to `mcp_read` or `mcp_write`, users need the standard Datadog permissions for the underlying resource. For example, using an MCP tool that reads monitors requires both `mcp_read` and the [Monitors Read][24] permission. See [Datadog Role Permissions][25] for the full list of resource-level permissions.

Users with the **Datadog Standard Role** have both MCP Server permissions by default. If your organization uses [custom roles][23], add the permissions manually:
1. Go to [**Organization Settings > Roles**][26] as an administrator, and click the role you want to update.
1. Click **Edit Role** (pencil icon).
1. Under the permissions list, select the **MCP Read** and **MCP Write** checkboxes.
1. Select any other resource-level permissions you need for the role.
1. Click **Save**.

Organization administrators can manage global MCP access and write capabilities from [Organization Settings][27].

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

### Local binary authentication

Local authentication is recommended for Cline and when remote authentication is unreliable or not available. After installation, you typically do not need to update the local binary to benefit from MCP Server updates, as the tools are remote.

{{% collapse-content title="Set up Datadog MCP Server local binary" level="h5" expanded=false id="mcp-local-binary" %}}

1. Install the Datadog MCP Server binary (macOS and Linux):
   ```bash
   curl -sSL https://coterm.datadoghq.com/mcp-cli/install.sh | bash
   ```
   This installs the binary to `~/.local/bin/datadog_mcp_cli`.

   For Windows, download the [Windows version][20].

2. Run `datadog_mcp_cli login` manually to walk through the OAuth login flow and choose a [Datadog site][21].

3. Configure your AI client to use the stdio transport with `datadog_mcp_cli` as the command. For example, in macOS (replace `<USERNAME>` with your OS username):
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

   For other operating systems, replace the `command` path with the location of the downloaded binary:
   - Linux: `/home/<USERNAME>/.local/bin/datadog_mcp_cli`
   - Windows: `<USERNAME>\bin\datadog_mcp_cli.exe`

   <div class="alert alert-tip">For Claude Code, you can instead run: 
   <pre><code>claude mcp add datadog --scope user -- ~/.local/bin/datadog_mcp_cli</code></pre></div>

4. Fully restart your AI client to apply the configuration and load the MCP Server.
{{% /collapse-content %}}

## Toolsets

All toolsets for the MCP Server are documented [here][12]. By default, the base URL only includes the `core` toolset. 

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
[20]: https://coterm.datadoghq.com/mcp-cli/datadog_mcp_cli.exe
[21]: /getting_started/site/
[22]: /account_management/rbac/permissions/#mcp
[23]: /account_management/rbac/?tab=datadogapplication#custom-roles
[24]: /account_management/rbac/permissions/#monitors
[25]: /account_management/rbac/permissions/
[26]: https://app.datadoghq.com/organization-settings/roles
[27]: https://app.datadoghq.com/organization-settings/preferences
[28]: https://www.warp.dev/
