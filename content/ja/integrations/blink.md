---
app_id: blink
app_uuid: f2bd43a7-bbc5-4f69-89b7-437afbbff9fd
assets:
  integration:
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: ./assets/service_checks.json
    source_type_name: Blink
author:
  homepage: https://www.blinkops.com/
  name: Blink
  sales_email: support@blinkops.com
  support_email: support@blinkops.com
categories:
- 自動化
- クラウド
- インシデント
- 通知
- オーケストレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/blink/README.md
display_on_public_website: true
draft: false
git_integration_title: blink
integration_id: blink
integration_title: Blink
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: blink
public_title: Blink
short_description: Blink は、セキュリティとインフラストラクチャーのためのノーコード自動化プラットフォームです。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Cloud
  - Category::Incidents
  - Category::Notification
  - Category::Orchestration
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Blink は、セキュリティとインフラストラクチャーのためのノーコード自動化プラットフォームです。
  media:
  - caption: Blink のインタラクティブなワークフローを使用して、Datadog のインシデントを自動的に作成および更新します。
    image_url: ./images/incident.png
    media_type: image
  - caption: Blink オートメーション内から、すべてのアクティブな Datadog インシデントのリストを素早く参照することができます。
    image_url: ./images/list-incidents.png
    media_type: image
  - caption: Blink インテグレーションを接続し、Datadog のインシデントに対応したアクションを実行するオートメーションの作成を開始します。
    image_url: ./images/connection-creation.png
    media_type: image
  - caption: Datadog にインシデントを作成する Blink Automation の自動スケジュール。
    image_url: ./images/new-incident.png
    media_type: image
  overview: README.md#Overview
  support: support@blinkops.com
  title: Blink
---



## 概要

[Blink][1] は、インシデントレスポンスの自動化、クラウドネイティブな運用、セキュリティ運用ワークフローを実現するローコード/ノーコード (LCNC) プラットフォームです。Blink は、クラウドネイティブプラットフォームのセキュリティと信頼性に支えられ、手動タスクをインタラクティブな自動タスクに変換します。すべてのスクリプトやチケットが、完全マネージド型のオートメーションになります。

ユーザーインターフェイスと[オートメーションライブラリ][2]には、あらかじめ作成された Datadog ベースのオートメーションとユースケースが用意されています。Blink は、運用のボトルネックを減らし、より優れたクラウド効率と競争力のある SLA を達成することを支援します。

このすぐに使えるインテグレーションにより、以下のことが可能になります。

- Datadog のインシデントを利用してイベントベースの Blink オートメーションをトリガーする。
- Blink から Datadog のインシデントを自動的に作成、更新する。
- Blink の Datadog イベントエクスプローラーからインシデントやイベントを確認する。
- Blink オートメーションを利用して Datadog インシデントを自動的にリッチ化、修復する。

Blink の詳細については、[Blink ドキュメント][3]を参照してください。

## セットアップ

Datadog のワークスペースと Blink の接続方法については、[弊社ドキュメント][4]をご覧ください。

## アンインストール

インテグレーションをアンインストールする場合は、Blink ワークスペースで対応する Datadog 接続を削除するだけです。

削除が完了すると、それまでの認可やアクセストークンはすべて取り消されます。また、Datadog [API Keys][5] ページでインテグレーション名を検索して、このインテグレーションに紐付けられた全ての API キーが無効になったことを確認してください。

## 収集データ

### イベント

このインテグレーションは、イベントとインシデントを Datadog に送信し、Blink 内で関連するインシデントを検索して更新することができます。

### アラート設定

Blink で Datadog のモニターを表示、変更、作成することができます。

### メトリクス

Blink にはメトリクスは含まれていませんが、Blink のオートメーションで使用するために、Datadog 環境からメトリクスをクエリしてリストアップすることができます。

## トラブルシューティング

ご不明な点は、[Blink サポート][6]までお問い合わせください。

[1]: https://www.blinkops.com/
[2]: https://library.blinkops.com/automations?vendors=Datadog
[3]: https://www.docs.blinkops.com/docs/Integrations/Datadog/Actions
[4]: https://www.docs.blinkops.com/docs/Integrations/Datadog/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: mailto:support@blinkops.com