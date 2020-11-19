---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/riak_repl/README.md'
display_name: Riak MDC Replication
draft: false
git_integration_title: riak_repl
guid: 8a6c8c1e-8c41-4037-9a7b-1eb45f327e3d
integration_id: riak-repl
integration_title: Riak MDC Replication
is_public: true
kind: インテグレーション
maintainer: britt.treece@gmail.com
manifest_version: 1.0.0
metric_prefix: riak_repl.
metric_to_check: ''
name: riak_repl
public_title: Datadog-Riak MDC Replication インテグレーション
short_description: レプリケーションのパフォーマンス、容量、健全性を追跡
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは Riak レプリケーション [riak-repl][1] を監視します。

## セットアップ

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに Riak-Repl チェックをインストールしてください。[バージョン 6.8 以前の Agent][3] または [Docker Agent][4] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][2]に関する Agent のガイドを参照してください。

1. [開発ツールキット][5]をインストールします。
2. integrations-extras リポジトリを複製します。

   ```shell
   git clone https://github.com/DataDog/integrations-extras.git.
   ```

3. `ddev` 構成を `integrations-extras/` パスで更新します。

   ```shell
   ddev config set extras ./integrations-extras
   ```

4. `riak_repl` パッケージをビルドします。

   ```shell
   ddev -e release build riak_repl
   ```

5. [Datadog Agent をダウンロードして起動][6]します。
6. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
   datadog-agent integration install -w <PATH_OF_RIAK_REPL_ARTIFACT_>/<RIAK_REPL_ARTIFACT_NAME>.whl
   ```

7. [他のパッケージ化されたインテグレーション][7]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. riak_repl のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `riak_repl.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル riak_repl.d/conf.yaml][8] を参照してください。

2. [Agent を再起動します][9]

### 検証

[Agent の `status` サブコマンドを実行][10]し、Checks セクションで `riak_repl` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "riak_repl" >}}


### サービスのチェック

現在、riak_repl には、サービスのチェック機能は含まれません。

### イベント

現在、riak_repl には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/riak_repl/
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[6]: https://app.datadoghq.com/account/settings#agent
[7]: https://docs.datadoghq.com/ja/getting_started/integrations/
[8]: https://github.com/DataDog/integrations-extras/blob/master/riak_repl/datadog_checks/riak_repl/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ja/agent/faq/agent-commands/#start-stop-restart-the-agent
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[11]: https://github.com/DataDog/integrations-extras/blob/master/riak_repl/metadata.csv
[12]: https://docs.datadoghq.com/ja/help/