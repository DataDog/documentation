---
"categories":
- metrics
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Monitor Conviva Quality Insights metrics for video streaming platforms."
"doc_link": "https://docs.datadoghq.com/integrations/conviva/"
"draft": false
"git_integration_title": "conviva"
"has_logo": true
"integration_id": ""
"integration_title": "Conviva"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "conviva"
"public_title": "Datadog-Conviva Integration"
"short_description": "Collects Conviva Quality Metriclens metrics."
"team": "web-integrations"
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Connect Datadog with your Conviva account to see your quality of experience (QoE) MetricLens metrics.

## セットアップ

### インストール

Install the integration with the Datadog [Conviva integration tile][1].

### 構成
1. Go to the configuration tab inside the Datadog [Conviva integration tile][1].
2. Click **Add New Credentials** and input your Conviva API Key and API Secret. Datadog searches for accounts associated with those credentials.
3. After Datadog finds the accounts associated with your credentials, add a _MetricLens_ to determine which metrics are be ingested into Datadog. Specify a name for the MetricLens along with a _Filter_ and _Dimension_. The name is automatically tagged for that specific MetricLens.
4. Optionally, add tags to specific MetricLenses or to accounts. When you add a tag to an account, the tag is applied to all MetricLenses associated with that account.
5. Add more _MetricLenses_ by clicking **Add New** and following the instructions.
6. Repeat these steps with any additional Conviva credentials using the **Add New Credentials** button.

### Dashboard
After configuring the integration, use the out-of-the box Conviva dashboard to obtain an overview of MetricLens metrics. By default, all metrics collected across all MetricLenses are displayed.

{{< img src="integrations/conviva/conviva_dashboard.png" alt="The out-of-the-box dashboard for the Conviva integration" popup="true" style="width:100%" >}}

Filter by `metriclens` to view the breakdown of the metrics by each corresponding MetricLens configured on the tile. Drill down further by filtering by `dimension` to view metrics by a single dimension entity. 

## 収集データ

### メトリクス
{{< get-metrics-from-git "conviva" >}}


### イベント

The Conviva integration sends alerts to your [Datadog event stream][3].

{{< img src="integrations/conviva/conviva_eventstream.png" alt="Monitor alerts in the Datadog Conviva Event Stream" popup="true" style="width:100%" >}}

### サービスチェック

The Conviva integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][4].

## Further Reading

Additional helpful documentation, links, and articles:

- [Monitor Conviva with Datadog][5]

[1]: https://app.datadoghq.com/integrations/conviva
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/conviva/conviva_metadata.csv
[3]: https://docs.datadoghq.com/events/
[4]: https://docs.datadoghq.com/help/
[5]: https://www.datadoghq.com/blog/video-streaming-performance-monitoring-conviva/

