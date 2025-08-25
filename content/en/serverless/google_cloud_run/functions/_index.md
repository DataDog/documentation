---
title: Instrumenting Cloud Run Functions
type: multi-code-lang
further_reading:
  - link: 'https://cloud.google.com/blog/products/serverless/google-cloud-functions-is-now-cloud-run-functions'
    tag: 'Blog'
    text: 'Cloud Functions is now Cloud Run functions — event-driven programming in one unified serverless platform'

---

First, set up the [Datadog-Google Cloud Platform integration][1] to collect metrics and logs from Google Cloud services. Remember to add the `cloud asset viewer` role to your service account and enable the Cloud Asset Inventory API in Google Cloud.

Then, select your runtime below for instructions on how to instrument your application:

{{% serverless-init-languages path="google_cloud_run/functions" %}}

[1]: /integrations/google-cloud-platform/
