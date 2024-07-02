---
"app_id": "amazon-medialive"
"app_uuid": "f1068638-b7c6-448a-bc57-0267f94d4edd"
"assets":
  "integration":
    "auto_install": true
    "events":
      "creates_events": false
    "metrics":
      "check":
      - aws.medialive.active_alerts
      "metadata_path": metadata.csv
      "prefix": aws.medialive.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "354"
    "source_type_name": Amazon MediaLive
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- aws
- metrics
- cloud
"custom_kind": "インテグレーション"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "amazon_medialive"
"integration_id": "amazon-medialive"
"integration_title": "Amazon MediaLive"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "amazon_medialive"
"public_title": "Amazon MediaLive"
"short_description": "AWS Elemental MediaLive is a broadcast-grade live video processing service."
"supported_os": []
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::AWS"
  - "Category::Metrics"
  - "Category::Cloud"
  "configuration": "README.md#Setup"
  "description": AWS Elemental MediaLive is a broadcast-grade live video processing service.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Amazon MediaLive
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Overview

AWS Elemental MediaLive is a broadcast-grade live video processing service.

Enable this integration to see all your MediaLive metrics in Datadog.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration][1] first.

### Metric collection

1. In the [AWS integration tile][2], ensure that `MediaLive` is checked
   under metric collection.
2. Install the [Datadog - MediaLive integration][3].

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_medialive" >}}


### イベント

The MediaLive integration does not include any events.

### サービスチェック

The MediaLive integration does not include any service checks.

## トラブルシューティング

Need help? Contact [Datadog support][5].

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-medialive
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_medialive/amazon_medialive_metadata.csv
[5]: https://docs.datadoghq.com/help/

