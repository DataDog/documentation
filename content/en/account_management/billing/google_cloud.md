---
title: Google Cloud integration billing
kind: documentation
---

## Overview

Datadog bills for hosts running the Agent and all GCE instances picked up by the Google Cloud integration. You are not billed twice if you are running the Agent on a GCE instance picked up by the Google Cloud integration.

Other Google Cloud resources (CloudSQL, Google App Engine, Pub/Sub, etc.) are not part of monthly billing.

## Google Cloud metric exclusion

Use the [Google Cloud integration tile][1] to control your metric collection. Go to the **Configuration** tab and select a project or add a new one. Each project is controlled under **Optionally Limit Metrics Collection to hosts with tag**. Limit metrics by [host tag][2]:

{{< img src="account_management/billing/google-cloud01.png" alt="Google Cloud" >}}

When adding limits to existing Google Cloud projects within the integration tile, the previously discovered instances could stay in the [Infrastructure List][3] up to 2 hours. During the transition period, GCE instances display a status of `???`. This does not count towards your billing.

Hosts with a running Agent still display and are included in billing. Using the limit option is only applicable to GCE instances without a running Agent.

## Troubleshooting

For technical questions, contact [Datadog support][4].

For billing questions, contact your [Customer Success][5] Manager.

[1]: https://app.datadoghq.com/account/settings#integrations/google_cloud_platform
[2]: /getting_started/tagging/using_tags/#integrations
[3]: /infrastructure/
[4]: /help/
[5]: mailto:success@datadoghq.com
