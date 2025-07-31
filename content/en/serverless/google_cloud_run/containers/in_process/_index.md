---
title: In-Process Instrumentation
type: multi-code-lang
aliases:
  - /serverless/google_cloud_run/containers_in_process/
---

First, set up the [Google Cloud Integration][1] to collect metrics and logs from Google Cloud services. Remember to add the `cloud asset viewer` role to your service account and enable the Cloud Asset Inventory API in Google Cloud.

Then, instrument your application using one of the following guides:

{{< partial name="serverless/in-process-languages.html" >}}

[1]: /integrations/google-cloud-platform/
