---
app_id: resin
app_uuid: ff99886d-87b7-407a-aa90-7bea5ca27564
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: resin.thread_pool.thread_count
      metadata_path: metadata.csv
      prefix: resin.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10203
    source_type_name: Resin
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: コミュニティ
  sales_email: brent@bmontague.com
  support_email: brent@bmontague.com
categories:
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/resin/README.md
display_on_public_website: true
draft: false
git_integration_title: resin
integration_id: resin
integration_title: Resin
integration_version: 1.0.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: resin
public_title: Resin
short_description: Resin 内のスレッドプールと接続プールの設定を追跡
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Resin 内のスレッドプールと接続プールの設定を追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Resin
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このチェックは、Datadog Agent を通じて [Resin][1] を監視します。

## 計画と使用

### インフラストラクチャーリスト

Resin チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### ブラウザトラブルシューティング

1. 以下の JVM 引数を追加して [Resin のデフォルトサーバー][3]を構成し、JMX を有効にします。

```
<server-default>
  <jvm-arg>-Dcom.sun.management.jmxremote</jvm-arg>
  <jvm-arg>-Dcom.sun.management.jmxremote.port=7199</jvm-arg>
</server-default>
```

2. Resin のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `resin.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[resin.d/conf.yaml の例][2] を参照してください。

3. [Agent を再起動します][4]。

### 検証

[Agent の status サブコマンドを実行][5]し、Checks セクションで `resin` を探します。

### 収集データ

Linux プラットフォームの場合は、`/etc/datadog-agent/datadog.yaml` で Datadog Agent のログ収集を有効にします。その他のプラットフォームの場合は、[Agent コンフィギュレーションファイルガイド][6]を参照し、コンフィギュレーションファイルの場所を調べてください。

```yaml
logs_enabled: true
```

- ログの収集を開始するには、次のコンフィギュレーションブロックを `resin.d/conf.yaml` ファイルに対して有効化します。
    ```yaml
    logs:
      - type: file
        path: /var/opt/resin/log/*.log
        source: resin
    ```

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "resin" >}}


### ヘルプ

Resin には、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "resin" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。


[1]: https://caucho.com/
[2]: https://github.com/DataDog/integrations-extras/blob/master/resin/datadog_checks/resin/data/conf.yaml.example
[3]: https://www.caucho.com/resin-4.0/admin/cluster-server.xtp#JVMparameters:settingtheJVMcommandline
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/
[7]: https://github.com/DataDog/integrations-extras/blob/master/resin/metadata.csv
[8]: https://github.com/DataDog/integrations-extras/blob/master/resin/assets/service_checks.json
[9]: https://docs.datadoghq.com/ja/help/