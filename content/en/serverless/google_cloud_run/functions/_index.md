---
title: Instrumenting Cloud Run Functions
type: multi-code-lang
further_reading:
  - link: 'https://cloud.google.com/blog/products/serverless/google-cloud-functions-is-now-cloud-run-functions'
    tag: 'Blog'
    text: 'Cloud Functions is now Cloud Run functions — event-driven programming in one unified serverless platform'
  - link: "/bits_ai/mcp_server/tools/#serverless_onboarding"
    tag: 'Documentation'
    text: 'Datadog MCP Server: serverless_onboarding tool'

---

<div class="alert alert-info">
<strong>Looking for 1st gen Cloud Run functions?</strong> If you're using Cloud Run functions (1st gen), previously known as Cloud Functions (1st gen), see <a href="/serverless/google_cloud_run/functions_1st_gen">Instrumenting 1st Gen Cloud Run Functions</a>.
</div>

First, set up the [Datadog-Google Cloud Platform integration][1] to collect metrics and logs from Google Cloud services. Remember to add the `cloud asset viewer` role to your service account and enable the Cloud Asset Inventory API in Google Cloud.

Then, select your runtime below for instructions on how to instrument your application:

{{% container-languages path="google_cloud_run/functions" functions="true" %}}

## Use the Datadog MCP server

Use the Datadog MCP server's [`serverless_onboarding`][2] tool to set up monitoring for your Cloud Run functions with AI assistance. After you connect, try a prompt like:

```shell
Help me monitor my GCP Cloud Run functions with Datadog using Terraform.
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/google-cloud-platform/
[2]: /bits_ai/mcp_server/tools/#serverless_onboarding
