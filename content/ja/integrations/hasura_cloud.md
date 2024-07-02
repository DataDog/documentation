---
"app_id": "hasura-cloud"
"app_uuid": "d7eb9597-f00b-48dc-9100-7afda5fe4bce"
"assets":
  "dashboards":
    "Hasura Cloud Datadog Integration Dashboard": assets/dashboards/hasura_cloud.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check":
      - hasura_cloud.requests_per_minute
      - hasura_cloud.average_execution_time
      - hasura_cloud.success_rate
      "metadata_path": metadata.csv
      "prefix": hasura_cloud.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10175"
    "source_type_name": Hasura Cloud
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Hasura
  "sales_email": support@hasura.io
  "support_email": support@hasura.io
"categories":
- cloud
- log collection
- tracing
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/hasura_cloud/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "hasura_cloud"
"integration_id": "hasura-cloud"
"integration_title": "Hasura Cloud"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "hasura_cloud"
"public_title": "Hasura Cloud"
"short_description": "Monitor your Hasura Cloud Project"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Cloud"
  - "Category::Log Collection"
  - "Category::Tracing"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Monitor your Hasura Cloud Project
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Hasura Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

[Hasura Cloud][1] provides a scalable, highly available, globally distributed,
secure, production-ready GraphQL API over your data sources.

The Datadog integration is an observability feature of Hasura Cloud that exports
your Hasura Cloud project's operation logs, metrics, and traces to your Datadog dashboard. 

## セットアップ

To set up the Hasura Cloud Datadog integration for your Hasura Cloud project, provide a Datadog API key and region to Hasura Cloud.

See the [Hasura Cloud documentation][2] for how to configure the Datadog integration for your Hasura Cloud project.

Once the above is done, go to the [Logs section][3] in Datadog and create facets for the following top level fields:

* `operation_name`
* `operation_type`
* `error_code`
* `is_error`

See the [Datadog Log Facets documentation][4] for information regarding creating facets from logs.

Logs, metrics, and traces from your Hasura Cloud project are automatically sent to Datadog when your project receives traffic.

## 収集データ

### メトリクス
{{< get-metrics-from-git "hasura_cloud" >}}


### サービスチェック

The Hasura Cloud integration does not include any service checks.

### イベント

The Hasura Cloud integration does not include any events.

## トラブルシューティング

Need help? Contact [Datadog support][5].

[1]: https://hasura.io/cloud/
[2]: https://hasura.io/docs/latest/observability/integrations/datadog/
[3]: http://app.datadoghq.com/logs
[4]: https://docs.datadoghq.com/logs/explorer/facets/#create-facets
[5]: https://docs.datadoghq.com/help/

