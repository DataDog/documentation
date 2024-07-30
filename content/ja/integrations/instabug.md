---
app_id: instabug
app_uuid: 37d9bc39-888f-4bec-b8c5-3c137cf88f84
assets: {}
author:
  homepage: https://www.instabug.com/
  name: Instabug
  sales_email: success@instabug.com
  support_email: support@instabug.com
categories:
- アラート設定
- モニタリング
- 問題追跡
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/instabug/README.md
display_on_public_website: true
draft: false
git_integration_title: instabug
integration_id: instabug
integration_title: Instabug
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: instabug
public_title: Instabug
short_description: モバイルアプリの健全性とパフォーマンスを監視・追跡します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Offering::UI Extension
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Alerting
  - Category::Monitoring
  - Category::Issue Tracking
  configuration: README.md#Setup
  description: モバイルアプリの健全性とパフォーマンスを監視・追跡します。
  media:
  - caption: Instabug ウィジェットを使用して、アプリの全体的なパフォーマンスを監視します。
    image_url: images/instabug-datadog-widget.png
    media_type: image
  - caption: Instabug のダッシュボードでは、アプリのパフォーマンス、アプリで発生する潜在的な障害や問題点を簡潔に把握することができます。
    image_url: images/instabug-app-overview.png
    media_type: image
  - caption: Instabug は、ユーザーが送信するフィードバックやバグごとに、ユーザーがコードで問題に直面している理由を理解するために必要なすべての詳細を自動的にキャプチャします。
    image_url: images/instabug-bugs.png
    media_type: image
  - caption: ユーザーにとって最も影響のあるクラッシュを優先的に解決します。
    image_url: images/instabug-crashes-list.png
    media_type: image
  - caption: アプリリリースの各バージョンのパフォーマンスや全体の採用状況を把握することができます。
    image_url: images/instabug-releases-page.png
    media_type: image
  - caption: デバイスやバージョンに関係なくデータを集計し、問題が発生している箇所をより深く理解することができます。
    image_url: images/instabug-crash-details.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Instabug
---


## 概要

[Instabug][1] は、モバイルに特化したプラットフォームで、モバイルアプリ開発のライフサイクルを通じて、パフォーマンスと安定性の問題を監視、優先順位付け、デバッグできるようにモバイルチームを支援するものです。

Datadog の Instabug ダッシュボードウィジェットを使用すると、アプリ全体の健全性と、アプリのパフォーマンスをユーザーがどのように認識しているかを、App Apdex というたった 1 つの数値で監視することができます。このウィジェットは以下を提供します。
- App Apdex の総合スコア
- App Apdex の超過時間
- セッションを 4 つのバケット (`Satisfying`、`Tolerable`、`Frustrating`、`Crashing`) に分類
- 直近のバグ報告 5 件と新規報告総件数


## セットアップ
1. まだの方は、[Instabug に無料登録][2]し、[手順][3]に従って、SDK をアプリにインテグレーションしてください。
2. Instabug SDK をアプリにインテグレーションした後、新規または既存の [Datadog ダッシュボード][4]にアクセスします。
3. **+ Add Widgets** または **+ Edit Dashboard** ボタンを押すと、ウィジェットドローワが表示されます。
4. ウィジェットドロワーの **Apps** タブで `Instabug` を検索します。
5. Instabug ウィジェットアイコンをクリックまたはドラッグしてダッシュボードに追加し、Instabug エディタモーダルを開きます。
6. Instabug の認証情報を使用してログインし、Instabug アカウントを認証して Datadog に接続します。
7. オプションでウィジェットのタイトルを指定します。
8. **Save** を押して、Datadog ダッシュボードウィジェットの構成を完了します。

## 収集データ
Instabug インテグレーションには、メトリクスは含まれません。

## サービスのチェック
Instabug インテグレーションには、サービスのチェック機能は含まれません。

## サポート
ご不明な点は、[Instabug のサポートチーム][5]までお問い合わせください。

[1]: http://instabug.com
[2]: https://dashboard.instabug.com/signup
[3]: https://docs.instabug.com/docs/introduction
[4]: https://app.datadoghq.com/dashboard/lists
[5]: mailto:support@instabug.com