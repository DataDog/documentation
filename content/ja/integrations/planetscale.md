---
app_id: planetscale
app_uuid: ea670b69-7322-4c75-afbc-4ef1a6cf286c
assets:
  dashboards:
    planetscale_overview: assets/dashboards/planetscale_overview.json
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: planetscale.tables.storage
      metadata_path: metadata.csv
      prefix: planetscale.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: PlanetScale
author:
  homepage: http://www.planetscale.com
  name: James Cunningham
  sales_email: sales@planetscale.com
  support_email: support@planetscale.com
categories:
- data store
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/planetscale/README.md
display_on_public_website: true
draft: false
git_integration_title: planetscale
integration_id: planetscale
integration_title: PlanetScale
integration_version: ''
is_public: true
kind: integration
manifest_version: 2.0.0
name: planetscale
oauth: {}
public_title: PlanetScale
short_description: PlanetScale のメトリクスを DataDog に送信します。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Store
  configuration: README.md#Setup
  description: PlanetScale のメトリクスを DataDog に送信します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: PlanetScale
---



## 概要

PlanetScale は、Datadog にメトリクスをプッシュして、データベースの使用量とパフォーマンスの把握を支援することができます。

## セットアップ

以下の手順に従って、Datadog にメトリクスをプッシュするために PlanetScale の組織を構成してください。

1. [Datadog 組織設定][1]で、Datadog API キーを作成します。
2. [PlanetScale 組織設定][2]で Datadog の API キーを PlanetScale に渡します。

![PlanetScale 組織設定][3]

## 収集データ

### メトリクス
{{< get-metrics-from-git "planetscale" >}}


### サービスのチェック

Planetscale には、サービスのチェック機能は含まれません。

### イベント

Planetscale には、イベントは含まれません。

## サポート

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.planetscale.com/settings/integrations
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/planetscale/images/planetscale.png
[4]: https://github.com/DataDog/integrations-extras/blob/master/planetscale/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/