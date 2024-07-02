---
"categories":
- cloud
- notifications
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Segment integration can collect event delivery metrics for your workspace destinations."
"doc_link": "https://docs.datadoghq.com/integrations/segment/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/monitor-segment-datadog/"
  "tag": Blog
  "text": Monitor customer data infrastructure with Segment and Datadog
"git_integration_title": "segment"
"has_logo": true
"integration_id": ""
"integration_title": "Segment"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "segment"
"public_title": "Datadog-Segment Integration"
"short_description": "Collects Segment event delivery metrics."
"team": "web-integrations"
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Segment is a customer data infrastructure that makes it easy for you to clean, collect, and control first-party customer data. Segment collects data from sources such as websites or mobile apps, and routes it to one or more destinations (for example, Google Analytics and Amazon Redshift).

Use Datadog's out-of-the-box dashboard and monitors to:
- Visualize event delivery metrics for cloud mode destinations.
- Analyze data (such as splitting metrics by workspace or by destination) using Datadog's tag system.
- Automate alerts for any delivery problems so you know when critical data pipelines are down.

**Note**: These metrics are intended for delivery to destinations such as Snowflake or Amplitude, not for delivery from instrumented applications to Segment.

## セットアップ

### インストール

Navigate to the [integration tile][1] and grant Datadog `workspace:read` access to a workspace by clicking on the `Add WorkSpace` link to initiate an OAuth2 flow.
The Segment user that grants Datadog access to a workspace must have role `workspace owner`.

## 収集データ

### メトリクス
{{< get-metrics-from-git "segment" >}}


### イベント

The Segment integration does not include any events.

### サービスチェック

The Segment integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/segment
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/segment/segment_metadata.csv
[3]: https://docs.datadoghq.com/help/

