---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - モニター
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/bind9/README.md'
display_name: BIND 9
git_integration_title: bind9
guid: bce6961c-4312-11e9-b210-d663bd873d93
integration_id: bind9
integration_title: bind9
is_public: true
kind: インテグレーション
maintainer: ashuvyas45@gmail.com
manifest_version: 1.0.0
metric_prefix: bind9.
name: bind9
public_title: Datadog-bind9 インテグレーション
short_description: bind9 サーバーのメトリクスを収集する Datadog インテグレーション
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Bind9 DNS サーバーからメトリクスを取得すると、以下のことができます。

* bind9 統計を視覚化および監視できます。
![スナップ][1]

## セットアップ

Bind9 チェックは [Datadog Agent][2] パッケージに**含まれていません**。

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従ってホストに Bind9 チェックをインストールしてください。[バージョン 6.8 以前の Agent][4] または [Docker Agent][5] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][3]に関する Agent のガイドを参照してください。

1. [開発ツールキット][6]をインストールします。
2. integrations-extras リポジトリを複製します。

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. `ddev` 構成を `integrations-extras/` パスで更新します。

    ```
    ddev config set extras ./integrations-extras
    ```

4. `bind9` パッケージをビルドします。

    ```
    ddev -e release build bind9
    ```

5. [Datadog Agent をダウンロードして起動][2]します。
6. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

    ```
    datadog-agent integration install -w <PATH_OF_BIND9_ARTIFACT>/<BIND9_ARTIFACT_NAME>.whl
    ```

7. [他のパッケージ化されたインテグレーション][7]と同様にインテグレーションを構成します。

### コンフィグレーション

1. Bind9 の[メトリクス](#metric-collection)の収集を開始するには、[Agent の構成ディレクトリ][8]のルートにある `conf.d/` フォルダーの `bind9.d/conf.yaml` ファイルを編集します。
  使用可能なすべての構成オプションの詳細については、[サンプル bind9.d/conf.yaml][9] を参照してください。

2. [Agent を再起動します][10]。

#### メトリクスの収集

[メトリクス][11]の収集を開始するには、`conf.yaml` ファイルに次の構成設定を追加します。

```
init_config:

instances:
  - URL : <BIND_9_STATS_URL>
```

### 検証

[Agent の `status` サブコマンドを実行][12]し、Checks セクションで `bind9` を探します。

## 互換性

このチェックは、すべての主要プラットフォームと互換性があります。

## 収集データ

### メトリクス
{{< get-metrics-from-git "bind9" >}}


### イベント

現時点で、bind9_check チェックには、イベントは含まれません。

### サービスのチェック

`bind9_check.BIND_SERVICE_CHECK`: DNS の統計チャンネル URL がインスタンスに存在する場合は、`OK` を返します。
`bind9_check.BIND_SERVICE_CHECK`: URL エラーが発生した場合は、`CRITICAL` を返します。

## 開発

Agent ベースのインテグレーションのテストおよび開発方法の詳細については、[メインドキュメント][14]を参照してください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/bind9/images/snapshot.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[5]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[6]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[7]: https://docs.datadoghq.com/ja/getting_started/integrations
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[9]: https://github.com/DataDog/integrations-extras/blob/master/bind9/datadog_checks/bind9/data/conf.yaml.example
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: #metrics
[12]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[13]: https://github.com/DataDog/cookiecutter-datadog-check/blob/master/%7B%7Bcookiecutter.check_name%7D%7D/metadata.csv
[14]: https://docs.datadoghq.com/ja/developers


