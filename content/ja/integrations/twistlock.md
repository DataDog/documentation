---
app_id: twistlock
app_uuid: b10f1447-4e25-4c76-ab05-911cde5df5c6
assets:
  dashboards:
    Twistlock: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: twistlock.images.cve.details
      metadata_path: metadata.csv
      prefix: twistlock.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10052
    source_type_name: Twistlock
  logs:
    source: twistlock
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- コンプライアンス
- コンテナ
- ログの収集
- ネットワーク
- セキュリティ
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/twistlock/README.md
display_on_public_website: true
draft: false
git_integration_title: twistlock
integration_id: twistlock
integration_title: Prisma Cloud Compute Edition
integration_version: 3.6.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: twistlock
public_title: Prisma Cloud Compute Edition
short_description: Twistlock はコンテナセキュリティスキャナ
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - カテゴリ::コンプライアンス
  - Category::Containers
  - Category::Log Collection
  - Category::Network
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Twistlock はコンテナセキュリティスキャナ
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Prisma Cloud Compute Edition
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

[Prisma Cloud Compute Edition][1] はセキュリティスキャナです。コンテナ、ホスト、パッケージをスキャンして、脆弱性やコンプライアンス問題を発見します。

## 計画と使用

### インフラストラクチャーリスト

Prisma Cloud Compute Edition チェックは [Datadog Agent][2] パッケージに含まれているため、サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

{{< tabs >}}
{{% tab "ホスト" %}}

#### メトリクスベース SLO

ホストで実行中の Agent に対してこのチェックを構成するには

##### メトリクスの収集

1. twistlock のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `twistlock.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル twistlock.d/conf.yaml][1] を参照してください。

2. [Agent を再起動します][2]。

[1]: https://github.com/DataDog/integrations-core/blob/master/twistlock/datadog_checks/twistlock/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                                                               |
| -------------------- | ----------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `twistlock`                                                                         |
| `<INIT_CONFIG>`      | 空白または `{}`                                                                       |
| `<INSTANCE_CONFIG>`  | `{"url":"http://%%host%%:8083", "username":"<ユーザー名>", "password": "<パスワード>"}` |

###### ガイド

Kubernetes を使用している場合は、デプロイ前に twistlock_console.yaml の replication controller セクションに構成を追加してください。

```yaml
apiVersion: v1
kind: ReplicationController
metadata:
  name: twistlock-console
  namespace: twistlock
spec:
  replicas: 1
  selector:
    name: twistlock-console
  template:
    metadata:
      annotations:
        ad.datadoghq.com/twistlock-console.check_names: '["twistlock"]'
        ad.datadoghq.com/twistlock-console.init_configs: "[{}]"
        ad.datadoghq.com/twistlock-console.instances: '[{"url":"http://%%host%%:8083", "username":"<USERNAME>", "password": "<PASSWORD>"}]'
        ad.datadoghq.com/twistlock-console.logs: '[{"source": "twistlock", "service": "twistlock"}]'
      name: twistlock-console
      namespace: twistlock
      labels:
        name: twistlock-console
```

##### 収集データ


{{< site-region region="us3" >}}
**ログ収集は、Datadog {{< region-param key="dd_site_name" >}} サイトでサポートされていません**。
{{< /site-region >}}


_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][2]を参照してください。

| パラメーター      | 値                                             |
| -------------- | ------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "twistlock", "service": "twistlock"}` |

###### ガイド

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、[DaemonSet コンフィギュレーション][3]でこれを有効にします。

   ```yaml
     #(...)
       env:
         #(...)
         - name: DD_LOGS_ENABLED
             value: "true"
         - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
             value: "true"
     #(...)
   ```

2. Docker ソケットを Datadog Agent にマウントします。Datadog Kubernetes の[マニフェストの例][4]を参照してください。

3. ディフェンダーのポッドアノテーションにログセクションを追加します。コンテナ名は、ポッド仕様の直下にあります。

   ```yaml
   ad.datadoghq.com/<container-name>.logs: '[{"source": "twistlock", "service": "twistlock"}]'
   ```

4. [Agent を再起動します][5]。

###### Docker

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。次のように、環境変数を使用してこれを有効にします。

   ```shell
   DD_LOGS_ENABLED=true
   ```

2. ディフェンダーコンテナにラベルを追加します。

   ```yaml
   ad.datadoghq.com/<container-name>.logs: '[{"source": "twistlock", "service": "twistlock"}]'
   ```

3. Docker ソケットを Datadog Agent にマウントします。Datadog Agent を使用してログを収集するための構成については、[Docker ログの収集][6]を参照してください。

4. [Agent を再起動します][5]。

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/?tab=containerinstallation#setup
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/#log-collection
[4]: https://docs.datadoghq.com/ja/agent/kubernetes/?tab=daemonset
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンド][3]を実行し、Checks セクションで `twistlock` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "twistlock" >}}


### ヘルプ

Prisma Cloud Compute Edition は、新しい CVE が見つかると、イベントを送信します。

### ヘルプ
{{< get-service-checks-from-git "twistlock" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。



[1]: https://www.paloaltonetworks.com/prisma/cloud
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/