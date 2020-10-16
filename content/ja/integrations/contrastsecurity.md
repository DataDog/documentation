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
  - 'https://github.com/DataDog/integrations-extras/blob/master/contrastsecurity/README.md'
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

### Contrast Protect のログ収集の設定

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

ログに関する詳しい情報は、https://docs.contrastsecurity.com/installation-setupconfig.html#log を参照してください。

- [Datadog Agent を再起動][2]します。

詳細は、[ログ収集のドキュメント][3]を参照してください。

詳細は、[ダッシュボード作成のための Datadog API ドキュメント][4] を参照してください。

## 収集データ

### メトリクス

Contrast インテグレーションには、メトリクスは含まれません。

### イベント

Contrast インテグレーションは、イベントを送信しません。

### サービスのチェック

Contrast インテグレーションには、サービス チェック機能は含まれません。
[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#restart-the-agent
[3]: https://docs.datadoghq.com/ja/logs/log_collection/?tab=tailexistingfiles#getting-started-with-the-agent
[4]: https://docs.datadoghq.com/ja/api/?lang=bash#create-a-dashboard