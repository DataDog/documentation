---
title: Extra hosts with name "N/A" reporting data
kind: faq
---

After enabling the CloudWatch integration, you might see a metric reporting from a node named "N/A". Some AWS crawlers send an aggregate metric in addition to the per-node metrics.

{{< img src="integrations/faq/reporting_na.png" alt="reporting_na" responsive="true" >}}

If you'd like to remove the "N/A" tagged metrics, we can enable a feature that filters out all AWS aggregate metrics. Be advised that monitors and graphs set up for AWS metrics using sum values may be affected after we enable filtering.

[Contact support][1] to enable filtering and check if any of your monitors is affected.

[1]: /help
