---
integration_title: System チェック
name: system
newhlevel: true
git_integration_title: system
updated_for_agent: 5.8.5
description: システムリソース (CPU、メモリ、ディスク、ファイルシステム) の使用状況を追跡。
is_public: true
public_title: Datadog-System インテグレーション
short_description: システムリソース (CPU、メモリ、ディスク、ファイルシステム) の使用状況を追跡。
categories:
  - os & system
  - configuration & deployment
ddtype: check
aliases:
  - /ja/integrations/system_swap/
  - /ja/integrations/system_core/
supported_os:
  - linux
  - mac_os
  - windows
dependencies:
  - https://github.com/DataDog/documentation/blob/master/content/en/integrations/system.md
integration_id: システム
---
## 概要

ベースシステムから CPU、IO、負荷、メモリ、スワップ、アップタイムなどに関するメトリクスを取得します。以下のチェックもシステムに関連しています。

- [Directory チェック][1] - 指定したディレクトリのファイルからメトリクスをキャプチャします。
- [Disk チェック][2] - ディスクに関するメトリクスをキャプチャします。
- [Process チェック][3] - システムで実行されている特定のプロセスからメトリクスをキャプチャします。

## セットアップ

### インストール

System チェックは [Datadog Agent][4] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

## 収集データ

### メトリクス

{{< get-metrics-from-git "system" "system.cpu system.fs system.io system.load system.mem system.proc. system.swap system.uptime" >}}

### イベント

System チェックには、イベントは含まれません。

### サービスチェック

System チェックには、サービスのチェック機能は含まれません。

### タグ

すべてのシステムメトリクスは、自動的に `host:<HOST_NAME>` でタグ付けされます。また、以下のネームスペースは `device:<DEVICE_NAME>` でタグ付けされます。

- `system.disk.*`
- `system.fs.inodes.*`
- `system.io.*`
- `system.net.*`

## System コア

このチェックは、ホスト上の CPU コアの数と CPU 時間 (システム、ユーザー、アイドル時間など) を収集します。

### セットアップ

#### インストール

システムコアチェックは [Datadog Agent][4] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

#### コンフィギュレーション

1. [Agent の構成ディレクトリ][5]のルートにある `conf.d/` フォルダーの `system_core.d/conf.yaml` ファイルを編集します。使用可能な全構成オプションの詳細については、[サンプル system_core.d/conf.yaml][6] を参照してください。**注**: チェックを有効にするには、`instances` に少なくとも 1 つのエントリが必要です。例:

    ```yaml
    init_config:
    instances:
        - foo: bar
        tags:
            - key:value
    ```

2. [Agent を再起動します][7]。

#### 検証

[Agent のステータスサブコマンドを実行][4]し、Checks セクションで `system_core` を探します。

### 収集データ

#### メトリクス

{{< get-metrics-from-git "system_core" >}}

プラットフォームによっては、このチェックは他の CPU 時間メトリクスも収集します。たとえば、Windows では `system.core.interrupt` が、Linux では `system.core.iowait` が収集されます。

#### イベント

System コアチェックには、イベントは含まれません。

#### サービスチェック

{{< get-service-checks-from-git "system_core" >}}

## System スワップ

このチェックは、ホストがスワップイン/スワップアウトしたバイト数を監視します。

### セットアップ

#### インストール

システムのスワップチェックは [Datadog Agent][4] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

#### コンフィギュレーション

1. [Agent の構成ディレクトリ][5]のルートにある `conf.d/` フォルダーの `system_swap.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル system_swap.d/conf.yaml][8] を参照してください。**注**: このチェックは初期コンフィギュレーションを受け取りません。

2. [Agent を再起動します][7]。

#### 検証

[Agent のステータスサブコマンドを実行][4]し、Checks セクションで `system_swap` を探します。

### 収集データ

#### メトリクス

{{< get-metrics-from-git "system_swap" >}}

#### イベント

System スワップチェックには、イベントは含まれません。

#### サービスチェック

System スワップチェックには、サービスのチェック機能は含まれません。

[1]: /ja/integrations/directory/
[2]: /ja/integrations/disk/
[3]: /ja/integrations/process/
[4]: /ja/agent/guide/agent-commands/#agent-status-and-information
[5]: /ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-core/blob/master/system_core/datadog_checks/system_core/data/conf.yaml.example
[7]: /ja/agent/guide/agent-commands/#start-stop-restart-the-agent
[8]: https://github.com/DataDog/integrations-core/blob/master/system_swap/datadog_checks/system_swap/data/conf.yaml.example