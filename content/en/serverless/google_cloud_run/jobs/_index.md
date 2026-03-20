---
title: Instrumenting Cloud Run Jobs
type: multi-code-lang

---

{{< callout url="https://forms.gle/DNbZDFb3mDTt2vxb7"
 btn_hidden="false" header="Join the Preview!">}}
Serverless Monitoring for Google Cloud Run Jobs is in Preview. Use this form to submit your request today.
{{< /callout >}}

First, set up the [Datadog-Google Cloud Platform integration][1] to collect metrics and logs from Google Cloud services. Remember to add the `cloud asset viewer` role to your service account and enable the Cloud Asset Inventory API in Google Cloud.

Then, select your runtime below for instructions on how to instrument your application:

{{% container-languages path="google_cloud_run/jobs" jobs="true" %}}

[1]: /integrations/google-cloud-platform/
