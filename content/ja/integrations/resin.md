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

## 収集データ

### メトリクス
{{< get-metrics-from-git "resin" >}}


### サービスのチェック

**resin.can_connect**:

Agent が監視対象の Resin インスタンスに接続できず、メトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

### イベント

Resin には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

[1]: https://caucho.com/
[2]: https://github.com/DataDog/integrations-core/blob/master/resin/datadog_checks/resin/data/conf.yaml.example
[3]: https://www.caucho.com/resin-4.0/admin/cluster-server.xtp#JVMparameters:settingtheJVMcommandline
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[6]: https://github.com/DataDog/integrations-extras/blob/master/resin/metadata.csv
[7]: https://docs.datadoghq.com/ja/help/