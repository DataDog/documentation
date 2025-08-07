---
app_id: planetscale
categories:
- data stores
custom_kind: integration
description: PlanetScale のメトリクスを DataDog に送信します。
media: []
title: PlanetScale
---
## 概要

PlanetScale は、Datadog にメトリクスをプッシュして、データベースの使用量とパフォーマンスの把握を支援することができます。

## セットアップ

以下の手順に従って、Datadog にメトリクスをプッシュするために PlanetScale の組織を構成してください。

1. Create a Datadog API key in your [Datadog Organization Settings](https://app.datadoghq.com/organization-settings/api-keys).
1. Supply PlanetScale with the Datadog API key in your [PlanetScale Organization Settings](https://app.planetscale.com/settings/integrations).

![PlanetScale Organization Settings](https://raw.githubusercontent.com/DataDog/integrations-extras/master/planetscale/images/planetscale.png)

## 収集されるデータ

### メトリクス

| | |
| --- | --- |
| **planetscale.connections** <br>(gauge) | Number of active connections to a database branch<br>_Shown as connection_ |
| **planetscale.rows_read** <br>(count) | Number of rows read from a database branch<br>_Shown as row_ |
| **planetscale.rows_written** <br>(count) | Number of rows written to a database branch<br>_Shown as row_ |
| **planetscale.tables.cumulative_query_time** <br>(count) | Cumulative active query time in a database branch by table and statement<br>_Shown as nanosecond_ |
| **planetscale.tables.queries** <br>(count) | Number of queries issued to a database branch by table and statement<br>_Shown as query_ |
| **planetscale.tables.rows_deleted** <br>(count) | Number of rows deleted from a database branch by table<br>_Shown as row_ |
| **planetscale.tables.rows_inserted** <br>(count) | Number of rows inserted into a database branch by table<br>_Shown as row_ |
| **planetscale.tables.rows_selected** <br>(count) | Number of rows selected in a database branch by table<br>_Shown as row_ |
| **planetscale.tables.rows_updated** <br>(count) | Number of rows updated in a database branch by table<br>_Shown as row_ |
| **planetscale.tables.storage** <br>(gauge) | Total bytes stored in a database branch by table<br>_Shown as byte_ |

### サービス チェック

Planetscale には、サービスのチェック機能は含まれません。

### イベント

Planetscale には、イベントは含まれません。

## サポート

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。