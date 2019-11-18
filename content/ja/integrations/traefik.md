---
aliases: []
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - web
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/traefik/README.md'
display_name: Traefik
git_integration_title: traefik
guid: 322c0b9d-3ec6-434e-918c-5740f2a114bf
integration_id: traefik
integration_title: Traefik
is_public: true
kind: インテグレーション
maintainer: '@renaudhager'
manifest_version: 1.0.0
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

1. [開発ツールキット][5]をインストールします。
2. integrations-extras リポジトリを複製します。

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. `ddev` 構成を `integrations-extras/` パスで更新します。

    ```
    ddev config set extras ./integrations-extras
    ```

4. `traefik` パッケージをビルドします。

    ```
    ddev -e release build traefik
    ```

5. [Datadog Agent をダウンロードして起動][6]します。
6. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

    ```
    datadog-agent integration install -w <PATH_OF_TRAEFIK_ARTIFACT_>/<TRAEFIK_ARTIFACT_NAME>.whl
    ```

7. [他のパッケージ化されたインテグレーション][7]と同様にインテグレーションを構成します。

### コンフィグレーション

1. Traefik の[メトリクス](#metric-collection)または[ログ](#log-collection)の収集を開始するには、[Agent の構成ディレクトリ][8]のルートにある `conf.d/` フォルダーの `traefik.d/conf.yaml` ファイルを編集します。
  使用可能なすべての構成オプションの詳細については、[サンプル traefik.d/conf.yaml][9] を参照してください。

2. [Agent を再起動します][10]

#### メトリクスの収集

[メトリクス][11]の収集を開始するには、`traefik.yaml` ファイルに次の構成設定を追加します。

```
init_config:

instances:
  - host: 10.1.2.3
    port: "8080"
    path: "/health"
```

構成オプション

- host: クエリする Traefik エンドポイント。**必須**
- port: Traefik エンドポイントの API リスナー。デフォルト値は `8080`。オプション
- path: Traefik の健全性チェックエンドポイントのパス。デフォルトは `/health`。オプション

[Agent を再起動][10]すると、Datadog への Traefik メトリクスの送信が開始されます。

#### ログの収集

**Agent 6.0 以上で使用可能**

[Traefik のログ][12]は、デフォルトで stdout に送信されます。Datadog Agent は、コンテナ `stdout`/`stderr` から直接ログを収集できるため、コンテナバージョンではこれを変更しないでください。

Traefik がログをファイルに記録するように構成する場合は、Traefik 構成ファイルに以下を追加します。

```
[traefikLog]
  filePath = "/path/to/traefik.log"
```

[一般的な Apache Access 形式][13]がデフォルトで使用され、このインテグレーションでサポートされています。

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

      ```yaml
      logs_enabled: true
      ```


2.  Traefik ログの収集を開始するには、[Agent の構成ディレクトリ][8]のルートにある `traefik.d/conf.yaml` ファイルに次の構成ブロックを追加します。

      ```yaml
      logs:
        - type: file
          path: /path/to/traefik.log
          source: traefik
          service: traefik
      ```

* `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。

* [Agent を再起動します][10]

### 検証

[Agent の `status` サブコマンドを実行][14]し、Checks セクションで `traefik` を探します。

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

Agent ベースのインテグレーションのテストおよび開発方法の詳細については、[メインドキュメント][15]を参照してください。

[1]: https://traefik.io
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[6]: https://app.datadoghq.com/account/settings#agent
[7]: https://docs.datadoghq.com/ja/getting_started/integrations
[8]: https://docs.datadoghq.com/ja/agent/faq/agent-configuration-files/#agent-configuration-directory
[9]: https://github.com/DataDog/integrations-extras/blob/master/traefik/datadog_checks/traefik/data/conf.yaml.example
[10]: https://docs.datadoghq.com/ja/agent/faq/agent-commands/#start-stop-restart-the-agent
[11]: https://github.com/DataDog/integrations-extras/blob/master/traefik/metadata.csv
[12]: https://docs.traefik.io/configuration/logs/#traefik-logs
[13]: https://docs.traefik.io/configuration/logs/#clf-common-log-format
[14]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#service-status
[15]: https://docs.datadoghq.com/ja/developers


{{< get-dependencies >}}