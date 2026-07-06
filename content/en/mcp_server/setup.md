---
title: Set Up the Datadog MCP Server
description: "Learn how to connect your AI agent to the Datadog MCP Server."
aliases:
- /bits_ai/mcp_server/setup/
algolia:
  tags: ["mcp", "mcp server", "setup"]
  rank: 75
further_reading:
- link: "mcp_server"
  tag: "Documentation"
  text: "Datadog MCP Server"
- link: "mcp_server/tools"
  tag: "Documentation"
  text: "Datadog MCP Server Tools"
- link: "ide_plugins/vscode/?tab=cursor"
  tag: "Documentation"
  text: "Datadog Extension for Cursor"
---

Learn how to set up and configure the Datadog MCP Server, which lets you retrieve telemetry insights and manage platform features directly from AI-powered clients. Select your client:

{{< tabs >}}
{{% tab "ChatGPT" %}}

Connect Datadog to ChatGPT by installing the [Datadog app][1] from ChatGPT's app directory. The app authenticates with your Datadog organization through an OAuth flow.

{{< site-region region="us" >}}
<div class="alert alert-info">The Datadog ChatGPT app is in Preview. During the Preview, it is available for US1 customers only.</div>

1. In ChatGPT, go to {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Apps{{< /ui >}} > {{< ui >}}Browse Apps{{< /ui >}} and search for **Datadog**. If the Datadog app is not available, contact your organization's ChatGPT administrator for approval.
1. Select the app, click {{< ui >}}Connect{{< /ui >}}, and follow the guided setup.
1. Complete the OAuth login flow when prompted.
1. Verify that you have the required [permissions](#required-permissions) for the Datadog resources you want to access.
{{< /site-region >}}

{{< site-region region="us3,us5,eu,ap1,ap2,uk1,gov,gov2" >}}
<div class="alert alert-danger">The Datadog ChatGPT app is not supported for your selected <a href="/getting_started/site/">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://chatgpt.com/apps/datadog--preview/asdk_app_69e8c7f174a08191a28b6da96c8062c4
{{% /tab %}}

{{% tab "Claude" %}}

Install the [Datadog Connector](https://claude.ai/directory/connectors/datadog) from the Claude Connectors Directory. The official connector is the recommended way to connect Datadog to Claude (including Claude Cowork) and includes MCP Apps for in-product visualizations. If you previously added Datadog as a custom connector, remove it to avoid conflicts.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
1. In Claude, click the {{< ui >}}+{{< /ui >}} icon at the bottom of any prompt, then click {{< ui >}}Add Connector{{< /ui >}}.
1. Find **Datadog** in the directory and enable the connector.
1. Complete the OAuth login flow when prompted.
1. Verify that you have the required [permissions](#required-permissions) for the Datadog resources you want to access.

{{% collapse-content title="Manual setup with a custom connector" level="h4" expanded=false id="claude-custom-connector" %}}
If the directory connector is not available to you, you can add Datadog as a [custom connector](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp) using the remote MCP URL for your [Datadog site](/getting_started/site/) ({{< region-param key="dd_site_name" >}}). For the correct instructions, use the {{< ui >}}Datadog Site{{< /ui >}} selector on the right side of this documentation page to select your site.

1. Follow the Claude help center guide on [custom connectors](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp) to add a new custom connector.

1. When prompted for a URL, enter:
   <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>

   To enable [product-specific tools](#toolsets), include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and Agent Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Complete the OAuth login flow when prompted.
{{% /collapse-content %}}
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog MCP Server is not supported for your selected <a href="/getting_started/site/">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "Claude Code" %}}

Install the Datadog plugin from the [official Anthropic Plugin Marketplace](https://code.claude.com/docs/en/discover-plugins#official-anthropic-marketplace). The plugin packages the Datadog MCP Server with bundled skills and auto-updates when new plugin versions ship. For more details, see the [plugin repository](https://github.com/datadog-labs/claude-code-plugin). If you previously installed the Datadog MCP Server manually, remove it from your Claude Code configuration to avoid conflicts.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
1. Install the Datadog plugin:
    <pre><code>/plugin install datadog@claude-plugins-official</code></pre>

1. For first-time setup, either run `/ddsetup` or enter any Datadog-related prompt. During setup, select your [Datadog site](/getting_started/site/) and complete OAuth login. Alternatively, set the MCP Server domain (and optionally Datadog API and application keys) as environment variables before starting Claude Code.

1. Run `/ddtoolsets` to enable or disable groups of [product-specific MCP tools](#toolsets).

1. After any making any configuration change, run `/reload-plugins` and reauthenticate by opening `/plugin` and selecting the Datadog plugin.

1. Verify that you have the required [permissions](#required-permissions) for the Datadog resources you want to access.

<div class="alert alert-info">See the <a href="https://github.com/datadog-labs/claude-code-plugin">plugin repository</a> for all available slash commands and configuration options.</div>

{{% collapse-content title="Manual MCP Server configuration" level="h4" expanded=false id="claudecode-manual" %}}
If the plugin is not available to you, point Claude Code at the MCP Server endpoint for your regional [Datadog site](/getting_started/site/) directly. Selected endpoint ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

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

1. To enable [product-specific tools](#toolsets), include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and Agent Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

<div class="alert alert-info">If remote authentication is not available, use <a href="#local-binary-authentication">local binary authentication</a> instead.</div>
{{% /collapse-content %}}
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}

<div class="alert alert-danger">Datadog MCP Server is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

{{% /tab %}}

{{% tab "Codex" %}}

Point your AI agent to the MCP Server endpoint for your regional [Datadog site][1]. For the correct instructions, use the {{< ui >}}Datadog Site{{< /ui >}} selector on the right side of this documentation page to select your site.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Selected endpoint ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Edit `~/.codex/config.toml` (or your Codex CLI configuration file) to add the Datadog MCP Server with HTTP transport and the endpoint URL for your site. For example:

   <pre><code>[mcp_servers.datadog]
   url = "{{< region-param key="mcp_server_endpoint" >}}"
   </code></pre>

   To enable [product-specific tools](#toolsets), include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and Agent Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Log in to the Datadog MCP Server:

   ```shell
   codex mcp login datadog
   ```

   This opens your browser to complete the OAuth flow. Codex stores the resulting credentials so you don't need to log in again until the token expires.

1. Verify that you have the required [permissions](#required-permissions) for the Datadog resources you want to access.

<div class="alert alert-info">The <a href="https://github.com/openai/plugins/tree/main/plugins/datadog">Codex Plugin (Preview)</a> can be used in the Codex Desktop app in the US1 region only. To install, use the <a href="?tab=chatgpt">ChatGPT app instructions</a>. After you install the ChatGPT app, the Codex Plugin is automatically included as well.
</div>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog MCP Server is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /getting_started/site/
{{% /tab %}}

{{% tab "Copilot CLI" %}}

Install the Datadog plugin from the [`awesome-copilot`](https://awesome-copilot.github.com/) plugin marketplace. The plugin packages the Datadog MCP Server with bundled skills and auto-updates when new plugin versions ship. For more details, see Datadog's [copilot-plugin](https://github.com/datadog-labs/copilot-plugin) repository. If you previously installed the Datadog MCP Server manually, remove it from your Copilot configuration before installing the plugin to avoid conflicts.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Install the Datadog plugin:
    <pre><code>copilot plugin install datadog@awesome-copilot</code></pre>

1. For first-time setup, either run `/ddsetup` or enter any Datadog-related prompt. During setup, select your [Datadog site](/getting_started/site/) and complete OAuth login. Alternatively, set the MCP Server domain (and optionally Datadog API and application keys) as environment variables before starting Copilot.

1. Run `/ddtoolsets` to enable or disable groups of [product-specific MCP tools](#toolsets).

1. After any making any configuration change, restart `copilot` and reauthenticate the Datadog MCP Server.

1. Verify that you have the required [permissions](#required-permissions) for the Datadog resources you want to access.

<div class="alert alert-info">See the <a href="https://github.com/datadog-labs/copilot-plugin">copilot-plugin</a> repository for all available slash commands and configuration options.</div>

{{% collapse-content title="Manual MCP Server configuration" level="h4" expanded=false id="copilot-manual" %}}
If the plugin is not available to you, point Copilot at the MCP Server endpoint for your regional [Datadog site](/getting_started/site/) directly. Selected endpoint ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Run in terminal:
    <pre><code>copilot mcp add --transport http datadog-mcp {{< region-param key="mcp_server_endpoint" >}}</code></pre>

   Alternatively, add to `~/.copilot/mcp-config.json`:
    <pre><code>{
      "servers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
         }
       }
    }</code></pre>

1. To enable [product-specific tools](#toolsets), include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and Agent Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

{{% /collapse-content %}}
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}

<div class="alert alert-danger">Datadog MCP Server is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

{{% /tab %}}

{{% tab "Cursor" %}}

Install the [Datadog Plugin][1] from the Cursor Marketplace—the plugin includes the Datadog MCP Server and other resources. If you previously installed the Datadog MCP Server manually, remove it from the IDE's configuration to avoid conflicts. 

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
1. You can install the plugin from the Cursor Marketplace or from within Cursor:
   - From the Cursor Marketplace, open the [Datadog Plugin][1] and click {{< ui >}}Add to Cursor{{< /ui >}}.
   - In Cursor, navigate to {{< ui >}}Cursor Settings{{< /ui >}} > {{< ui >}}Plugins{{< /ui >}}, then search for the Datadog plugin and click {{< ui >}}Add to Cursor{{< /ui >}}.

1. After installation of the plugin, type `/ddsetup` in the agent chat to perform first-time setup.
1. Verify that you have the required [permissions](#required-permissions) for the Datadog resources you want to access.

[1]: https://cursor.com/marketplace/datadog
[2]: /ide_plugins/vscode/?tab=cursor#installation
[3]: /mcp_server/tools
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog MCP Server is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://cursor.com/marketplace/datadog
{{% /tab %}}

{{% tab "Devin" %}}

Connect Devin to the Datadog MCP Server by enabling it from Devin's MCP Marketplace. For the correct instructions, use the {{< ui >}}Datadog Site{{< /ui >}} selector on the right side of this documentation page to select your site.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
1. In Devin, go to {{< ui >}}Settings{{< /ui >}} > {{< ui >}}MCP Marketplace{{< /ui >}} and search for `Datadog`.
1. Select your Datadog site for the {{< ui >}}Server URL{{< /ui >}}; for example, your selected site is {{< region-param key="dd_site_name" code="true" >}}.
1. Enter your Datadog API and application keys.
1. Install and enable the server, and complete the OAuth login flow when prompted.
1. Verify that you have the required [permissions](#required-permissions) for the Datadog resources you want to access.

<div class="alert alert-info">To use product-specific toolsets, set up a <a href="https://docs.devin.ai/work-with-devin/mcp#setting-up-a-custom-mcp-server">custom MCP server</a> in Devin and include the <code>toolsets</code> query at the end of the endpoint URL. See <a href="#toolsets">Toolsets</a> for more information.
</div>

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog MCP Server is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "Gemini CLI" %}}

Point your AI agent to the MCP Server endpoint for your regional [Datadog site][1]. For the correct instructions, use the {{< ui >}}Datadog Site{{< /ui >}} selector on the right side of this documentation page to select your site.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Selected endpoint ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Run in terminal:
    <pre><code>gemini mcp add --transport http datadog {{< region-param key="mcp_server_endpoint" >}}</code></pre>

   Alternatively, add to `~/.gemini/settings.json`:
    <pre><code>{
      "mcpServers": {
        "datadog": {
          "httpUrl": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. To enable [product-specific tools](#toolsets), include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and Agent Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Verify that you have the required [permissions](#required-permissions) for the Datadog resources you want to access.

<div class="alert alert-info">If remote authentication is not available, use <a href="#local-binary-authentication">local binary authentication</a> instead.</div>

[1]: /getting_started/site/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog MCP Server is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /getting_started/site/
{{% /tab %}}

{{% tab "Goose" %}}

Point your AI agent to the MCP Server endpoint for your regional [Datadog site][3]. For the correct instructions, use the {{< ui >}}Datadog Site{{< /ui >}} selector on the right side of this documentation page to select your site.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Selected endpoint ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Add the Datadog MCP Server to Goose using one of the following methods:
   - **One-click install (recommended):** Use the Datadog MCP Server {{< region-param key="goose_mcp_install_deeplink" link="true" text="install deeplink" >}}.
   - **Manual configuration:** Follow Goose's instructions to [add an MCP server][2], using the endpoint listed in this section as the streamable HTTP server URL. To edit the configuration directly, modify `~/.config/goose/config.yaml`.

1. To enable [product-specific tools][1], include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and Agent Observability tools:

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

    To enable all generally available toolsets, use `toolsets=all`. This works best for clients that support tool filtering.

1. On first session launch, choose your Datadog account when prompted to authenticate.

1. Verify that you have the required [permissions](#required-permissions) for the Datadog resources you want to access.

[1]: #toolsets
[2]: https://goose-docs.ai/docs/getting-started/using-extensions#mcp-servers
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog MCP Server is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[3]: /getting_started/site/
{{% /tab %}}

{{% tab "JetBrains IDEs" %}}

JetBrains offers the [Junie][1] and [AI Assistant][2] plugins for their range of IDEs. GitHub offers the [Copilot][4] plugin. Alternatively, many developers use an agent CLI, such as Claude Code, Codex, or Gemini CLI, alongside their IDE.

Point your plugin to the MCP Server endpoint for your regional [Datadog site][3]. For the correct instructions, use the {{< ui >}}Datadog Site{{< /ui >}} selector on the right side of this documentation page to select your site.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Selected endpoint ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

{{% collapse-content title="Junie" level="h4" expanded=false id="jetbrains-junie" %}}
1. Go to {{< ui >}}Tools{{< /ui >}} > {{< ui >}}Junie{{< /ui >}} > {{< ui >}}MCP Settings{{< /ui >}} and add the following block:

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }
    </code></pre>

1. To enable [product-specific tools](#toolsets), include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and Agent Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. You are prompted to login through OAuth. The status indicator in the settings displays a green tick when the connection is successful.

1. Verify that you have the required [permissions](#required-permissions) for the Datadog resources you want to access.

{{% /collapse-content %}}

{{% collapse-content title="JetBrains AI Assistant" level="h4" expanded=false id="jetbrains-ai-assistant" %}}
1. Go to {{< ui >}}Tools{{< /ui >}} > {{< ui >}}AI Assistant{{< /ui >}} > {{< ui >}}Model Context Protocol (MCP){{< /ui >}} and add the following block:

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

1. To enable [product-specific tools](#toolsets), include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and Agent Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. The status indicator in the settings displays a green tick when the connection is successful.

1. Verify that you have the required [permissions](#required-permissions) for the Datadog resources you want to access.

{{% /collapse-content %}}

{{% collapse-content title="GitHub Copilot" level="h4" expanded=false id="github-copilot" %}}
1. Go to {{< ui >}}Tools{{< /ui >}} > {{< ui >}}GitHub Copilot{{< /ui >}} > {{< ui >}}Model Context Protocol (MCP){{< /ui >}} and add the following block:

    <pre><code>{
      "servers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }
    </code></pre>

1. To enable [product-specific tools](#toolsets), include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and Agent Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Click the {{< ui >}}Start{{< /ui >}} element that appears in the editor to start the server. You are prompted to log in through OAuth.

1. Verify that you have the required [permissions](#required-permissions) for the Datadog resources you want to access.

{{% /collapse-content %}}

{{% collapse-content title="Agent CLIs" level="h4" expanded=false id="jetbrains-agent-clis" %}}
Many developers use an agent CLI such as Claude Code, Codex, or Gemini CLI alongside their JetBrains IDE. See the configuration for those CLI tools:
- [Claude Code][4]
- [Codex][5]
- [Gemini CLI][6]

The [Datadog plugin for JetBrains IDEs][3] integrates with these agent CLIs. For an uninterrupted experience, install the plugin at the same time as you configure the Datadog MCP Server.

[3]: /ide_plugins/idea/
[4]: /mcp_server/setup/?tab=claudecode
[5]: /mcp_server/setup/?tab=codex
[6]: /mcp_server/setup/?tab=geminicli
{{% /collapse-content %}}
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog MCP Server is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://plugins.jetbrains.com/plugin/26104-junie-the-ai-coding-agent-by-jetbrains
[2]: https://plugins.jetbrains.com/plugin/22282-jetbrains-ai-assistant
[3]: /getting_started/site/
[4]: https://plugins.jetbrains.com/plugin/17718-github-copilot--your-ai-pair-programmer
{{% /tab %}}

{{% tab "Kiro" %}}

Point your AI agent to the MCP Server endpoint for your regional [Datadog site][3]. For the correct instructions, use the {{< ui >}}Datadog Site{{< /ui >}} selector on the right side of this documentation page to select your site.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Selected endpoint ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Add the following to your [Kiro MCP configuration file][2] (`~/.kiro/settings/mcp.json` for user-scoped configuration):

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. To enable [product-specific tools](#toolsets), include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and Agent Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Verify that you have the required [permissions](#required-permissions) for the Datadog resources you want to access.

[2]: https://kiro.dev/docs/mcp/configuration/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog MCP Server is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[3]: /getting_started/site/
{{% /tab %}}

{{% tab "OpenCode" %}}

Connect [OpenCode][3] to the Datadog MCP Server with the official [Datadog OpenCode Plugin][2] (in Preview). The plugin writes and maintains the MCP Server entry in your `opencode.json` and exposes the `ddsetup`, `ddconfig`, and `ddtoolsets` tools that the agent uses to handle setup, site changes, and [toolset](#toolsets) selection.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}

1. Add the plugin to your `opencode.json` configuration file. Create the file if it doesn't exist:

   <pre><code>{
     "plugin": ["@datadog/opencode-plugin"]
   }</code></pre>

    If a `plugin` array already exists, add `"@datadog/opencode-plugin"` to it.

    If you previously configured the Datadog MCP Server manually in `opencode.json`, remove or disable that entry to avoid conflicts with the plugin.

1. Restart OpenCode. The package is fetched from npm at startup.

1. Ask the agent to run `ddsetup`. The plugin walks through site selection.

1. Restart OpenCode again to activate the MCP Server, and complete the OAuth login flow when prompted.

1. Verify that you have the required [permissions](#required-permissions) for the Datadog resources you want to access.

1. To enable [product-specific tools](#toolsets), ask the agent to run `ddtoolsets`.

After setup, ask the agent to run `ddconfig` to change your Datadog site or troubleshoot the connection.

{{% collapse-content title="Manual configuration" level="h4" expanded=false id="opencode-manual" %}}
To configure the MCP Server without the plugin, add the following to your `opencode.json` configuration file.

Selected endpoint ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

<pre><code>{
  "mcp": {
    "datadog": {
      "type": "remote",
      "url": "{{< region-param key="mcp_server_endpoint" >}}",
      "enabled": true
    }
  }
}</code></pre>

To enable [product-specific tools](#toolsets), include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and Agent Observability tools:

<pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

To enable all generally available toolsets, use `toolsets=all`. This works best for clients that support tool filtering.
{{% /collapse-content %}}

[1]: /getting_started/site/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog MCP Server is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[2]: https://github.com/datadog-labs/opencode-plugin
[3]: https://opencode.ai/
{{% /tab %}}

{{% tab "VS Code" %}}

Datadog's [Cursor and VS Code extension][1] provides a configuration assistant for the Datadog MCP Server.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
1. Install the [Datadog extension][2]. If you have the extension installed already, make sure it's the latest version.
1. Sign in to your Datadog account.
1. **Restart the IDE.**
1. Run the {{< ui >}}Datadog: Open MCP Configuration Assistant{{< /ui >}} and follow the guidance to configure the Datadog MCP Server.
1. Verify that you have the required [permissions](#required-permissions) for the Datadog resources you want to access.

[2]: /ide_plugins/vscode/?tab=vscode#installation
[3]: /mcp_server/tools
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog MCP Server is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /ide_plugins/vscode/
{{% /tab %}}

{{% tab "Warp" %}}

[Warp][1] is an agentic terminal with built-in MCP support. Point the Warp agent to the MCP Server endpoint for your regional [Datadog site][2]. For the correct instructions, use the {{< ui >}}Datadog Site{{< /ui >}} selector on the right side of this documentation page to select your site.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Selected endpoint ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. In the Warp app, go to {{< ui >}}Settings{{< /ui >}} > {{< ui >}}MCP Servers{{< /ui >}} and click {{< ui >}}+ Add{{< /ui >}}.

1. Paste the following configuration:

    <pre><code>{
      "Datadog": {
        "url": "{{< region-param key="mcp_server_endpoint" >}}"
      }
    }</code></pre>

    To enable [product-specific tools](#toolsets), include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and Agent Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Click {{< ui >}}Start{{< /ui >}} on the Datadog server. Warp opens your browser to complete the OAuth login flow. Credentials are stored securely on your device and reused for future sessions.

1. Verify that you have the required [permissions](#required-permissions) for the Datadog resources you want to access.

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog MCP Server is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://www.warp.dev/
[2]: /getting_started/site/
{{% /tab %}}

{{% tab "Other" %}}

For most other [supported clients](#supported-clients), use these instructions for remote authentication. For Cline or when remote authentication is unreliable or not available, use [local binary authentication](#local-binary-authentication).

Point your AI agent to the MCP Server endpoint for your regional [Datadog site][1]. For the correct instructions, use the {{< ui >}}Datadog Site{{< /ui >}} selector on the right side of this documentation page to select your site.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
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

1. To enable [product-specific tools](#toolsets), include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and Agent Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Verify that you have the required [permissions](#required-permissions) for the Datadog resources you want to access.

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog MCP Server is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

[1]: /getting_started/site/
{{% /tab %}}
{{< /tabs >}}

## Toolsets

The Datadog MCP Server supports _toolsets_, which allow you to use only the [MCP tools][49] you need, saving valuable context window space. To use a toolset, include the `toolsets` query parameter in the endpoint URL when connecting to the MCP Server ([remote authentication](#authentication) only). Use `toolsets=all` to enable all generally available toolsets at once.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
For example, based on your selected [Datadog site][17] ({{< region-param key="dd_site_name" >}}):

- Retrieve only the core tools (this is the default if `toolsets` is not specified):
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>

- Retrieve only Synthetic Testing-related tools:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=synthetics</code></pre>

- Retrieve core, Synthetic Testing, and Software Delivery tools:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,synthetics,software-delivery</code></pre>

- Retrieve all generally available tools:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=all</code></pre>

<div class="alert alert-info">Enabling all toolsets increases the number of tool definitions sent to your AI client, which consumes context window space. <code>toolsets=all</code> works best with clients that support tool filtering, such as Claude Code.</div>

[17]: /getting_started/site/#navigate-the-datadog-documentation-by-site
{{< /site-region >}}

### Omit specific tools

Use the `omit_tools` query parameter to remove specific tools from the final tool list.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Examples for your selected site ({{< region-param key="dd_site_name" >}}):

- Omit tools from the default set:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?omit_tools=search_datadog_logs,search_datadog_spans</code></pre>

- Select toolsets, then omit one tool:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,software-delivery&omit_tools=search_datadog_incidents</code></pre>

- Start from all generally available toolsets, then omit write tools:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=all&omit_tools=create_datadog_notebook,edit_datadog_notebook</code></pre>
{{< /site-region >}}

Provide tool names as a comma-separated list. When both parameters are present, the server resolves `toolsets` first and then removes matching tools in `omit_tools`. If `omit_tools` includes unknown tool names, the server warns and continues.

### Available toolsets

These toolsets are generally available. See [Datadog MCP Server Tools][49] for a complete reference of available tools organized by toolset, with example prompts.

- `core`: The default toolset for logs, metrics, traces, dashboards, monitors, incidents, hosts, services, events, and notebooks
- `alerting`: Tools for validating and creating monitors, searching monitor groups, retrieving monitor templates, analyzing monitor coverage, and searching SLOs
- `cases`: Tools for [Case Management][42], including creating, searching, and updating cases; managing projects; and linking Jira issues
- `cost`: Tools for [Cloud Cost Management][63], including listing cost-saving recommendations ranked by estimated potential daily savings
- `dashboards`: Tools for retrieving, creating, updating, and deleting [dashboards][46], plus widget schema reference and validation
- `dbm`: Tools for interacting with [Database Monitoring][33]
- `ddsql`: Tools for querying Datadog data using [DDSQL][44], a SQL dialect with support for infrastructure resources, logs, metrics, RUM, spans, and other Datadog data sources
- `error-tracking`: Tools for interacting with Datadog [Error Tracking][32]
- `feature-flags`: Tools for managing [feature flags][35], including creating, listing, and updating flags and their environments
- `kubernetes`: Tools for searching and describing [Kubernetes][51] resources and retrieving manifests across all clusters
- `llmobs`: Tools for searching and analyzing [Agent Observability][36] spans and experiments
- `networks`: Tools for [Cloud Network Monitoring][37] analysis and [Network Device Monitoring][38]
- `onboarding`: Agentic onboarding tools for guided Datadog setup and configuration
- `product-analytics`: Tools for interacting with [Product Analytics][41] queries
- `profiling`: Tools for discovering, exploring, and analyzing [Continuous Profiler][58] data
- `reference-tables`: Tools for managing [Reference Tables][48], including listing tables, reading rows, appending rows, and creating tables from cloud storage
- `rum`: Tools for [Real User Monitoring][57], including resolving applications, summarizing performance, surfacing aggregated insights, exploring metrics, managing retention filters, and managing custom RUM metrics
- `security`: Tools for code security scanning and searching [security signals][39] and [security findings][40]
- `software-delivery`: Tools for interacting with Software Delivery ([CI Visibility][30] and [Test Optimization][31])
- `synthetics`: Tools for interacting with Datadog [Synthetic tests][29]
- `widgets`: Tools for [dashboard][46] and [notebook][54] widget visualization, validation, and type conversion.
- `workflows`: Tools for [Workflow Automation][43], including listing, inspecting, executing, and configuring workflows for agent use

### Preview toolsets

These toolsets are in Preview. Sign up for a toolset by completing the Product Preview form or contact [Datadog support][47] to request access.
- `apm`: ([Sign up][45]) Tools for in-depth [APM][34] trace analysis, span search, Watchdog insights, and performance investigation
- `code-exec`: ([Sign up][60]) A single tool that runs agent-authored TypeScript in a Datadog-managed sandbox with direct access to Datadog APIs, for multi-signal investigation and ad-hoc data exploration in one call
- `remote-actions`: ([Sign up][62]) Tools for on-host diagnostics, including reading files, listing directories, and running safe read-only shell commands directly on instrumented hosts through the Agent

## Supported clients

| Client | Developer | Notes |
|--------|------|------|
| [ChatGPT][59] | OpenAI | In Preview, and available for US1 customers only. |
| [Cursor][3] | Cursor | Datadog [Cursor & VS Code extension][15] recommended. |
| [Claude Code][4] | Anthropic | Datadog [Claude Code plugin][55] recommended. |
| [Claude][19] | Anthropic | Datadog [Claude Connector][56] recommended. Includes Claude Cowork. |
| [Codex CLI][6] | OpenAI | |
| [Copilot CLI][64] | Microsoft | Datadog [Copilot plugin][65] recommended. |
| [Gemini CLI][50] | Google | |
| [Warp][28] | Warp | |
| [VS Code][7] | Microsoft | Datadog [Cursor & VS Code extension][16] recommended. |
| [JetBrains IDEs][18] | JetBrains | [Datadog plugin][18] recommended. |
| [Kiro][9], [Kiro CLI][10] | Amazon Web Services | |
| [Goose][8] | Agentic AI Foundation | |
| [OpenCode][52] | SST | Datadog [OpenCode plugin][53] recommended. |
| [Cline][11] | Various | See the {{< ui >}}Other{{< /ui >}} tab above. Use local binary authentication for Cline if remote authentication is unreliable. |

<div class="alert alert-info">The Datadog MCP Server is under significant development, and additional supported clients may become available.</div>

## Required permissions

MCP Server tools require the following [Datadog user role permissions][22]:

| Permission | Required for |
|------------|-------------|
| <code style="white-space:nowrap">mcp_read</code> | Tools that read data from Datadog (for example, querying monitors, searching logs, retrieving dashboards) |
| <code style="white-space:nowrap">mcp_write</code> | Tools that create or modify resources in Datadog (for example, creating monitors, muting hosts) |

In addition to `mcp_read` or `mcp_write`, users need the standard Datadog permissions for the underlying resource. For example, using an MCP tool that reads monitors requires both `mcp_read` and the [Monitors Read][24] permission. See [Datadog Role Permissions][25] for the full list of resource-level permissions.

Users with the {{< ui >}}Datadog Standard Role{{< /ui >}} have both MCP Server permissions by default. If your organization uses [custom roles][23], add the permissions manually:
1. Go to [{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Roles{{< /ui >}}][26] as an administrator, and click the role you want to update.
1. Click {{< ui >}}Edit Role{{< /ui >}} (pencil icon).
1. Under the permissions list, select the {{< ui >}}MCP Read{{< /ui >}} and {{< ui >}}MCP Write{{< /ui >}} checkboxes.
1. Select any other resource-level permissions you need for the role.
1. Click {{< ui >}}Save{{< /ui >}}.

Organization administrators can manage global MCP access and write capabilities from [Organization Settings][27].

## Authentication

The MCP Server uses OAuth 2.0 for [authentication][14]. If you cannot go through the OAuth flow (for example, on a server), you can provide a Datadog [API key and application key][1] as `DD_API_KEY` and `DD_APPLICATION_KEY` HTTP headers.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
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

### Adding OAuth clients

You can allow-list your redirect URLs in [{{< ui >}}Organization Preferences{{< /ui >}}][27] under {{< ui >}}MCP OAuth Redirect URLs{{< /ui >}}.

If you are a partner or vendor adding Datadog to an MCP directory for your AI agent platform, submit your interest through Datadog's [Technology Partner Signup][61].

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

## Test access to the MCP Server

1. Install the [MCP inspector][2], a developer tool for testing and debugging MCP servers.

   ```bash
   npx @modelcontextprotocol/inspector
   ```
2. In the inspector's web UI, for {{< ui >}}Transport Type{{< /ui >}}, select {{< ui >}}Streamable HTTP{{< /ui >}}.
3. For {{< ui >}}URL{{< /ui >}}, enter the MCP Server endpoint for your regional Datadog site. 
   {{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
   For example, for {{< region-param key="dd_site_name" >}}: <code>{{< region-param key="mcp_server_endpoint" >}}</code>
   {{< /site-region >}}
4. Click {{< ui >}}Connect{{< /ui >}}, then go to {{< ui >}}Tools{{< /ui >}} > {{< ui >}}List Tools{{< /ui >}}.
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
[12]: /mcp_server/tools
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
[29]: /synthetics/
[30]: /continuous_integration/
[31]: /tests/
[32]: /error_tracking/
[33]: /database_monitoring/
[34]: /tracing/
[35]: /feature_flags/
[36]: /llm_observability/mcp_server/
[37]: /network_monitoring/cloud_network_monitoring/
[38]: /network_monitoring/devices/
[39]: /security/threats/security_signals/
[40]: /security/misconfigurations/findings/
[41]: /product_analytics
[42]: /service_management/case_management/
[43]: /actions/workflows/
[44]: /ddsql_editor/
[45]: https://www.datadoghq.com/product-preview/apm-mcp-toolset/
[46]: /dashboards/
[47]: /help/
[48]: /reference_tables/
[49]: /mcp_server/tools
[50]: https://github.com/google-gemini/gemini-cli
[51]: /containers/monitoring/kubernetes_explorer/
[52]: https://opencode.ai/
[53]: https://github.com/datadog-labs/opencode-plugin
[54]: /notebooks/
[55]: https://claude.com/plugins/datadog
[56]: https://claude.ai/directory/connectors/datadog
[57]: /real_user_monitoring/
[58]: https://partners.datadoghq.com/s/login/SelfRegister
[59]: https://chatgpt.com/
[60]: https://www.datadoghq.com/product-preview/mcp-codexec/
[61]: /getting_started/profiler/
[62]: https://www.datadoghq.com/product-preview/datadog-agent-mcp/
[63]: /cloud_cost_management/
[64]: https://github.com/features/copilot/cli
[65]: https://awesome-copilot.github.com/plugins/#file=plugins%2Fdatadog