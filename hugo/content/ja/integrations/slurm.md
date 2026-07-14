---
app_id: slurm
app_uuid: a1e88183-da10-4651-bac8-843bdb640af7
assets:
  dashboards:
    Slurm Overview: assets/dashboards/slurm_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - slurm.partition.info
      - slurm.sacct.job.info
      - slurm.sdiag.server_thread_count
      metadata_path: metadata.csv
      prefix: slurm.
    process_signatures:
    - slurmctld
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 25922615
    source_type_name: Slurm
  monitors:
    Slurm DBD Agent Queue Size: assets/monitors/slurm_dbd_agent.json
    Slurm Partition Down State: assets/monitors/slurm_partition.json
  saved_views:
    Slurm Logs Overview: assets/saved_views/slurm_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- 自動化
- モニター
- ログの収集
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/slurm/README.md
display_on_public_website: true
draft: false
git_integration_title: slurm
integration_id: slurm
integration_title: Slurm
integration_version: 2.0.1
is_public: true
manifest_version: 2.0.0
name: slurm
public_title: Slurm
short_description: Slurm クラスター リソースの使用状況、ジョブ ステータス、システム パフォーマンスを監視します。
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::Automation
  - Category::Metrics
  - Category::Log Collection
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Slurm クラスターリソースの使用状況、ジョブステータス、システムパフォーマンスを監視します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Slurm
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を通じて [Slurm][1] を監視します。

Slurm (Simple Linux Utility for Resource Management) は、オープン ソースのワークロード マネージャーで、大規模な計算クラスター上のジョブのスケジュールと管理に使用されます。リソースを割り当て、ジョブ キューを監視し、ハイ パフォーマンス コンピューティング環境における並列ジョブおよびバッチ ジョブの効率的な実行を保証します。

このチェックは、いくつかのコマンド ライン バイナリ ([`sinfo`][2]、[`squeue`][3]、[`sacct`][4]、[`sdiag`][5]、[`sshare`][6]) を実行し、その出力を解析することによって、管理ノード (`slurmctld`) からメトリクスを収集します。これらのコマンドは、Slurm の管理対象クラスターにおけるリソースの可用性、ジョブ キュー、アカウンティング、診断、およびシェアの使用状況に関する詳細情報を提供します。

ワーカー ノードでは、[`scontrol`][7] を使用してメトリクスを収集することもできます。これは、プロセス ID (PID) と、管理ノードからは取得できないその他のジョブ情報を提供します。

## セットアップ

ホスト上で実行されている Agent にこのチェックをインストールして構成するには、以下の手順に従ってください。Agent はさまざまな Slurm バイナリに直接アクセスする必要があるため、コンテナ化された環境での Slurm の監視は推奨されません。

**注**: このチェックは Slurm バージョン 21.08.0 でテストされています。

### インストール

Slurm チェックは [Datadog Agent][8] パッケージに含まれています。
サーバー上での追加インストールは不要です。

### 構成

#### 管理ノード

1. dd-agent ユーザーが、関連するコマンドバイナリの実行権限と、バイナリの置かれたディレクトリにアクセスするのに必要な権限を持っていることを確認してください。

2. Slurm データの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `slurm.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル slurm.d/conf.yaml][9] を参照してください。

```yaml
init_config:

    ## バイナリが /usr/bin/ ディレクトリにない場合は、この部分をカスタマイズします
    ## @param slurm_binaries_dir - 文字列 - オプション - デフォルト: /usr/bin/
    ## すべての Slurm バイナリが置かれているディレクトリ。主なバイナリ:
    ## sinfo、sacct、sdiag、sshare、sdiag.

    slurm_binaries_dir: /usr/bin/

instances:

  -
    ## インテグレーションで収集されるデータを選択するには、以下のパラメータを構成します。
    ## @param collect_sinfo_stats - ブール値 - オプション - デフォルト: true
    ## sinfo コマンドから統計情報を収集するかどうか。
    #
    collect_sinfo_stats: true

    ## @param collect_sdiag_stats - ブール値 - オプション - デフォルト: true
    ## sdiag コマンドから統計情報を収集するかどうか。
    #
    collect_sdiag_stats: true

    ## @param collect_squeue_stats - ブール値 - オプション - デフォルト: true
    ## squeue コマンドから統計情報を収集するかどうか。
    #
    collect_squeue_stats: true

    ## @param collect_sacct_stats - ブール値 - オプション - デフォルト: true
    ## sacct コマンドから統計情報を収集するかどうか。
    #
    collect_sacct_stats: true

    ## @param collect_sshare_stats - ブール値 - オプション - デフォルト: true
    ## sshare コマンドから統計情報を収集するかどうか。
    #
    collect_sshare_stats: true

    ## @param collect_gpu_stats - ブール値 - オプション - デフォルト: false
    ## Slurm が GPU を使用するように構成されている場合に、sinfo を使用して GPU 統計情報を収集するかどうか。
    #
    collect_gpu_stats: true

    ## @param sinfo_collection_level - 整数 - オプション - デフォルト: 1
    ## sinfo コマンドから収集する情報の詳細度。デフォルトは 'basic'。利用可能なオプションは 1、2、3。
    ## レベル 1 はパーティションについてのみデータを収集。レベル 2 は個々のノードからデータを収集。レベル 3 も 
    ## 個々のノードからデータを収集しますが、より詳細で、OS から報告される CPU や 
    ## メモリの使用量などのデータのほか、追加のタグも含まれます。
    #
    sinfo_collection_level: 3

    ## @param collect_scontrol_stats - ブール値 - オプション - デフォルト: false
    ## scontrol コマンドから統計情報を収集するかどうか。これは主に、実行中のジョブの一覧を 
    ## PID とともに収集するためにワーカー ノードで使用されます。
    collect_scontrol_stats: false # これはワーカー ノードにのみ設定し、管理ノードには設定しません
```

3. [Agent を再起動します][10]。

#### ワーカー ノード

`slurm.scontrol.job.info` メトリクスはワーカー ノードからのみ収集できます。このメトリクスにより、特定のジョブ ステップのリソース消費を監視するために使用できる重要なタグを送信できます。

1. dd-agent ユーザーが、関連する `scontrol` バイナリの実行権限と、バイナリの置かれたディレクトリにアクセスするのに必要な権限を持っていることを確認してください。

2. Slurm データの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `slurm.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル slurm.d/conf.yaml][9] を参照してください。

```yaml
init_config:

    ## バイナリが /usr/bin/ ディレクトリにない場合は、この部分をカスタマイズします
    ## @param slurm_binaries_dir - 文字列 - オプション - デフォルト: /usr/bin/
    ## すべての Slurm バイナリが置かれているディレクトリ。主なバイナリ:
    ## sinfo、sacct、sdiag、sshare

    slurm_binaries_dir: /usr/bin/

instances:

  - 
    ## @param collect_scontrol_stats - ブール値 - オプション - デフォルト: false
    ## scontrol コマンドから統計情報を収集するかどうか。これは主に、実行中のジョブの一覧を 
    ## PID とともに収集するためにワーカー ノードで使用されます。
    collect_scontrol_stats: true

    # 以下の残りの設定は、対象となる情報が管理ノード固有のもので、ワーカー ノードでは取得できないため、
    # ワーカー ノードでは無効にしておく必要があります。
    collect_sinfo_stats: false
    collect_sdiag_stats: false
    collect_squeue_stats: false
    collect_sacct_stats: false
    collect_sshare_stats: false
    collect_gpu_stats: false
    sinfo_collection_level: 1
```

3. [Agent を再起動します][10]。

### 検証

[Agent の status サブ コマンドを実行][11]して、Checks セクションで `slurm` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "slurm" >}}


### イベント

Slurm インテグレーションには、イベントは含まれていません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][13]までお問合せください。


[1]: https://slurm.schedmd.com/overview.html
[2]: https://slurm.schedmd.com/sinfo.html
[3]: https://slurm.schedmd.com/squeue.html
[4]: https://slurm.schedmd.com/sacct.html
[5]: https://slurm.schedmd.com/sdiag.html
[6]: https://slurm.schedmd.com/sshare.html
[7]: https://slurm.schedmd.com/scontrol.html
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: https://github.com/DataDog/integrations-core/blob/master/slurm/datadog_checks/slurm/data/conf.yaml.example
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/slurm/metadata.csv
[13]: https://docs.datadoghq.com/ja/help/