{% callout url="#" header="false" btn_hidden=true %}
Agentic Onboarding is in Preview.
{% /callout %}

Agentic Onboarding lets LLM coding agents instrument your frontend applications for [Error Tracking][3], [Real User Monitoring (RUM)][4], and [Product Analytics][5] with a single prompt.

Your coding assistant, such as [Cursor][1] or [Claude Code][2], detects your project's frameworks, adds configuration, and provisions required tokens and apps directly from your IDE.

#### Supported frameworks

Agentic Onboarding is available for the following frameworks: Android, Angular, iOS, Next.js, React, Svelte, Vanilla JS, and Vue.

#### Setup

{% stepper %}

{% step title="Install the Datadog Onboarding MCP server" %}

To install the Datadog Onboarding Model Context Protocol (MCP) server, follow the steps for your coding assistant:

{% tabs %}
{% tab label="Claude Code" %}
{% site-region region="gov,gov2" %}
{% alert level="danger" %}
Agentic Onboarding is not available in the selected site ({% region-param key="dd_site_name" /%}).
{% /alert %}
{% /site-region %}

{% site-region region="us,us3,us5,eu,ap1,ap2" %}
1. Open an active Claude Code session and run the following command, replacing `<DATADOG_DATACENTER>` with your [Datadog datacenter][6] and `<DATADOG_SITE>` with your [Datadog site][6]:

   ```shell
   claude mcp add --transport http datadog-onboarding-<DATADOG_DATACENTER> "https://mcp.<DATADOG_SITE>/api/unstable/mcp-server/mcp?toolsets=onboarding"
   ```

2. Select the MCP server installed in Step 1. You should see a `disconnected - Enter to login` message. Press {% kbd %}Enter{% /kbd %}.
3. When you see the option to authenticate, press {% kbd %}Enter{% /kbd %}. This brings you to the OAuth screen.
4. After authentication, choose {% ui %}Open{% /ui %} to continue and grant access to your Datadog account.
5. Confirm that MCP tools appear under the **datadog-onboarding-`<DATADOG_DATACENTER>`** server.
{% /site-region %}
{% /tab %}

{% tab label="Cursor" %}
{% site-region region="gov,gov2" %}
{% alert level="danger" %}
Agentic Onboarding is not available in the selected site ({% region-param key="dd_site_name" /%}).
{% /alert %}
{% /site-region %}

{% site-region region="us,us3,us5,eu,ap1,ap2" %}
1. In Datadog, navigate to [**Digital Experience** > **Add an Application**][7] and copy the Cursor deeplink for your site.
2. In Cursor, click {% ui %}Install{% /ui %} for the **datadog-onboarding** server.
3. If the MCP server shows a {% ui %}Needs login{% /ui %} or {% ui %}Connect{% /ui %} link, select it and complete the OAuth flow. When prompted, choose {% ui %}Open{% /ui %} to continue and grant access to your Datadog account.
4. After authentication, return to Cursor and confirm that MCP tools appear under the **datadog-onboarding** server.
{% /site-region %}
{% /tab %}

{% tab label="Datadog AI Setup CLI" %}
{% site-region region="gov,gov2" %}
{% alert level="danger" %}
Agentic Onboarding is not available in the selected site ({% region-param key="dd_site_name" /%}).
{% /alert %}
{% /site-region %}

{% site-region region="us,us3,us5,eu,ap1,ap2" %}
The Datadog AI Setup CLI configures your project without a coding assistant.

1. Run the `npx` command, replacing `<PRODUCT>` with the identifier for the product you want to set up:

   | Product | Identifier |
   |---------|------------|
   | Error Tracking | `error-tracking` |
   | Product Analytics | `product-analytics` |
   | Real User Monitoring | `rum` |

   ```shell
   npx @datadog/ai-setup-cli --product <PRODUCT>
   ```

2. A browser window opens for authentication. Complete the OAuth flow and grant access to your Datadog account.
3. Return to your terminal. The CLI detects your project's frameworks, applies the required configuration, and provisions any necessary tokens.
{% /site-region %}
{% /tab %}
{% /tabs %}
{% /step %}

{% step title="Set up your project" %}

Your AI coding agent can help configure Datadog for your project. When you provide a setup prompt, the agent:

- Analyzes your project and identifies the framework, language, and bundler
- Calls the MCP tool and requests permission before running
- Applies the configuration changes specified by the tool
- Provides steps to verify that your application is sending telemetry to Datadog

**Note**: Your coding agent makes changes locally but does not commit them.

To get started:

1. Choose the product you want to use and paste its setup prompt into your AI agent:

   {% tabs %}
   {% tab label="Real User Monitoring" %}
   ```text
   Add Datadog Real User Monitoring to my project
   ```
   {% /tab %}

   {% tab label="Error Tracking" %}
   ```text
   Add Datadog Error Tracking to my project
   ```
   {% /tab %}

   {% tab label="Product Analytics" %}
   ```text
   Add Datadog Product Analytics to my project
   ```
   {% /tab %}
   {% /tabs %}

2. Review and accept each action your AI agent proposes to complete the setup process.

{% /step %}

{% step title="Deploy your app to production" %}

Commit the changes to your repository and configure the provided environment variables in your production environment.

{% /step %}
{% /stepper %}


[1]: https://cursor.com/
[2]: https://claude.ai/
[3]: /error_tracking/frontend/
[4]: /real_user_monitoring/
[5]: /product_analytics/
[6]: /getting_started/site/
[7]: https://app.datadoghq.com/rum/list
