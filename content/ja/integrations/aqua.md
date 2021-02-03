---
assets:
  dashboards:
    aqua: assets/dashboards/overview.json
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - security
  - モニター
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/aqua/README.md'
display_name: Aqua
draft: false
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

1. [Datadog Agent をダウンロードして起動][2]します。
2. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
   datadog-agent integration install -t datadog-aqua==<INTEGRATION_VERSION>
   ```
3. [他のパッケージ化されたインテグレーション][6]と同様にインテグレーションを構成します。

### コンフィギュレーション

#### メトリクスの収集

1. Aqua の[メトリクス](#metrics)を収集するには、[Agent のコンフィギュレーションディレクトリ][7]のルートにある `conf.d/` フォルダーの `aqua.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル conf.yaml][8] を参照してください。

   ```yaml
   instances:
     - url: http://your-aqua-instance.com
       api_user: "<API_USERNAME>"
       password: "<API_USER_PASSWORD>"
   ```

   `api_user` パラメーターと `password` パラメーターの値を変更し、環境に合わせて構成してください。

2. [Agent を再起動します][9]。

#### ログの収集

Aqua によって生成されるログには、次の 2 種類があります。

- Aqua 監査ログ
- Aqua エンフォーサーログ

Aqua 監査ログを収集するには、以下の手順に従います。

1. Aqua アカウントに接続します。
2. `Integration` ページの `Log Management` セクションに移動します。
3. Webhook インテグレーションをアクティブにします。
4. このインテグレーションを有効にし、エンドポイント `https://http-intake.logs.datadoghq.com/v1/input/<DATADOG_API_KEY>?ddsource=aqua` を追加します。

   - `<DATADOG_API_KEY>` は、ご使用の [Datadog API キー][10]に置き換えます。
   - _注_: EU リージョンの場合は、エンドポイントの `.com` を `.eu` に置き換えます。

    Aqua エンフォーサーログを収集するには、以下のようにします (**Agent 6.0 以上で有効**)。

5. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、[daemonset コンフィギュレーション][11]でこれを有効にします。

   ```yaml
     # (...)
     env:
       # (...)
       - name: DD_LOGS_ENABLED
           value: "true"
       - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
           value: "true"
     # (...)
   ```

    [こちらのマニフェスト][12]のように、Docker ソケットを Datadog Agent にマウントします。

6. [Agent を再起動します][9]。

### 検証

[Agent の `status` サブコマンドを実行][13]し、Checks セクションで `aqua` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "aqua" >}}


### サービスのチェック

**aqua.can_connect**:

Agent が Aqua に接続してメトリクスを収集できない場合は、CRITICAL を返します。それ以外の場合は、OK を返します。

### イベント

Aqua には、イベントは含まれません。

## トラブルシューティング

ご不明な点は [Datadog サポート][15]までお問い合わせください。

[1]: https://www.aquasec.com
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[5]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[6]: https://docs.datadoghq.com/ja/getting_started/integrations/
[7]: https://docs.datadoghq.com/ja/agent/faq/agent-configuration-files/#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-extras/blob/master/aqua/datadog_checks/aqua/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ja/agent/faq/agent-commands/#start-stop-restart-the-agent
[10]: https://app.datadoghq.com/account/settings#api
[11]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/#log-collection
[12]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/#create-manifest
[13]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[14]: https://github.com/DataDog/integrations-extras/blob/master/aqua/metadata.csv
[15]: https://docs.datadoghq.com/ja/help/