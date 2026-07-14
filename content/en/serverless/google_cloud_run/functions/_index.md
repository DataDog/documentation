---
title: Instrumenting Cloud Run Functions
type: multi-code-lang
further_reading:
  - link: 'https://cloud.google.com/blog/products/serverless/google-cloud-functions-is-now-cloud-run-functions'
    tag: 'Blog'
    text: 'Cloud Functions is now Cloud Run functions — event-driven programming in one unified serverless platform'
  - link: "/mcp_server/tools/#serverless_onboarding"
    tag: 'Documentation'
    text: 'Datadog MCP Server: serverless_onboarding tool'

---

<div class="alert alert-info">
<strong>Looking for 1st gen Cloud Run functions?</strong> If you're using Cloud Run functions (1st gen), previously known as Cloud Functions (1st gen), see <a href="/serverless/google_cloud_run/functions_1st_gen">Instrumenting 1st Gen Cloud Run Functions</a>.
</div>

## Set up with agentic onboarding

Use agentic onboarding to set up monitoring for your Cloud Run functions with AI assistance. Agentic onboarding detects your project's frameworks, applies the required configuration in place, and verifies that data is flowing. Two complementary paths use the same Datadog account:

- **AI Setup CLI**: A standalone terminal tool. Use it when you don't want to install an MCP server.
- **MCP server**: Set up from your IDE through a coding assistant such as Claude Code or Cursor.

{{< tabs >}}
{{% tab "AI Setup CLI" %}}

Run the CLI in your project directory (requires Node.js 22+). It links your Datadog account, then instruments your Cloud Run function:

```shell
npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=gcp-cloud-run-functions
```

Omit `--product` to run interactively, or add `--site` to target your Datadog site.

{{% /tab %}}
{{% tab "MCP server" %}}

Use the Datadog MCP server's [`serverless_onboarding`](https://docs.datadoghq.com/agentic_onboarding/setup/?tab=serverlessmonitoring#mcp-server) tool to set up monitoring for your Cloud Run functions with AI assistance. After you connect, try a prompt like:

```
Help me monitor my GCP Cloud Run functions with Datadog using Terraform.
```

{{% /tab %}}
{{< /tabs >}}

## Manual instrumentation

First, set up the [Datadog-Google Cloud Platform integration][1] to collect metrics and logs from Google Cloud services. Remember to add the `cloud asset viewer` role to your service account and enable the Cloud Asset Inventory API in Google Cloud.

Then, select your runtime below for instructions on how to instrument your application:

{{% container-languages path="google_cloud_run/functions" functions="true" %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/google-cloud-platform/
[2]: /agentic_onboarding/setup
