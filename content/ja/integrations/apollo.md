---
app_id: apollo
app_uuid: b39f1239-b97f-4b3b-ab5a-7a888915eedd
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - apollo.operations.count
      - apollo.engine.operations.count
      metadata_path: metadata.csv
      prefix: apollo.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10014
    source_type_name: Apollo Engine
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Apollo
  sales_email: sachin@apollographql.com
  support_email: sachin@apollographql.com
categories:
- caching
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/apollo/README.md
display_on_public_website: true
draft: false
git_integration_title: apollo
integration_id: apollo
integration_title: Apollo
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: apollo
public_title: Apollo
short_description: Monitor the performance of your GraphQL infrastructure
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Monitor the performance of your GraphQL infrastructure
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Apollo
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Overview

The Apollo Datadog integration enables you to forward Studio performance metrics to your Datadog account. Datadog supports an advanced function API, which enables you to create graphs and alerts for GraphQL metrics.

![Metrics][1]

Studio forwards the following metrics to Datadog:

- `apollo.operations.count` - The number of GraphQL operations that were executed. This includes queries, mutations, and operations that resulted in an error.
- `apollo.operations.error_count` - The number of GraphQL operations that resulted in an error. This includes GraphQL execution errors, and HTTP errors if Studio failed to connect to your server.
- `apollo.operations.cache_hit_count` - The number of GraphQL queries for which the result was served from Apollo Server's full query cache.
- A histogram of GraphQL operation response times, measured in milliseconds. Due to Studio's aggregation method (logarithmic binning), these values are accurate to +/- 5%:

  - `apollo.operations.latency.min`
  - `apollo.operations.latency.median`
  - `apollo.operations.latency.95percentile`
  - `apollo.operations.latency.99percentile`
  - `apollo.operations.latency.max`
  - `apollo.operations.latency.avg`

These metrics are aggregated in 60-second intervals and tagged with the GraphQL operation name as `operation:<query-name>`. Unique query signatures with the same operation name are merged, and queries without an operation name are ignored.

These metrics are also tagged with both the associated Studio graph ID (as `graph:<graph-id>`) and the associated variant name (as `variant:<variant-name>`), so multiple graphs from Studio can send data to the same Datadog account. If you haven't set a variant name, then `current` is used.

(Integrations set up prior to October 2020 have metric names starting with `apollo.engine.operations` instead of `apollo.operations` and use a `service` tag instead of `graph`. You can migrate to the new metric names in your graph's Integrations page in Apollo Studio.)

## セットアップ

### 構成

Getting set up with the Apollo Datadog integration is as simple as providing a Datadog API key and region to Studio. There's no further configuration required.

1. Go to your [Datadog Integrations page][2] and click on the Apollo tile. Then go to the **Configuration** tab and click **Install Integration** at the bottom.

2. Go to your [Datadog APIs page][3] and create an API key.

3. Determine your Datadog API region by looking at your browser's address bar:
- If the domain name is `app.datadoghq.com`, then your API region is `US`.
- If the domain name is `app.datadoghq.eu`, then your API region is `EU`.

4. In [Studio][4], go to your graph's Integrations page:

   ![IntegrationsPage][5]

5. In the Datadog Forwarding section, click **Configure**. Provide your API key and region, then click **Enable**. Because all forwarded metrics are tagged with the corresponding graph's ID (`graph:<graph-id>`), you can use the same API key for all of your graphs.

   ![IntegrationsToggle][6]

6. Go to the Datadog metrics explorer to see your metrics. Metrics may take up to five minutes to be visible.

### 使用方法

See the [Apollo integrations docs][7] for more detailed usage information.

## 収集データ

### メトリクス
{{< get-metrics-from-git "apollo" >}}


### イベント

The Apollo integration does not include any events at this time.

### サービスチェック

The Apollo integration does not include any service checks at this time.

## トラブルシューティング

Need help? Contact [Datadog Support][9].


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo/images/metrics.png
[2]: https://app.datadoghq.com/account/settings#integrations
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://www.apollographql.com/docs/studio/org/graphs/#viewing-graph-information
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo/images/settings-link.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo/images/settings-toggle.png
[7]: https://www.apollographql.com/docs/studio/datadog-integration/
[8]: https://github.com/DataDog/integrations-extras/blob/master/apollo/metadata.csv
[9]: https://docs.datadoghq.com/ja/help/