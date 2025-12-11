### Install the Datadog Onboarding MCP server

To install the Datadog Onboarding Model Context Protocol (MCP) server, follow the steps for your coding assistant:

{{< tabs >}}
{{% tab "Claude Code" %}}
{{< site-region region="gov" >}}
<div class="alert alert-danger">Agentic Onboarding is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Open an active Claude Code session with the /mcp command:

   <pre>
   <code>
   claude mcp add --transport http datadog-onboarding-{{< region-param key=dd_datacenter_lowercase >}} "https://mcp.{{< region-param key=dd_site >}}/api/unstable/mcp-server/mcp?toolsets=onboarding"
   </code>
   </pre>

2. Select the MCP server installed in Step 1. You should see a `disconnected - Enter to login` message. Press <kbd>Enter</kbd>.
3. When you see the option to authenticate, press <kbd>Enter</kbd>. This brings you to the OAuth screen.
4. After authentication, choose **Open** to continue and grant access to your Datadog account.
5. Confirm that MCP tools appear under the **datadog-onboarding-{{< region-param key=dd_datacenter_lowercase >}}** server.
{{< /site-region >}}

{{% /tab %}}

{{% tab "Cursor" %}}
{{< site-region region="gov" >}}
<div class="alert alert-danger">Agentic Onboarding is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Copy and paste the following deeplink into your browser:

   <pre>
   <code>
   {{< region-param key=cursor_mcp_install_deeplink >}}
   </code>
   </pre>

2. In Cursor, click **Install** for the **datadog-onboarding-{{< region-param key=dd_datacenter_lowercase >}}** server.
3. If the MCP server shows a **Needs login** or **Connect** link, select it and complete the OAuth flow. When prompted, choose **Open** to continue and grant access to your Datadog account.
4. After authentication, return to Cursor and confirm that MCP tools appear under the **datadog-onboarding-{{< region-param key=dd_datacenter_lowercase >}}** server.
{{< /site-region >}}

{{% /tab %}}
{{< /tabs >}}

### Set up your project

Your AI coding agent can help configure Datadog for your project. When you provide a setup prompt, the agent:

- Analyzes your project and identifies the framework, language, and bundler
- Calls the MCP tool and requests permission before running
- Applies the configuration changes specified by the tool
- Provides steps to verify that your application is sending telemetry to Datadog

**Note**: Your coding agent makes changes locally but does not commit them.
