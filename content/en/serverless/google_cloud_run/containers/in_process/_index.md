---
title: Instrumenting Containers In-Process
type: multi-code-lang
aliases:
  - /serverless/google_cloud_run/containers/in_process/
redirect: /serverless/google_cloud_run/containers/in_process/python/
---

First, set up the [Google Cloud Integration][1] to collect metrics and logs from Google Cloud services. Remember to add the `cloud asset viewer` role to your service account and enable the Cloud Asset Inventory API in Google Cloud.

Then, instrument your application using one of the following guides:

{{< partial name="serverless/in-process-languages.html" >}}

[1] /integrations/google-cloud-platform/
