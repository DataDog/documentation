---
app_id: seagence
app_uuid: 94f4e504-c98c-466f-b934-5e5ee0331944
assets:
  dashboards:
    seagence_overview: assets/dashboards/seagence_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10360
    source_type_name: Seagence
  monitors:
    Seagence detected a defect: assets/monitors/defect_detection_monitor.json
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.seagence.com/
  name: Seagence Technologies
  sales_email: sales@seagence.com
  support_email: support@seagence.com
categories:
- alerting
- automation
- event management
- developer tools
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/seagence/README.md
display_on_public_website: true
draft: false
git_integration_title: seagence
integration_id: seagence
integration_title: Seagence
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: seagence
public_title: Seagence
short_description: リアル タイム ディフェクト ディテクション & レゾリューション ツールで、デバッグを不要にします。
supported_os:
- any
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Any
  - Submitted Data Type::Events
  - Category::Alerting
  - Category::Automation
  - Category::Event Management
  - Category::Developer Tools
  - Offering::Integration
  configuration: README.md#Setup
  description: リアル タイム ディフェクト ディテクション & レゾリューション ツールで、デバッグを不要にします。
  media:
  - caption: Seagence ディフェクト概要ダッシュボード
    image_url: images/datadog-dashboard.png
    media_type: image
  - caption: Seagence ディフェクト ディテクション モニター
    image_url: images/seagence-datadog-monitor.png
    media_type: image
  - caption: 成功実行パスとディフェクト実行パス
    image_url: images/defect-and-successexecution-paths-1440x810.png
    media_type: image
  - caption: Defect and Success Clusters
    image_url: images/defect-and-success-clusters.png
    media_type: image
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/seagence-datadog-marketplace/
  support: README.md#Support
  title: Seagence
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Seagence][1] は、Java アプリケーション向けの商用グレードの リアル タイム ディフェクト ディテクション & レゾリューション ツールです。ExecutionPath テクノロジーを使用し、マルチ スレッドの問題や握りつぶされた例外、ハンドル済み例外、未処理例外などに起因する既知・未知のディフェクトを検出し、HTTP 200 Success 応答コードに隠れたディフェクトも見逃しません。

このインテグレーションでは、Seagence バックエンドが Seagence エージェントからのデータ ストリームを継続的に解析し、ディフェクトが発生した際、その根本原因まで含めて特定します。ディフェクトが検出されると、インテグレーションが Datadog にイベントを送信してチームにアラートを通知します。標準ダッシュボードを使用すれば、検出されたディフェクトと根本原因を可視化できるため、デバッグやトラブルシューティングが不要になります。ディフェクトの詳細は [Seagence Web][2] で確認できます。

## セットアップ

### インストール

無料でサインアップするには [Seagence][1] をご覧ください。登録後、[Datadog インテグレーション ページ][3] の Seagence タイルに移動し、**Install Integration** をクリックします。そのタイルで **Connect Accounts** をクリックすると Datadog の OAuth2 フローが開始され、Seagence があなたの Datadog アカウントに Events を投稿する権限が付与されます。

アカウントを接続したら、タイルの **Assets** タブに進みます。**Recommended Monitors** > **Seagence Defect Detection Monitor** をクリックすると、標準モニターの作成画面にリダイレクトされます。ページ下部の **Create** をクリックして Seagence モニターを作成します。

### 構成

`-javaagent` オプションを使用して、Seagence の Java エージェントをアプリケーションにアタッチします。Java エージェントは Seagence アカウントからダウンロードできます。詳細は [Seagence][1] の [はじめに][4] を参照してください。

## アンインストール

Seagence から Datadog インテグレーションを削除するには:
1. Datadog で **Uninstall Integration** をクリックしてインテグレーションをアンインストールします。アンインストールすると、以前の認可はすべて取り消されます。
2. [API Keys Management ページ][5] でインテグレーション名を検索し、関連する API キーがすべて無効化されていることを確認します。
3. **Monitors** > **Manage Monitors** に移動して関連モニターを削除します。**Seagence Defect Detection Monitor** にカーソルを合わせ、**Delete** をクリックします。
4. アプリケーションの Java 実行時パラメーターから `-javaagent` オプションを削除します。


## 収集データ

### メトリクス

Seagence にはメトリクスが含まれていません。

### サービス チェック

Seagence にはサービス チェックが含まれていません。

### イベント

Seagence はディフェクトを検出すると Datadog にイベントを投稿します。

## サポート

ご不明な点がありましたら、[Seagence サポート][6] までお問い合わせください。

## その他の参考資料

役立つドキュメント、リンク、記事:

- [Seagence と Datadog で Java コード レベルの問題を検出する][7]

[1]: https://www.seagence.com
[2]: https://app.seagence.com/SeagenceWeb/
[3]: https://app.datadoghq.com/integrations/seagence
[4]: https://seagence.com/product/getting-started/
[5]: https://app.datadoghq.com/organization-settings/api-keys?filter=Seagence
[6]: mailto:support@seagence.com
[7]: https://www.datadoghq.com/blog/seagence-datadog-marketplace/