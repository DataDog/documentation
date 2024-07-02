---
"app_id": "zebrium"
"app_uuid": "a1fa9510-af05-4950-ad67-4eed3f14d4bf"
"assets":
  "dashboards":
    "Zebrium Root Cause as a Service Sample Dashboard": assets/dashboards/root_cause_as_a_service_sample_dashboard.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": zebrium.logs.all.count
      "metadata_path": metadata.csv
      "prefix": zebrium.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10272"
    "source_type_name": zebrium
"author":
  "homepage": "https://www.zebrium.com"
  "name": Zebrium
  "sales_email": hello@zebrium.com
  "support_email": support@zebrium.com
"categories":
- automation
- notifications
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/zebrium/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "zebrium"
"integration_id": "zebrium"
"integration_title": "Zebrium RCaaS"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "zebrium"
"public_title": "Zebrium RCaaS"
"short_description": "Discover the root cause of problems directly on your dashboards"
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Category::Automation"
  - "Category::Notifications"
  - "Offering::Integration"
  - "Offering::UI Extension"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": Discover the root cause of problems directly on your dashboards
  "media":
  - "caption": "Video: Root Cause Finder for Datadog."
    "image_url": images/Zebrium-Root_Cause_as_a_Service_thumb.png
    "media_type": video
    "vimeo_id": !!int "703040365"
  - "caption": Zebrium widget showing two root cause detections (red dot on vertical lines).
    "image_url": images/Zebrium_Root_Cause_Finder_Widget.png
    "media_type": image
  - "caption": Zebrium root cause summary shown in a side panel.
    "image_url": images/Zebrium_Root_Cause_Finder_With_Side_Panel.png
    "media_type": image
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.datadoghq.com/blog/find-the-root-cause-faster-with-zebrium/"
  "support": "README.md#Support"
  "title": Zebrium RCaaS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

問題が発生していることは分かっていても、その原因が分からない場合に、[Zebrium][1] は Datadog のダッシュボード上に直接根本原因を表示します。手動でのトレーニングやルールの設定を必要とせず、ログを機械学習することで動作し、24 時間以内に精度を達成します。

Zebrium の使い方は簡単です。トラブルシューティングの際には、Datadogの ダッシュボードに Zebrium アプリを追加し、対応する検出の詳細を見るだけです。

Zebrium は、2 つの方法で Datadog と統合します。1) カスタムダッシュボードウィジェットを持つ Datadog アプリと 2) イベントとメトリクスインテグレーションです。

### 1) Datadog アプリ

Zebrium アプリは、検出された問題を時系列で表示し、これらの問題の根本原因 (および関連メトリクス) を掘り下げることができる、あらかじめ構築された対話型のダッシュボードウィジェットを提供します。この方法は、最もシンプルなユーザーエクスペリエンスを提供します。

### 2) イベントとメトリクスインテグレーション

インテグレーションにより、Zebrium の検出イベントとメトリクスが Datadog に直接送信されます。それらを好きなように視覚化することができます (サンプルダッシュボードを提供)。この方法は、Zebrium のデータをダッシュボードに表示する方法をカスタマイズしたい場合に使用します。

## セットアップ

### イベントとメトリクスインテグレーション

Zebrium のイベントメトリクスインテグレーションは、[Datadog API キー][2]を使用し、Datadog の管理者が作成する必要があります。Datadog API キーを取得したら、[Zebrium の Datadog インテグレーションに関するドキュメント][3] を参照して、Zebrium のイベントおよびメトリクスを Datadog に統合するための設定方法を学びます。

### ダッシュボードウィジェット

1. このパネルの右上にある **Install Integration** をクリックします。
2. 既存の Datadog ダッシュボードに移動するか、新しいダッシュボードを作成します。
3. **Add Widgets** ボタンを押すと、ウィジェットドローワが表示されます。
4. ウィジェットドロワー内の **Apps** セクションで **Zebrium** を 検索します。
5. ***Zebrium Root Cause Finder*** ウィジェットアイコンをクリックまたはドラッグして、Datadog ダッシュボードに追加します。
6. 新しいブラウザのタブで [Zebrium UI][4] を開き、デプロイメント用のアクセストークンを作成します。
   - Zebrium UI の右上にあるハンバーガーメニューを選択し、Access Tokens を選択します。
   - Add Access Token ボタンをクリックし、トークンの名前を指定し、トークンのデプロイメントを選択し、ロールを viewer に設定します。
   - Add をクリックし、トークンをクリップボードにコピーします。
7. Datadog UI のウィジェットエディタで、以下の情報を入力します。
   - **API Endpoint**: Zebrium インスタンスのルートへの絶対 URL です。通常は **https://cloud.zebrium.com** です。
   - **Token**: 上記手順 6 で作成したトークンを貼り付けます。
   - **Service Group**: データを表示するサービスグループの名前です。または ‘All' を入力すると、このデプロイメントのすべてのサービスグループのデータが表示されます。
9. オプションでウィジェットのタイトルを指定します。
10. **Save** を押して、Datadog ダッシュボードウィジェットの構成を完了します。

## サポート

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

## 参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog と Zebrium で根本原因を迅速に発見][6]

[1]: https://www.zebrium.com
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.zebrium.com/docs/monitoring/datadog_autodetect/
[4]: https://cloud.zebrium.com
[5]: http://docs.datadoghq.com/help
[6]: https://www.datadoghq.com/blog/find-the-root-cause-faster-with-zebrium/

