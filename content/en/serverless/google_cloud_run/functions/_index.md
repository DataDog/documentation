---
title: Instrumenting Cloud Run Functions
type: multi-code-lang
further_reading:
  - link: 'https://cloud.google.com/blog/products/serverless/google-cloud-functions-is-now-cloud-run-functions'
    tag: 'Blog'
    text: 'Cloud Functions is now Cloud Run functions — event-driven programming in one unified serverless platform'

---

<div class="alert alert-info">
<strong>Looking for 1st gen Cloud Run functions?</strong> If you're using Cloud Run functions (1st gen), previously known as Cloud Functions (1st gen), see <a href="/serverless/google_cloud_run/functions_1st_gen">Instrumenting 1st Gen Cloud Run Functions</a>.
</div>

First, set up the [Datadog-Google Cloud Platform integration][1] to collect metrics and logs from Google Cloud services. Remember to add the `cloud asset viewer` role to your service account and enable the Cloud Asset Inventory API in Google Cloud.

Then, select your runtime below for instructions on how to instrument your application:

{{% container-languages path="google_cloud_run/functions" functions="true" %}}

[1]: /integrations/google-cloud-platform/
