---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
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
  - 'https://github.com/DataDog/integrations-extras/blob/master/resin/README.md'
display_name: Resin
draft: false
git_integration_title: resin
guid: f7b4c3db-5e56-4ab7-bef7-9d4a347daaee
integration_id: resin
integration_title: Resin
is_public: true
kind: integration
maintainer: brent@bmontague.com
manifest_version: 1.0.0
metric_prefix: resin.
metric_to_check: resin.thread_pool.thread_count
name: resin
public_title: Datadog-Resin インテグレーション
short_description: Resin 内のスレッドプールと接続プールの設定を追跡
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、Datadog Agent を通じて [Resin][1] を監視します。

## セットアップ

### インストール

Resin チェックは [Datadog Agent][2] パッケージに含まれていないため、
お客様自身でインストールする必要があります。

### コンフィギュレーション

1. 以下の JVM 引数を追加して [Resin のデフォルトサーバー][3]を構成し、JMX を有効にします。

```
<server-default>
  <jvm-arg>-Dcom.sun.management.jmxremote</jvm-arg>
  <jvm-arg>-Dcom.sun.management.jmxremote.port=7199</jvm-arg>
</server-default>
```

2. Resin のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `resin.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[resin.d/conf.yaml のサンプル][2] を参照してください。

3. [Agent を再起動します][4]。

### 検証

[Agent の status サブコマンドを実行][5]し、Checks セクションで `resin` を探します。

### ログの収集

Linux プラットフォームの場合は、`/etc/datadog-agent/datadog.yaml` で Datadog Agent のログ収集を有効にします。その他のプラットフォームの場合は、[Agent コンフィギュレーションファイルガイド][6] を参照し、コンフィギュレーションファイルの場所を調べてください。

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

## 収集データ

### メトリクス
{{< get-metrics-from-git "resin" >}}


### イベント

Resin には、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "resin" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。


[1]: https://caucho.com/
[2]: https://github.com/DataDog/integrations-core/blob/master/resin/datadog_checks/resin/data/conf.yaml.example
[3]: https://www.caucho.com/resin-4.0/admin/cluster-server.xtp#JVMparameters:settingtheJVMcommandline
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/
[7]: https://github.com/DataDog/integrations-extras/blob/master/resin/metadata.csv
[8]: https://github.com/DataDog/integrations-extras/blob/master/resin/assets/service_checks.json
[9]: https://docs.datadoghq.com/ja/help/