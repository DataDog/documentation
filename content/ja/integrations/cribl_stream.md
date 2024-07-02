---
"app_id": "cribl-stream"
"app_uuid": "2ef15aea-af91-4769-940c-2b124e4d04a6"
"assets":
  "dashboards":
    "cribl_stream_overview": assets/dashboards/cribl_stream_overview.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": cribl.logstream.health.outputs
      "metadata_path": metadata.csv
      "prefix": cribl.logstream.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10391"
    "source_type_name": Cribl
"author":
  "homepage": "https://cribl.io"
  "name": Cribl
  "sales_email": sales@cribl.io
  "support_email": support@cribl.io
"categories":
- aws
- azure
- cloud
- containers
- kubernetes
- google cloud
- log collection
- security
- モニター
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/cribl_stream/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "cribl_stream"
"integration_id": "cribl-stream"
"integration_title": "Cribl Stream"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "cribl_stream"
"public_title": "Cribl Stream"
"short_description": "Collect observability data in a vendor-neutral data telemetry pipeline"
"supported_os":
- linux
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Submitted Data Type::Metrics"
  - "Category::AWS"
  - "Category::Azure"
  - "Category::Cloud"
  - "Category::Containers"
  - "Category::Kubernetes"
  - "Category::Google Cloud"
  - "Category::Log Collection"
  - "Category::Security"
  - "Category::Metrics"
  "configuration": "README.md#Setup"
  "description": Collect observability data in a vendor-neutral data telemetry pipeline
  "media":
  - "caption": Observability Changes Everything
    "image_url": images/observability_changes.png
    "media_type": video
    "vimeo_id": !!int "567294419"
  - "caption": Cribl Stream Dashboard for Datadog
    "image_url": images/cribl_dashboard_for_datadog.png
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Cribl Stream
  "uninstallation": "README.md#Uninstallation"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview
[Cribl Stream][1] helps you process machine data logs, instrumentation data, application data, and metrics in real time, and deliver it to your analysis platform of choice. It allows you to:

- Add context to your data, by enriching it with information from external data sources.
- Help secure your data, by redacting, obfuscating, or encrypting sensitive fields.
- Optimize your data, per your performance and cost requirements.

This is for the self-hosted Cribl Stream version. 

Use the out-of-the-box dashboard to view the performance of the Stream with base metrics like events per second, bytes per second, input types, output types, and infrastructure metrics. Monitor reduction percentages by events or bytes, which is useful for improving search performance or licensing and infrastructure costs for the systems of analysis.

## セットアップ
You can send your Cribl Stream [internal metrics][2] to the Datadog API. 

### インストール

#### Datadog
Navigate to [_API Keys_][3] under Organization Settings and create an API Key for Cribl to send data.

#### Cribl
1. In Cribl, navigate to _Quick Connects_ and click the _+Add Source_ button. 
![step1][4]
2. Scroll down to _System Internal_ , hover over _Cribl Internal_ and choose _Select Existing_. Enable both _CriblLogs_ and _CriblMetrics_.  
 - **Note**: Both sources must have **Quick Connect** enabled instead of **Routes**.
![step3][5]

3. Click the _+Add Destination_ button.
4. Scroll to the _Datadog_ tile and click _+Add New_.
5. Give a name to the input (for example, Cribl_Datadog).
![step4][6]

6. Next, enter your _Datadog API Key_ and select your Datadog site.
7. Add any Datadog tags, a Message Field, Source, or Host information. For more information, see the [Cribl Datadog Destination documentation][7].
8. Click _Save_.
10. Select _Passthru_ to connect Cribl Metrics to your Datadog destination.
![step5][8]

![complete][9]

## Uninstallation
Use the [delete dashboard][10] option within the Cribl Stream dashboard settings to delete the Cribl Stream dashboard. Remove the Datadog destination from the Cribl Stream deployment to stop sending data.

## 収集データ
### メトリクス
{{< get-metrics-from-git "cribl_stream" >}}

### イベント
The Cribl Stream integration does not include any events.
### サービスチェック
The Cribl Stream integration does not include any service checks.

## トラブルシューティング
Need help? Contact [Cribl Support][12].

[1]: https://cribl.io/stream
[2]: http://docs.cribl.io/logstream/sources-cribl-internal/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/cribl_stream/images/images/cribl_dd_1.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/cribl_stream/images/images/cribl_dd_3.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/cribl_stream/images/images/cribl_dd_4.png
[7]: https://docs.cribl.io/stream/destinations-datadog
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/cribl_stream/images/images/cribl_dd_6.png
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/cribl_stream/images/images/cribl_dd_5.png
[10]: https://docs.datadoghq.com/dashboards/#delete-dashboard
[11]: https://github.com/DataDog/integrations-extras/blob/master/cribl_stream/metadata.csv
[12]: https://cribl.io/support

