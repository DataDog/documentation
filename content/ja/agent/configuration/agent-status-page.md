---
algolia:
  tags:
  - status page
aliases:
- /ja/agent/guide/agent-status-page
further_reading:
- link: /agent/troubleshooting/
  tag: Documentation
  text: Agent Troubleshooting
- link: /agent/configuration/agent-configuration-files/
  tag: Guide
  text: Agent Configuration Files
- link: /agent/configuration/agent-commands/
  tag: Guide
  text: Agent Commands
title: Agent v6 Status Page
---

Agent v6 ステータスページでは、実行中の Agent に関する情報が表示されます。[Agent のコマンド][1] で、使用中の環境のステータスコマンドを探すことができます。次のセクションでは、ステータスページの詳細を説明します。

**注**: ステータスページは Agent のバージョンにより若干異なる場合があります。

## Agent バージョン

Agent の一般情報は Agent バージョンで見つけることができます。例：
```text
  Status date: 2019-08-29 18:16:41.526203 UTC
  Agent start: 2019-08-29 18:04:18.060507 UTC
  Pid: 12141
  Go Version: go1.11.5
  Python Version: 2.7.16
  Check Runners: 4
  Log Level: info
```

### パス

このセクションには、Datadog コンフィグファイル、`conf.d` ディレクトリと `checks.d` ディレクトリへのパスが表示されます。例：
```text
    Config File: /etc/datadog-agent/datadog.yaml
    conf.d: /etc/datadog-agent/conf.d
    checks.d: /etc/datadog-agent/checks.d
```

### クロック

このセクションには、[NTP オフセット][2] とシステム UTC 時間が表示されます。例：
```text
    NTP offset: 2.095ms
    System UTC time: 2019-08-29 18:16:41.526203 UTC
```

### ホスト情報

このセクションには、Agent が実行中のホストに関する情報が表示されます。例：
```text
    bootTime: 2019-08-29 18:01:27.000000 UTC
    kernelVersion: 4.4.0-109-generic
    os: linux
    platform: ubuntu
    platformFamily: debian
    platformVersion: 16.04
    procs: 175
    uptime: 2m53s
    virtualizationRole: guest
    virtualizationSystem: vbox
```

### ホスト名

このセクションには、Agent が検出するホスト名が表示されます（以下参照）。`hostname` はバックエンドに報告される最終的なホスト名です。詳細は、[Datadog が Agent ホスト名を決定する方法][3]を参照してください。

```text
    hostname: ubuntu-xenial
    socket-fqdn: ubuntu-xenial
    socket-hostname: ubuntu-xenial
    hostname provider: os
    unused hostname providers:
      aws: not retrieving hostname from AWS: the host is not an ECS instance, and other providers already retrieve non-default hostnames
      configuration/environment: hostname is empty
      gce: unable to retrieve hostname from GCE: Get http://169.254.169.254/computeMetadata/v1/instance/hostname: net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)
```

## コレクター

### チェックの実行

このセクションには、実行中のチェックインスタンスが一覧表示されます。例：

```text
    load
    ----
      Instance ID: load [OK]
      Total Runs: 4
      Metric Samples: Last Run: 6, Total: 24
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 0, Total: 0
      Histogram Buckets: Last Run: 12, Total: 36
      Average Execution Time : 6ms
```

用語と説明

| 用語                   | 説明                                                      |
|------------------------|------------------------------------------------------------------|
| Instance ID            | インスタンス ID とチェックのステータス。                     |
| Total Runs             | インスタンスが実行された合計回数。                  |
| Metric Samples         | 取得されたメトリクスの数。                                   |
| イベント                 | トリガーされたイベントの数。                                  |
| サービスチェック         | 報告されたサービスチェックの数。                           |
| Histogram Buckets      | 送信されたヒストグラムバケットの数。                            |
| Average Execution Time | インスタンスの実行にかかる平均時間。                      |
| Last Run               | 最後のチェック実行中の番号。                            |
| 合計                  | Agent が最後に起動または再起動してからの合計数。 |

### 構成エラー

このセクションには、構成エラーのあるチェックのみが表示されます。例：

```text
    test
    ----
      Configuration file contains no valid instances
```

### 読み込みエラー

このセクションには、読み込みエラーのあるチェックのみが表示されます。例：

```text
    test
    ----
      Core Check Loader:
        Check test not found in Catalog

      JMX Check Loader:
        check is not a jmx check, or unable to determine if it's so

      Python Check Loader:
        unable to import module 'test': No module named test
```

## JMXFetch

このセクションには、チェックがない場合でも、初期化および失敗した JMX チェックが一覧表示されます。例：

```text
  Initialized checks
  ==================
    no checks

  Failed checks
  =============
    no checks
```

## Forwarder

Forwarder はいくつかのワーカーを使用して Datadog にペイロードを送信します。

`the forwarder dropped transactions, there is probably an issue with your network` という警告文は、全てのワーカーがビジー状態であることを意味します。ネットワークのパフォーマンスを確認し、 `forwarder_num_workers` と `forwarder_timeout` オプションを調整する必要があります。

### トランザクション

このセクションには、Forwarder が実行したトランザクションが表示されます。例：

```text
    CheckRunsV1: 2
    Dropped: 0
    DroppedOnInput: 0
    Events: 0
    HostMetadata: 0
    IntakeV1: 2
    Metadata: 0
    Requeued: 0
    Retried: 0
    RetryQueueSize: 0
    Series: 0
    ServiceChecks: 0
    SketchSeries: 0
    Success: 6
    TimeseriesV1: 2
    Errors: 1
```

用語と説明

| 用語           | 説明                                                                  |
|----------------|------------------------------------------------------------------------------|
| Success        | 正常に送信されたトランザクションの数。                                |
| エラー         | トランザクションの送信に失敗し再試行した回数。         |
| RetryQueueSize | 現在再試行を待つトランザクションの数。                    |
| Retried        | トランザクションを再試行した回数。                               |
| DroppedOnInput | ワーカーがビジー状態であるためにドロップされたトランザクションの数。  |
| Dropped        | 再試行が多すぎるためにドロップされたトランザクションの数。 |

### API キーステータス

このセクションには、構成された API キーのステータスが表示されます。例：

```text
    API key ending with ab123: API Key valid
```

## エンドポイント

このセクションには、Datadog Agent が使用するエンドポイントが一覧表示されます。例：

```text
  https://app.datadoghq.com - API Key ending with:
      - ab123
```

## ログ Agent

ログ Agent が有効な場合、このセクションには処理および送信されたログの情報が表示されます。例、

```text
    LogsProcessed: 10
    LogsSent: 10
```

## Aggregator

このセクションには、Agent の Aggregator に関する情報が表示されます。例：

```text
  Checks Metric Sample: 399
  Dogstatsd Metric Sample: 123
  Event: 1
  Events Flushed: 1
  Number Of Flushes: 2
  Series Flushed: 273
  Service Check: 20
  Service Checks Flushed: 20
  Sketches Flushed: 8
  Checks Histogram Bucket Metric Sample: 24
```

用語と説明

| 用語                                         | 説明                                                                                           |
|----------------------------------------------|-------------------------------------------------------------------------------------------------------|
| Checks Metric Sample                         | チェックから Aggregator へ送信されたメトリクスの総数。                                   |
| Dogstatsd Metric Sample                      | DogStatsD サーバーから Aggregator へ送信されたメトリクスの総数。                         |
| イベント                                        | Aggregator へ送信されたイベントの総数。                                                    |
| サービスチェック                                | Aggregator へ送信されたサービスチェックの総数。                                            |
| Flush                                        | 集計されたメトリクスが Datadog へ送信するために Forwarder へフラッシュされた回数。              |
| Sketches Flushed                             | 集計されたディストリビューションメトリクスが Datadog へ送信するために Forwarder へフラッシュされた回数。 |
| Checks Histogram Bucket Metric Sample        | チェックから Aggregator に送信されたヒストグラムバケットメトリクスの数。                        |

## DogStatsD

このセクションには、DogStatsD サーバーが各データタイプや関連するエラーのために受信するパケットの数が表示されます。例：

```text
  Event Packets: 0
  Event Parse Errors: 0
  Metric Packets: 122
  Metric Parse Errors: 0
  Service Check Packets: 0
  Service Check Parse Errors: 0
  Udp Bytes: 7,672
  Udp Packet Reading Errors: 0
  Udp Packets: 123
  Uds Bytes: 0
  Uds Origin Detection Errors: 0
  Uds Packet Reading Errors: 0
  Uds Packets: 0
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/configuration/agent-commands/#agent-information
[2]: /ja/agent/troubleshooting/ntp/
[3]: /ja/agent/faq/how-datadog-agent-determines-the-hostname/