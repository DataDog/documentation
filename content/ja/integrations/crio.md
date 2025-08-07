---
aliases:
- /ja/integrations/crio
app_id: cri-o
categories:
- incident-teams
custom_kind: integration
description: CRI-O のすべてのメトリクスを Datadog で追跡
integration_version: 5.0.0
media: []
supported_os:
- linux
- macos
- windows
title: CRI-O
---
## 概要

This check monitors [CRI-O](http://cri-o.io).

## セットアップ

### インストール

このインテグレーションは、CRI-O の `--enable-metrics` オプションに依存します。このオプションはデフォルトでは無効です。有効にした場合は、`127.0.0.1:9090/metrics` でメトリクスが公開されます。

### 設定

1. Edit the `crio.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your CRI-O performance data. See the [sample crio.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/crio/datadog_checks/crio/data/conf.yaml.example) for all available configuration options.

1. [Restart the Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#restart-the-agent).

### 検証

[Run the Agent's status subcommand](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-information) and look for `crio` under the Checks section.

## 収集データ

CRI-O は、ランタイムによって実行される操作のカウントとレイテンシーに関するメトリクスを収集します。
さらに、Datadog-CRI-O インテグレーションは、CRI-O Golang バイナリ自体の CPU 使用率とメモリ使用量を収集します。

### メトリクス

| | |
| --- | --- |
| **crio.cpu.time** <br>(gauge) | Total user and system CPU time spent in seconds<br>_Shown as second_ |
| **crio.mem.resident** <br>(gauge) | Resident memory size in bytes<br>_Shown as byte_ |
| **crio.mem.virtual** <br>(gauge) | Virtual memory size in bytes<br>_Shown as byte_ |
| **crio.operations.count** <br>(count) | Counter of CRI-O operations |
| **crio.operations.latency.count** <br>(gauge) | Count of CRI-O operations latency|
| **crio.operations.latency.quantile** <br>(gauge) | Quantiles of CRI-O operations latency|
| **crio.operations.latency.sum** <br>(gauge) | Sum of CRI-O operations latency<br>_Shown as microsecond_ |

### サービス チェック

**crio.prometheus.health**

Returns `CRITICAL` if the check can't access the metrics endpoint.

_Statuses: ok, critical_

### イベント

CRI-O には、イベントは含まれません。

### サービス チェック

See [service_checks.json](https://github.com/DataDog/integrations-core/blob/master/crio/assets/service_checks.json) for a list of service checks provided by this integration.

## トラブルシューティング

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。