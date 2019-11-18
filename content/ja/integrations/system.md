---
integration_title: System チェック
name: system
newhlevel: true
kind: インテグレーション
git_integration_title: system
updated_for_agent: 5.8.5
description: システムリソース (CPU、メモリ、ディスク、ファイルシステム) の使用状況を追跡
is_public: true
public_title: Datadog-System インテグレーション
short_description: システムリソース (CPU、メモリ、ディスク、ファイルシステム) の使用状況を追跡
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
---
## 概要

ベースシステムから CPU、IO、負荷、メモリ、スワップ、アップタイムなどに関するメトリクスを取得します。ほかにも、以下のシステム関連のチェックがあります。

* [Directory チェック][1] - 指定したディレクトリのファイルからメトリクスをキャプチャします。
* [Disk チェック][2] - ディスクに関するメトリクスをキャプチャします。
* [Process チェック][3] - システムで実行されている特定のプロセスからメトリクスをキャプチャします。

## セットアップ

System チェックは [Datadog Agent][4] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

## 収集されたデータ
### メトリック

{{< get-metrics-from-git "system" "system.cpu system.fs system.io system.load system.mem system.proc. system.swap system.uptime" >}}

### タグ
すべてのシステムメトリクスは、自動的に `host:<HOST_NAME>` でタグ付けされます。また、以下のネームスペースは `device:<DEVICE_NAME>` でタグ付けされます。

* `system.disk.*`
* `system.fs.inodes.*`
* `system.io.*`
* `system.net.*`

## Agent チェック: システムコア

このチェックは、ホスト上の CPU コアの数と CPU 時間 (システム、ユーザー、アイドル時間など) を収集します。

### セットアップ
#### インストール

system_core チェックは [Datadog Agent][4] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

#### コンフィグレーション

1. Agent のディレクトリのルートにある `conf.d/` フォルダーの `system_core.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル system_core.d/conf.yaml][5] を参照してください。

    ```
    init_config:

    instances:
        - {}
    ```

    `instances` に項目を 1 つ指定するだけで、チェックが有効になります。項目の内容は関係ありません。

2. [Agent を再起動][6]すると、チェックが有効になります。

### 検証

[Agent の `status` サブコマンドを実行][4]し、Checks セクションで `system_core` を探します。

### 収集データ
#### メトリクス

{{< get-metrics-from-git "system_core" >}}

プラットフォームによっては、このチェックは他の CPU 時間メトリクスも収集します。たとえば、Windows では `system.core.interrupt` が、Linux では `system.core.iowait` が収集されます。

## Agent チェック: Swap

このチェックは、ホストがスワップイン/スワップアウトしたバイト数を監視します。

### インストール

システムの Swap チェックは [Datadog Agent][4] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィグレーション

1. Agent のディレクトリのルートにある `conf.d/` フォルダーの `system_swap.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル system_swap.d/conf.yaml][7] を参照してください。

    ```
    # This check takes no initial configuration
    init_config:

    instances: [{}]
    ```

2. [Agent を再起動][6]すると、スワップメトリクスの収集が開始されます。

### 検証

[Agent の `status` サブコマンドを実行][4]し、Checks セクションで `system_swap` を探します。

### 収集データ
#### メトリクス

{{< get-metrics-from-git "system_swap" >}}

[1]: /ja/integrations/directory
[2]: /ja/integrations/disk
[3]: /ja/integrations/process
[4]: /ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/system_core/datadog_checks/system_core/data/conf.yaml.example
[6]: /ja/agent/guide/agent-commands/#start-stop-restart-the-agent
[7]: https://github.com/DataDog/integrations-core/blob/master/system_swap/datadog_checks/system_swap/data/conf.yaml.example