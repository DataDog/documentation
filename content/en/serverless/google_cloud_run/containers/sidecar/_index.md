---
title: Sidecar Instrumentation
type: multi-code-lang
aliases:
  - /serverless/google_cloud_run/containers_sidecar/
---

First, set up the **[Google Cloud Integration][1]** to collect metrics and logs from Google Cloud services. Remember to add the `cloud asset viewer` role to your service account and enable the Cloud Asset Inventory API in Google Cloud.

Then, instrument your application using one of the following guides:

{{% container-languages path="sidecar" %}}

[1]: /integrations/google-cloud-platform/
