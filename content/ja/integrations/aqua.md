---
app_id: aqua
app_uuid: d3819b09-3e08-492f-b0f8-b0d3f53fbdf5
assets:
  dashboards:
    aqua: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: aqua.running_containers
      metadata_path: metadata.csv
      prefix: aqua.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10042
    source_type_name: Aqua
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Aqua
  sales_email: oran.moshai@aquasec.com
  support_email: oran.moshai@aquasec.com
categories:
- コンテナ
- ログの収集
- セキュリティ
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/aqua/README.md
display_on_public_website: true
draft: false
git_integration_title: aqua
integration_id: aqua
integration_title: Aqua
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: aqua
public_title: Aqua
short_description: コンテナおよびクラウドネイティブアプリケーションの開発から運用までをフルカバーするセキュリティソリューション
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Log Collection
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: コンテナおよびクラウドネイティブアプリケーションの開発から運用までをフルカバーするセキュリティソリューション
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Aqua
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このチェックは [Aqua][1] を監視します。

Aqua チェックは、脆弱性の深刻度が高い場合、あるいは Aqua に登録されていないホスト上でコンテナが実行されている場合に、ユーザーに警告します。Aqua は、実行時にブロックされたイベントに関するデータアラートも送信します。さらに多くの Aqua スキャナが必要な場合は、インフラストラクチャーをスケーリングする Webhook をトリガーすることも可能です。

## 計画と使用

Aqua チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インフラストラクチャーリスト

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Aqua チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-aqua==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

### ブラウザトラブルシューティング

#### メトリクスの収集

1. Aqua の[メトリクス](#metrics)を収集するには、[Agent のコンフィギュレーションディレクトリ][5]のルートにある `conf.d/` フォルダーの `aqua.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル conf.yaml][6] を参照してください。

   ```yaml
   instances:
     - url: http://your-aqua-instance.com
       api_user: "<API_USERNAME>"
       password: "<API_USER_PASSWORD>"
   ```

   `api_user` パラメーターと `password` パラメーターの値を変更し、環境に合わせて構成してください。

2. [Agent を再起動します][7]。

#### 収集データ

Aqua によって生成されるログには、次の 2 種類があります。

- Aqua 監査ログ
- Aqua エンフォーサーログ

Aqua 監査ログを収集するには、以下の手順に従います。

1. Aqua アカウントに接続します。
2. `Integration` ページの `Log Management` セクションに移動します。
3. Webhook インテグレーションをアクティブにします。
4. これを有効にし、次のエンドポイントを追加します: `{{< region-param key="http_endpoint" code="true" >}}/v1/input/<DATADOG_API_KEY>?ddsource=aqua`
   - `<DATADOG_API_KEY>` は、ご使用の [Datadog API キー][8]に置き換えます。

Aqua エンフォーサーログを収集するには、以下のようにします (**Agent 6.0 以上で有効**)。

5. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、[daemonset コンフィギュレーション][9]でこれを有効にします。

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

   Docker ソケットを Datadog Agent にマウントします。[マニフェストの例][10]は、Kubernetes のドキュメントを参照してください。

6. [Agent を再起動します][7]。

### 検証

[Agent の `status` サブコマンドを実行][11]し、Checks セクションで `aqua` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "aqua" >}}


### ヘルプ

Aqua には、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "aqua" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][14]までお問合せください。


[1]: https://www.aquasec.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://docs.datadoghq.com/ja/agent/faq/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/aqua/datadog_checks/aqua/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/faq/agent-commands/#start-stop-restart-the-agent
[8]: https://app.datadoghq.com/organization-settings/api-keys
[9]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/#log-collection
[10]: https://docs.datadoghq.com/ja/agent/kubernetes/?tab=daemonset#installation
[11]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[12]: https://github.com/DataDog/integrations-extras/blob/master/aqua/metadata.csv
[13]: https://github.com/DataDog/integrations-extras/blob/master/aqua/assets/service_checks.json
[14]: https://docs.datadoghq.com/ja/help/