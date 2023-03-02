---
app_id: contrastsecurity
app_uuid: 8509e113-cf2e-42f1-b8d4-1261720498a5
assets:
  dashboards:
    Contrast Security Integration Overview: assets/dashboards/contrast_security_protect.json
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: contrastsecurity.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: contrastsecurity
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Contrast Security
  sales_email: kristiana.mitchell@contrastsecurity.com
  support_email: kristiana.mitchell@contrastsecurity.com
categories:
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/contrastsecurity/README.md
display_on_public_website: true
draft: false
git_integration_title: contrastsecurity
integration_id: contrastsecurity
integration_title: Contrast Security
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: contrastsecurity
oauth: {}
public_title: Contrast Security
short_description: Datadog で Contrast Security から攻撃や脆弱性をチェックする
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Log Collection
  configuration: README.md#Setup
  description: Datadog で Contrast Security から攻撃や脆弱性をチェックする
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Contrast Security
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
- [Datadog ダッシュボード API][5]

## 収集データ

### メトリクス

Contrast インテグレーションには、メトリクスは含まれません。

### イベント

Contrast インテグレーションは、イベントを送信しません。

### サービスのチェック

Contrast インテグレーションには、サービス チェック機能は含まれません。

## トラブルシューティング

ご不明な点は、このインテグレーションの[メインテナー][6]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/
[2]: https://docs.contrastsecurity.com/
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#restart-the-agent
[4]: https://docs.datadoghq.com/ja/logs/log_collection/
[5]: https://docs.datadoghq.com/ja/api/#create-a-dashboard
[6]: https://github.com/DataDog/integrations-extras/blob/master/contrastsecurity/manifest.json