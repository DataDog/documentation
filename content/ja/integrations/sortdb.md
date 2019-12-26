---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - データストア
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/sortdb/README.md'
display_name: Sortdb
git_integration_title: sortdb
guid: 806dcbd7-3686-4472-9435-2049729847c1
integration_id: sortdb
integration_title: Sortdb
is_public: true
kind: インテグレーション
maintainer: namrata.deshpande4@gmail.com
manifest_version: 1.0.0
metric_prefix: sortdb.
name: sortdb
public_title: Datadog-Sortdb インテグレーション
short_description: sortdb の監視を Datadog がサポート
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

[Sortdb][1] サービスからメトリクスをリアルタイムに取得して、以下のことができます。

* Sortdb 統計を可視化および監視できます。
* Sortdb フェイルオーバーに関する通知を受けることができます。
* 複数インスタンスの健全性をチェックし、統計を取得します。

## インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに Sortdb チェックをインストールしてください。[バージョン 6.8 以前の Agent][3] または [Docker Agent][4] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][2]に関する Agent のガイドを参照してください。

1. [開発ツールキット][5]をインストールします。
2. integrations-extras リポジトリを複製します。

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. `ddev` 構成を `integrations-extras/` パスで更新します。

    ```
    ddev config set extras ./integrations-extras
    ```

4. `sortdb` パッケージをビルドします。

    ```
    ddev -e release build sortdb
    ```

5. [Datadog Agent をダウンロードして起動][6]します。
6. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

    ```
    datadog-agent integration install -w <PATH_OF_SORTDB_ARTIFACT_>/<SORTDB_ARTIFACT_NAME>.whl
    ```

7. [他のパッケージ化されたインテグレーション][7]と同様にインテグレーションを構成します。

## コンフィグレーション

1. Sortdb の[メトリクス](#metric-collection)の収集を開始するには、[Agent の構成ディレクトリ][8]のルートにある `conf.d/` フォルダーの `sortdb.d/conf.yaml` ファイルを編集します。
  使用可能なすべての構成オプションの詳細については、[サンプル sortdb.d/conf.yaml][9] を参照してください。

2. [Agent を再起動します][10]

## 検証

[Agent の status サブコマンドを実行][11]し、Checks セクションで `sortdb` を探します。

## 互換性

SortDB チェックは、すべての主要プラットフォームと互換性があります。

## 収集データ

### メトリクス
{{< get-metrics-from-git "sortdb" >}}


### サービスのチェック

現在、SortDB チェックには、サービスのチェック機能は含まれません。

### イベント

現在、SortDB チェックには、イベントは含まれません。

[1]: https://github.com/jehiah/sortdb
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[6]: https://app.datadoghq.com/account/settings#agent
[7]: https://docs.datadoghq.com/ja/getting_started/integrations
[8]: https://docs.datadoghq.com/ja/agent/faq/agent-configuration-files/#agent-configuration-directory
[9]: https://github.com/DataDog/integrations-extras/blob/master/sortdb/datadog_checks/sortdb/data/conf.yaml.example
[10]: https://docs.datadoghq.com/ja/agent/faq/agent-commands/#start-stop-restart-the-agent
[11]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[12]: https://github.com/DataDog/integrations-extras/blob/master/sortdb/metadata.csv


{{< get-dependencies >}}