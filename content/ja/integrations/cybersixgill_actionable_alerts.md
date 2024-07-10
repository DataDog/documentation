---
app_id: cybersixgill-actionable-alerts
app_uuid: b27feb80-b06f-4200-981a-e91a031d62e6
assets:
  dashboards:
    cybersixgill: assets/dashboards/cybersixgill_actionable_alerts_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: cybersixgill_actionable_alerts.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10342
    source_type_name: cybersixgill_actionable_alerts
author:
  homepage: https://www.cybersixgill.com/
  name: Cybersixgill
  sales_email: info@cybersixgill.com
  support_email: support@cyebrsixgill.com
categories:
- セキュリティ
- イベント管理
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/cybersixgill_actionable_alerts/README.md
display_on_public_website: true
draft: false
git_integration_title: cybersixgill_actionable_alerts
integration_id: cybersixgill-actionable-alerts
integration_title: Cybersixgill Actionable Alerts
integration_version: 1.0.1
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: cybersixgill_actionable_alerts
public_title: Cybersixgill Actionable Alerts
short_description: アセットのアクティビティを監視し、脅威の到来をリアルタイムにアラートします
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Security
  - Category::Event Management
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: アセットのアクティビティを監視し、脅威の到来をリアルタイムにアラートします
  media:
  - caption: アラートカウントのダッシュボードイメージ
    image_url: images/dashboard_count.PNG
    media_type: image
  - caption: タイトル付きイベント一覧のダッシュボードイメージ
    image_url: images/dashboard_emerging_alerts_count.PNG
    media_type: image
  - caption: 新出アラートカウントのダッシュボードイメージ
    image_url: images/dashboard_events_list.PNG
    media_type: image
  - caption: 切迫アラートカウントのダッシュボードイメージ
    image_url: images/dashboard_imminent_alerts_count.PNG
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Cybersixgill Actionable Alerts
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要
Cybersixgill Actionable Alerts チェックでは、IP アドレス、ドメイン、脆弱性、VIP など、ディープ Web、ダーク Web、サーフェス Web にまたがる重要なアセットを監視します。重大度、脅威の種類、説明、投稿スニペット、推奨事項、評価などのコンテキストを持つアラートを受信します。このインテグレーションにより、すぐに使えるダッシュボードが提供され、脅威の優先度を決定して対応することができるようになります。

## セットアップ


### インストール

Cybersixgill Actionable Alerts チェックをホストにインストールするには
1. マシンに[開発者ツール][1]をインストールします。
2. パッケージをビルドするには、コマンド `ddev release build cybersixgill_actionable_alerts` を実行します。
3. ホストに [Datadog Agent をインストールします][2]。
4. Agent のインストールが完了したら、以下のコマンドを実行し、インテグレーションをインストールします。
```
datadog-agent integration install -t datadog-cybersixgill-actionable-alerts==1.0.1
```

### 構成
5. [Cybersixgill サポート][3]に連絡し、Cybersixgill Developer Platform へのアクセスをリクエストします。
6. Cybersixgill 開発者プラットフォームにアクセスできるウェルカムメールを受け取ります。
7. Cybersixgill 開発者プラットフォーム内で、クライアント ID およびクライアントシークレットを作成します。
8. クライアント ID とクライアントシークレットをコピーして、コンフィギュレーションファイルの Configuration.yaml に貼り付けます。
9. 最小収集間隔を秒単位で指定します。例: `min_collection_interval: 3600`

### 検証
[Datadog Events Explorer][4] で Cybersixgill のイベントが生成されていることを確認します。

## データ収集

### サービスチェック
{{< get-service-checks-from-git "cybersixgill_actionable_alerts" >}}


### イベント
このインテグレーションは、API タイプのイベントを Datadog に送信します。

## トラブルシューティング
ご不明な点は、[Cybersixgill サポート][3]までお問い合わせください。


[1]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/?tab=configurationtemplate#configure-the-developer-tool
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: mailto:support@cybersixgill.com
[4]: https://app.datadoghq.com/event/explorer
[5]: https://github.com/DataDog/integrations-extras/blob/master/cybersixgill_actionable_alerts/assets/service_checks.json