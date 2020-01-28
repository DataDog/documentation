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
  - 'https://github.com/DataDog/integrations-extras/blob/master/portworx/README.md'
display_name: Portworx
git_integration_title: portworx
guid: 858a4b03-3f75-4019-8ba8-46b00d5aeb46
integration_id: portworx
integration_title: Portworx
is_public: true
kind: インテグレーション
maintainer: paul@portworx.com
manifest_version: 1.0.0
metric_prefix: portworx.
name: portworx
public_title: Datadog-Portworx インテグレーション
short_description: Portworx インスタンスからランタイムメトリクスを収集
support: contrib
supported_os:
  - linux
---
## 概要

Portworx サービスからメトリクスをリアルタイムに取得して、以下のことができます。

- Portworx クラスターの健全性とパフォーマンスを監視できます。
- Portworx ボリュームのディスク使用状況、レイテンシー、スループットを追跡できます。

## セットアップ

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに Portworx チェックをインストールしてください。[バージョン 6.8 以前の Agent][2] または [Docker Agent][3] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][1]に関する Agent のガイドを参照してください。

1. [開発ツールキット][4]をインストールします。
2. integrations-extras リポジトリを複製します。

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. `ddev` 構成を `integrations-extras/` パスで更新します。

    ```
    ddev config set extras ./integrations-extras
    ```

4. `portworx` パッケージをビルドします。

    ```
    ddev -e release build portworx
    ```

5. [Datadog Agent をダウンロードして起動][5]します。
6. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

    ```
    datadog-agent integration install -w <PATH_OF_PORTWORX_ARTIFACT_>/<PORTWORX_ARTIFACT_NAME>.whl
    ```

7. [他のパッケージ化されたインテグレーション][6]と同様にインテグレーションを構成します。

### コンフィグレーション

1. Portworx の[メトリクス](#metric-collection)の収集を開始するには、[Agent の構成ディレクトリ][7]のルートにある `conf.d/` フォルダーの `portworx.d/conf.yaml` ファイルを編集します。
  使用可能なすべての構成オプションの詳細については、[サンプル portworx.d/conf.yaml][8] を参照してください。

2. [Agent を再起動します][9]

#### メトリクスの収集

- portworx メトリクスの収集を開始するには、`portworx.yaml` ファイルに次の構成設定を追加します。

```
init_config:

instances:
 # Prometheus のメトリクスエンドポイントの URL
 - prometheus_endpoint: http://localhost:9001/metrics
```

サーバーとポートを指定するように構成します。

使用可能なすべての構成オプションの詳細については、[portworx.yaml のサンプル][10]を参照してください。

* [Agent を再起動][11]すると、Datadog への Portworx メトリクスの送信が開始されます。

### 検証

[Agent の `info` サブコマンドを実行すると][12]、以下のような内容が表示されます。

## 互換性

Portworx チェック機能は、Portworx 1.4.0 以前のバージョンと互換性があります。

## 収集データ

### メトリクス
{{< get-metrics-from-git "portworx" >}}


### イベント

Portworx チェックには、イベントは含まれません。

## トラブルシューティング

### Agent が接続できない

```
    portworx
    -------
      - instance #0 [ERROR]: "('Connection aborted.', error(111, 'Connection refused'))"
      - Collected 0 metrics, 0 events & 0 service check
```

`portworx.yaml` 内の `url` が正しいかどうかを確認してください。

## その他の参考資料

インフラストラクチャーの監視の詳細および Datadog の全インテグレーションについては、[ブログ記事][14]を参照してください。

[1]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[4]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[5]: https://app.datadoghq.com/account/settings#agent
[6]: https://docs.datadoghq.com/ja/getting_started/integrations
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-extras/blob/master/portworx/datadog_checks/portworx/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://github.com/DataDog/integrations-extras/blob/master/portworx/datadog_checks/portworx/data/conf.yaml.example
[11]: https://docs.datadoghq.com/ja/agent/faq/agent-commands/#start-stop-restart-the-agent
[12]: https://docs.datadoghq.com/ja/agent/faq/agent-status-and-information
[13]: https://github.com/DataDog/integrations-extras/blob/master/portworx/metadata.csv
[14]: https://www.datadoghq.com/blog


{{< get-dependencies >}}