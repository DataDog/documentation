---
title: Sidecar Instrumentation
type: multi-code-lang
aliases:
  - /serverless/google_cloud_run/containers_sidecar/
---

First, set up the [Datadog-Google Cloud Platform integration][1] to collect metrics and logs from Google Cloud services. Remember to add the `cloud asset viewer` role to your service account and enable the Cloud Asset Inventory API in Google Cloud.

Then, select your runtime below for instructions on how to instrument your application:

{{% container-languages path="google_cloud_run/containers/sidecar" %}}

[1]: /integrations/google-cloud-platform/
