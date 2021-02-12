---
aliases: []
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/traefik/README.md'
display_name: Traefik
draft: false
git_integration_title: traefik
guid: 322c0b9d-3ec6-434e-918c-5740f2a114bf
integration_id: traefik
integration_title: Traefik
is_public: true
kind: インテグレーション
maintainer: '@renaudhager'
manifest_version: 1.1.0
metric_prefix: traefik.
name: traefik
public_title: Datadog-Traefik インテグレーション
short_description: traefik のメトリクスを収集
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このインテグレーションは [Traefik][1] からデータを収集して、Traefik の健全性をチェックすると共に、以下を監視します。

- エラーログ (4xx コード、5xx コード)
- リクエスト数
- 送受信されたバイト数

## セットアップ

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに Traefik チェックをインストールしてください。[バージョン 6.8 以前の Agent][3] または [Docker Agent][4] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][2]に関する Agent のガイドを参照してください。

1. [Datadog Agent をダウンロードして起動][4]します。
2. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
   datadog-agent integration install -t datadog-traefik==<INTEGRATION_VERSION>
   ```

3. [他のパッケージ化されたインテグレーション][5]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. Traefik の[メトリクス](#metric-collection)または[ログ](#log-collection)を収集するには、[Agent のコンフィギュレーションディレクトリ][6]のルートにある `conf.d/` フォルダーの `traefik.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル traefik.d/conf.yaml][7] を参照してください。

2. [Agent を再起動します][8]。

#### メトリクスの収集

[メトリクス][9]の収集を開始するには、`traefik.yaml` ファイルに次のコンフィギュレーションセットアップを追加します。

```yaml
init_config:

instances:
  - host: 10.1.2.3
    port: "8080"
    path: "/health"
    scheme: "http"
```

構成オプション

- host: クエリする Traefik エンドポイント。**必須**
- port: Traefik エンドポイントの API リスナー。デフォルト値は `8080`。オプション
- path: Traefik の健全性チェックエンドポイントのパス。デフォルトは `/health`。オプション
- scheme: Traefik の健全性チェックエンドポイントのスキーム。デフォルトは `http`。_オプション_

[Agent を再起動][8]すると、Datadog への Traefik メトリクスの送信が開始されます。

#### ログの収集

**Agent 6.0 以上で使用可能**

[Traefik のログ][10]は、デフォルトで stdout に送信されます。Datadog Agent は、コンテナ `stdout`/`stderr` から直接ログを収集できるため、コンテナバージョンではこれを変更しないでください。

Traefik がログをファイルに記録するように構成する場合は、Traefik 構成ファイルに以下を追加します。

```conf
[traefikLog]
  filePath = "/path/to/traefik.log"
```

[一般的な Apache Access 形式][11]がデフォルトで使用され、このインテグレーションでサポートされています。

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. Traefik ログの収集を開始するには、[Agent のコンフィギュレーションディレクトリ][6]のルートにある `traefik.d/conf.yaml` ファイルに次のコンフィギュレーションブロックを追加します。

    ```yaml
    logs:
      - type: file
        path: /path/to/traefik.log
        source: traefik
        service: traefik
    ```

      `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。

3. [Agent を再起動します][8]。

### 検証

[Agent の `status` サブコマンドを実行][12]し、Checks セクションで `traefik` を探します。

## 互換性

このチェックは、すべての主要プラットフォームと互換性があります。

## 収集データ

### メトリクス
{{< get-metrics-from-git "traefik" >}}


### イベント

Traefik チェックには、イベントは含まれません。

### サービスのチェック

Traefik をクエリすると、ステータスコードとして `200` が返されます。

## 開発

Agent ベースのインテグレーションのテストおよび開発方法の詳細については、[メインドキュメント][13]を参照してください。

[1]: https://traefik.io
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://docs.datadoghq.com/ja/getting_started/integrations/
[6]: https://docs.datadoghq.com/ja/agent/faq/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-extras/blob/master/traefik/datadog_checks/traefik/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/agent/faq/agent-commands/#start-stop-restart-the-agent
[9]: https://github.com/DataDog/integrations-extras/blob/master/traefik/metadata.csv
[10]: https://docs.traefik.io/configuration/logs/#traefik-logs
[11]: https://docs.traefik.io/configuration/logs/#clf-common-log-format
[12]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[13]: https://docs.datadoghq.com/ja/developers/