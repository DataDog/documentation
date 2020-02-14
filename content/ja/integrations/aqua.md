---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - security
  - モニター
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/aqua/README.md'
display_name: Aqua
git_integration_title: aqua
guid: c269dad1-8db2-4e91-b25d-af646e80dbbf
integration_id: aqua
integration_title: Aqua
is_public: true
kind: インテグレーション
maintainer: oran.moshai@aquasec.com
manifest_version: 1.0.0
metric_prefix: aqua.
metric_to_check: ''
name: aqua
public_title: Datadog-Aqua インテグレーション
short_description: コンテナおよびクラウドネイティブアプリケーションの開発から運用までをフルカバーするセキュリティソリューション
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは [Aqua][1] を監視します。

Aqua チェックは、脆弱性の深刻度が高い場合、あるいは Aqua に登録されていないホスト上でコンテナが実行されている場合に、ユーザーに警告します。Aqua は、実行時にブロックされたイベントに関するデータアラートも送信します。さらに多くの Aqua スキャナが必要な場合は、インフラストラクチャーをスケーリングする Webhook をトリガーすることも可能です。

## セットアップ

Aqua チェックは [Datadog Agent][2] パッケージに含まれていないため、
お客様自身でインストールする必要があります。

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに Aqua チェックをインストールしてください。[バージョン 6.8 以前の Agent][4] または [Docker Agent][5] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][3]に関する Agent のガイドを参照してください。

1. [開発ツールキット][6]をインストールします。
2. integrations-extras リポジトリを複製します。

    ```
    git clone https://github.com/DataDog/integrations-extras.git.
    ```

3. `ddev` 構成を `integrations-extras/` パスで更新します。

    ```
    ddev config set extras ./integrations-extras
    ```

4. `aqua` パッケージをビルドします。

    ```
    ddev -e release build aqua
    ```

5. [Datadog Agent をダウンロードして起動][7]します。
6. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

    ```
    datadog-agent integration install -w <PATH_OF_AQUA_ARTIFACT>/<AQUA_ARTIFACT_NAME>.whl
    ```

7. [他のパッケージ化されたインテグレーション][8]と同様にインテグレーションを構成します。

### コンフィグレーション

1. Aqua の[メトリクス](#metric-collection)と[ログ](#log-collection)の収集を開始するには、[Agent の構成ディレクトリ][9]のルートにある `conf.d/` フォルダーの `aqua.d/conf.yaml` ファイルを編集します。
  使用可能なすべての構成オプションの詳細については、[conf.yaml のサンプル][10]を参照してください。

#### メトリクスの収集

1. [Aqua のメトリクス](#metrics)の収集を開始するには、`aqua.d/conf.yaml` ファイルに次の構成ブロックを追加します。

```
instances:
  - url: http://your-aqua-instance.com
    api_user: <api_username>
    password: <api_user_password>
```

`api_user` パラメーターと `password` パラメーターの値を変更し、環境に合わせて構成してください。

[Agent を再起動します][11]。

#### ログの収集

Aqua によって生成されるログには、次の 2 種類があります。

* Aqua 監査ログ
* Aqua エンフォーサーログ

Aqua 監査ログを収集するには、以下の手順に従います。

1. Aqua アカウントに接続します。
2. `Integration` ページの `Log Management` セクションに移動します。
3. Webhook インテグレーションをアクティブにします。
4. このインテグレーションを有効にし、エンドポイント `https://http-intake.logs.datadoghq.com/v1/input/<DATADOG_API_KEY>?ddsource=aqua` を追加します。

* `<DATADOG_API_KEY>` は、ご使用の [Datadog API キー][12]に置き換えます。
* 注: EU リージョンの場合は、エンドポイントの `.com` を `.eu` に置き換えます。

Aqua エンフォーサーログを収集するには、以下のようにします (**Agent 6.0 以上で有効**)。

* Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、[daemonset 構成][13]でこれを有効にします。

```
(...)
  env:
    (...)
    - name: DD_LOGS_ENABLED
        value: "true"
    - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
        value: "true"
(...)
```

* [こちらのマニフェスト][14]のように、Docker ソケットを Datadog Agent にマウントします。

* [Agent を再起動します][11]。


### 検証

[Agent の `status` サブコマンドを実行][15]し、Checks セクションで `aqua` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "aqua" >}}


### サービスのチェック

**aqua.can_connect**:

Agent が Aqua に接続してメトリクスを収集できない場合は、CRITICAL を返します。それ以外の場合は、OK を返します。

### イベント

Aqua には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][17]までお問合せください。

[1]: https://www.aquasec.com
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[5]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[6]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[7]: https://app.datadoghq.com/account/settings#agent
[8]: https://docs.datadoghq.com/ja/getting_started/integrations
[9]: https://docs.datadoghq.com/ja/agent/faq/agent-configuration-files/#agent-configuration-directory
[10]: https://github.com/DataDog/integrations-extras/blob/master/aqua/datadog_checks/aqua/data/conf.yaml.example
[11]: https://docs.datadoghq.com/ja/agent/faq/agent-commands/#start-stop-restart-the-agent
[12]: https://app.datadoghq.com/account/settings#api
[13]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/#log-collection
[14]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/#create-manifest
[15]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[16]: https://github.com/DataDog/integrations-extras/blob/master/aqua/metadata.csv
[17]: https://docs.datadoghq.com/ja/help