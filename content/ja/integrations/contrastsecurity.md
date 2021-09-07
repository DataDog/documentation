---
assets:
  dashboards:
    Contrast Security Integration Overview: assets/dashboards/contrast_security_protect.json
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/contrastsecurity/README.md
display_name: contrastsecurity
draft: false
git_integration_title: contrastsecurity
guid: 8483bcdc-3d45-48ee-8a73-75511a67ad5f
integration_id: contrastsecurity
integration_title: Contrast Security
is_public: true
kind: インテグレーション
maintainer: kristiana.mitchell@contrastsecurity.com
manifest_version: 1.0.0
metric_prefix: contrastsecurity.
metric_to_check: ''
name: contrastsecurity
public_title: Datadog-Contrast Security インテグレーション
short_description: Datadog で Contrast Security から攻撃や脆弱性をチェックする
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Datadog-Contrast インテグレーションでは、Contrast のログを Datadog に収集することができます。

## セットアップ

### ログの収集

Linux プラットフォームの場合は、`/etc/datadog-agent/datadog.yaml` で Datadog Agent のログ収集を有効にします。その他のプラットフォームの場合は、[Agent コンフィギュレーションファイルガイド][1] を参照し、コンフィギュレーションファイルの場所を調べてください。

```yaml
logs_enabled: true
```

- このコンフィギュレーションブロックを `contrastsecurity.d/conf.yaml` ファイルに追加して、Contrast のログの収集を開始します。
- 新しい `conf.yaml` ファイルを作成します。
- カスタムログ収集のコンフィギュレーショングループを追加します。

    ```yaml
    logs:
      - type: file
        path: /path/to/contrast/security.log
        service: contrast
        source: contrastsecurity
    ```

ログの詳細については、[Contrast Security のドキュメント][2]を参照してください。

- [Datadog Agent を再起動][3]します。

詳細については、次を参照してください:
- [Datadog ログのドキュメント][4]
- [ダッシュボードの作成に関する Datadog API ドキュメント][5]

## 収集データ

### メトリクス

Contrast インテグレーションには、メトリクスは含まれません。

### イベント

Contrast インテグレーションは、イベントを送信しません。

### サービスのチェック

Contrast インテグレーションには、サービス チェック機能は含まれません。


[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/
[2]: https://docs.contrastsecurity.com/installation-setupconfig.html#log
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#restart-the-agent
[4]: https://docs.datadoghq.com/ja/logs/log_collection/#getting-started-with-the-agent
[5]: https://docs.datadoghq.com/ja/api/#create-a-dashboard