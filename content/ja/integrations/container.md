---
app_id: コンテナ
categories:
- incident-teams
- kubernetes
custom_kind: インテグレーション
description: コンテナのメトリクスを Datadog で追跡
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
title: コンテナ
---
## 概要

このチェックでは、開始に使用されるランタイムにかかわらず、実行中のコンテナに関するメトリクスが報告されます。

**注**: `container` チェックは `containerd` チェックとは異なります。`container` チェックでは、コンテナのランタイムにかかわらず、システムにあるすべてのコンテナの標準メトリクスが報告されます。
`containerd` は、`containerd` ランタイムについて実行され、`containerd.*` ネームスペースでメトリクスを公開します。

## セットアップ

### インストール

コンテナは、Datadog Agent チェックの核であり、対応するコンテナランタイムが検出されると自動的にアクティベートされます。
ご使用の環境により、対応するコンテナランタイム (Docker、containerd) へのアクセスの構成が必要になる場合があります。

#### コンテナへのインストール

`container` チェックには、自動アクティベーションのためフォルダーのマウントが必要です。これは公式 Helm Chart および Datadog Operator により管理され、セットアップは Kubernetes、Docker、ECS、ECS Fargate 用に文書化されています。

### 設定

`container` チェックにより公開されるコンフィギュレーション設定はありません。共通フィールドをカスタマイズまたは `container` チェックのアクティベーションを強制するには、以下の手順に従います。

1. Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーに `container.d/conf.yaml` ファイルを作成します。

1. [Restart the Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent)

`container` チェックで CPU、メモリ、ネットワーク、ディスク IO に関するメトリクスを収集できます。
ご使用の環境によって、一部のメトリクスは使用できない場合があります (Linux / Windows など)。

### 検証

[Run the Agent's `status` subcommand](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent) and look for `container` under the **Checks** section.

## 収集データ

### メトリクス

| | |
| --- | --- |
| **container.cpu.limit** <br>(gauge) | The maximum CPU time available to the container<br>_Shown as nanocore_ |
| **container.cpu.system** <br>(gauge) | The container system CPU usage<br>_Shown as nanocore_ |
| **container.cpu.throttled** <br>(gauge) | The total cpu throttled time<br>_Shown as nanosecond_ |
| **container.cpu.throttled.periods** <br>(gauge) | コンテナがスロットルされた期間の数|
| **container.cpu.usage** <br>(gauge) | The container total CPU Usage<br>_Shown as nanocore_ |
| **container.cpu.user** <br>(gauge) | The container userspace CPU usage<br>_Shown as nanocore_ |
| **container.io.read** <br>(gauge) | The number of bytes read from disks by this container<br>_Shown as byte_ |
| **container.io.read.operations** <br>(gauge) | このコンテナによって行われた読み取り操作の数|
| **container.io.write** <br>(gauge) | The number of bytes written to disks by this container<br>_Shown as byte_ |
| **container.io.write.operations** <br>(gauge) | このコンテナによって行われた書き込み操作の数|
| **container.memory.cache** <br>(gauge) | The container cache usage<br>_Shown as byte_ |
| **container.memory.commit** <br>(gauge) | The container commit memory usage<br>_Shown as byte_ |
| **container.memory.commit.peak** <br>(gauge) | The container peak commit memory usage<br>_Shown as byte_ |
| **container.memory.kernel** <br>(gauge) | The container kernel memory usage<br>_Shown as byte_ |
| **container.memory.limit** <br>(gauge) | The container memory limit<br>_Shown as byte_ |
| **container.memory.major_page_faults** <br>(count) | Number of major page faults incurred|
| **container.memory.oom_events** <br>(gauge) | The number of OOM events triggered by the container|
| **container.memory.page_faults** <br>(count) | Total number of page faults incurred|
| **container.memory.rss** <br>(gauge) | The container RSS usage<br>_Shown as byte_ |
| **container.memory.soft_limit** <br>(gauge) | The container memory soft limit<br>_Shown as byte_ |
| **container.memory.swap** <br>(gauge) | The container swap usage<br>_Shown as byte_ |
| **container.memory.usage** <br>(gauge) | The container total memory usage<br>_Shown as byte_ |
| **container.memory.usage.peak** <br>(gauge) | The maximum memory usage recorded since the container started<br>_Shown as byte_ |
| **container.memory.working_set** <br>(gauge) | The container working set usage<br>_Shown as byte_ |
| **container.net.rcvd** <br>(gauge) | The number of network bytes received (per interface)<br>_Shown as byte_ |
| **container.net.rcvd.packets** <br>(gauge) | 受信されたネットワークパケット数 (インターフェイスごと)|
| **container.net.sent** <br>(gauge) | The number of network bytes sent (per interface)<br>_Shown as byte_ |
| **container.net.sent.packets** <br>(gauge) | 送信されたネットワークパケット数 (インターフェイスごと)|
| **container.pid.open_files** <br>(gauge) | The number of open file descriptors (Linux only)|
| **container.pid.thread_count** <br>(gauge) | The number of threads running inside this container|
| **container.pid.thread_limit** <br>(gauge) | The maximum number of threads for this container|
| **container.restarts** <br>(gauge) | The number of container restarted|
| **container.uptime** <br>(gauge) | The container uptime<br>_Shown as second_ |

## トラブルシューティング

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。