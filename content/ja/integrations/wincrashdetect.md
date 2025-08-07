---
app_id: wincrashdetect
app_uuid: 44210c4a-0fe6-4702-88bf-d720e492a806
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10389
    source_type_name: Windows Crash Detection
  monitors:
    Windows Crash Detection: assets/monitors/windows_crash.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- OS & システム
- windows
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/wincrashdetect/README.md
display_on_public_website: true
draft: false
git_integration_title: wincrashdetect
integration_id: wincrashdetect
integration_title: Windows Crash Detection
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: wincrashdetect
public_title: Windows Crash Detection
short_description: Windows ホストのシステムクラッシュを監視します。
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::OS & System
  - カテゴリー::Windows
  - Offering::Integration
  configuration: README.md#Setup
  description: Windows ホストのシステムクラッシュを監視します。
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: documentation
    url: https://docs.datadoghq.com/integrations/wincrashdetect/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/troubleshoot-windows-blue-screen-errors/
  support: README.md#Support
  title: Windows Crash Detection
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Windows システムクラッシュ時に Datadog イベントを受け取り、Datadog でモニターを作成できます。

**注**: このインテグレーションで収集されるメトリクスの一覧は、Agent のマイナーバージョン間で変更される場合があります。これらの変更は Agent の変更履歴に記載されないことがあります。

## セットアップ

### インストール

Windows Crash Detection インテグレーションは [Datadog Agent][1] パッケージに含まれているため、追加のインストールは不要です。

### 設定

1. [Agent の設定ディレクトリ][2]のルートにある `conf.d/` フォルダー内の `wincrashdetect.d/conf.yaml` ファイルを編集し、`enabled: true` を設定します。利用可能なすべての設定オプションについては、[サンプル wincrashdetect.d/conf.yaml.example][3] を参照してください。

2. `C:\ProgramData\Datadog\system-probe.yaml` で enabled フラグを 'true' に設定し、Windows Crash Detection モジュールを有効化します。

   ```yaml
    windows_crash_detection:
        enabled: true
    ```
3. [Agent を再起動します][4]。

### 検証

[Agent の status サブコマンド][5] を実行し、Checks セクションで `wincrashdetect` を探します。

## 収集データ

### メトリクス

このインテグレーションで収集されるメトリクスはありません。

### イベント

Windows Crash Detection インテグレーションは、エージェント起動時に未報告のクラッシュが検出されるとイベントを送信します。クラッシュ 1 件につき 1 つのイベントが報告されます。

### サービスチェック

Windows Kernel Memory インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/wincrashdetect.d/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/windows/?tab=gui#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/help/