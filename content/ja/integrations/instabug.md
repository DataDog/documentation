---
"app_id": "instabug"
"app_uuid": "37d9bc39-888f-4bec-b8c5-3c137cf88f84"
"assets":
  "oauth": assets/oauth_clients.json
"author":
  "homepage": "https://www.instabug.com/"
  "name": Instabug
  "sales_email": success@instabug.com
  "support_email": support@instabug.com
"categories":
- alerting
- issue tracking
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/instabug/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "instabug"
"integration_id": "instabug"
"integration_title": "Instabug"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "instabug"
"public_title": "Instabug"
"short_description": "Monitor and track your mobile app health and performance."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Offering::UI Extension"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Category::Alerting"
  - "Category::Issue Tracking"
  "configuration": "README.md#Setup"
  "description": Monitor and track your mobile app health and performance.
  "media":
  - "caption": Use the Instabug widget to monitor the overall performance of your app.
    "image_url": images/instabug-datadog-widget.png
    "media_type": image
  - "caption": Instabug's dashboard gives teams a succinct overview of the app's performance, and potential failures or issues occurring in the app.
    "image_url": images/instabug-app-overview.png
    "media_type": image
  - "caption": With each point of feedback or bug your users submit, Instabug automatically captures all the details you need to understand why users are facing issues with your code.
    "image_url": images/instabug-bugs.png
    "media_type": image
  - "caption": Prioritize resolution by the most impactful crashes to your users.
    "image_url": images/instabug-crashes-list.png
    "media_type": image
  - "caption": Understand how each version of your app release is performing and overall adoption.
    "image_url": images/instabug-releases-page.png
    "media_type": image
  - "caption": Aggregate data across device and version to better understand where issues are occurring.
    "image_url": images/instabug-crash-details.png
    "media_type": image
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/instabug-mobile-usability/"
  "support": "README.md#Support"
  "title": Instabug
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->

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

## サービスチェック
Instabug インテグレーションには、サービスのチェック機能は含まれません。

## サポート
ご不明な点は、[Instabug のサポートチーム][5]までお問い合わせください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Leverage user context to debug mobile performance issues with the Instabug Datadog Marketplace offering][6]

[1]: http://instabug.com
[2]: https://dashboard.instabug.com/signup
[3]: https://docs.instabug.com/docs/introduction
[4]: https://app.datadoghq.com/dashboard/lists
[5]: mailto:support@instabug.com
[6]: https://www.datadoghq.com/blog/instabug-mobile-usability/

